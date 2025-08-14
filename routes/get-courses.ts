import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

import { db } from "../src/database/clients.ts";
import { courses } from "../src/database/schema.ts";
import z from "zod";

export const getCoursesRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/courses",
    {
      schema: {
        tags: ["Courses"],
        summary: "Return a list of all courses",
        response: {
          200: z.object({
            courses: z.array(
              z.object({
                id: z.uuid(),
                title: z.string(),
                description: z.string().nullable(),
              })
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      const result = await db.select().from(courses);

      return reply.send({ courses: result });
    }
  );
};
