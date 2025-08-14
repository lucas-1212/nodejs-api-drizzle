import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";

import { courses } from "../src/database/schema.ts";
import { db } from "../src/database/clients.ts";

export const createCourseRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/courses",
    {
      schema: {
        tags: ["Courses"],
        summary: "Create a new course",
        body: z.object({
          title: z.string().min(5, "Title precisa ter mais de 5 caracteres"),
          description: z.string().optional(),
        }),
        response: {
            201: z.object({
                course: z.uuid(),
            }).describe("Curso criado com sucesso"),
        }
      },
    },
    async (request, reply) => {
      const body = request.body;

      const result = await db
        .insert(courses)
        .values({
          title: body.title,
        })
        .returning();

      return reply.status(201).send({ course: result[0].id });
    }
  );
};
