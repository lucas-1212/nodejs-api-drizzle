import { courses } from "../database/schema";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { db } from "../database/clients";
import { eq } from "drizzle-orm";

export const updateCourseRoute: FastifyPluginAsyncZod = async (server) => {
  server.patch(
    "/courses/:id",
    {
      schema: {
        tags: ["Courses"],
        summary: "Update a course",
        description: "Update course information by ID",
        params: z.object({
          id: z.uuid("ID deve ser um UUID válido"),
        }),
        body: z.object({
          title: z.string().min(5, "Title precisa ter mais de 5 caracteres").optional(),
          description: z.string().min(10, "Description deve ter pelo menos 10 caracteres").optional(),
        }).refine((data) => Object.keys(data).length > 0, {
          message: "Pelo menos um campo deve ser fornecido para atualização",
        }),
        response: {
          200: z
            .object({
              success: z.boolean(),
              message: z.string(),
              course: z.object({
                id: z.string().uuid(),
                title: z.string(),
                description: z.string().nullable(),
              }),
            })
            .describe("Curso atualizado com sucesso"),
          400: z
            .object({
              success: z.boolean(),
              error: z.string(),
            })
            .describe("Dados inválidos"),
          404: z
            .object({
              success: z.boolean(),
              error: z.string(),
            })
            .describe("Curso não encontrado"),
          500: z
            .object({
              success: z.boolean(),
              error: z.string(),
            })
            .describe("Erro interno do servidor"),
        },
      },
    },
    async (request, reply) => {
      try {
        const { id: courseId } = request.params;
        const updateData = request.body;

        // Verificar se o curso existe antes de atualizar
        const [existingCourse] = await db
          .select()
          .from(courses)
          .where(eq(courses.id, courseId));

        if (!existingCourse) {
          return reply.status(404).send({
            success: false,
            error: "Curso não encontrado",
          });
        }

        // Preparar dados para atualização
        const dataToUpdate: any = {};
        
        if (updateData.title !== undefined) {
          dataToUpdate.title = updateData.title;
        }
        
        if (updateData.description !== undefined) {
          dataToUpdate.description = updateData.description;
        }

        // Atualizar o curso
        const [updatedCourse] = await db
          .update(courses)
          .set(dataToUpdate)
          .where(eq(courses.id, courseId))
          .returning();

        if (!updatedCourse) {
          return reply.status(500).send({
            success: false,
            error: "Erro ao atualizar o curso",
          });
        }

        return reply.status(200).send({
          success: true,
          message: "Curso atualizado com sucesso",
          course: updatedCourse,
        });

      } catch (error) {
        // Log do erro para debugging
        console.error("Erro ao atualizar curso:", error);
        
        return reply.status(500).send({
          success: false,
          error: "Erro interno do servidor",
        });
      }
    }
  );
};
