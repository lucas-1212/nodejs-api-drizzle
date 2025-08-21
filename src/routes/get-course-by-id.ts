import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { eq } from "drizzle-orm";

import { db } from "../database/clients.ts";
import { courses } from "../database/schema.ts";

export const getCourseByIdRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/courses/:id",
    {
      schema: {
        tags: ["Courses"],
        summary: "Get a course by ID",
        params: z.object({
          id: z.uuid("Invalid course ID format"),
        }),
        response: {
          200: z.object({
            id: z.uuid(),
            title: z.string(),
            description: z.string().nullable(),
          }),
          404: z.object({
            error: z.string(),
          }).describe("Course not found")
        },
      },
    },
    async (request, reply) => {
      //   type Params = {
      //     id: string;
      //   };
      const params = request.params;
      const courseId = params.id;

      const course = await db
        .select()
        .from(courses)
        .where(eq(courses.id, courseId));

      if (course.length > 0) {
        return reply.send(course[0]);
      }

      return reply.status(404).send({ error: "Course not found" });
    }
  );
};
