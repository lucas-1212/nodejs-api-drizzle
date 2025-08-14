import { fastifySwaggerUi } from "@fastify/swagger-ui";
import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";

import { createCourseRoute } from "./routes/create-course.ts";
import { getCourseByIdRoute } from "./routes/get-course-by-id.ts";
import { getCoursesRoute } from "./routes/get-courses.ts";

const server = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
}).withTypeProvider<ZodTypeProvider>();

if (process.env.NODE_ENV === "development") {
  server.register(fastifySwagger, {
    openapi: {
      info: {
        title: "Courses API",
        description: "API for managing courses",
        version: "1.0.0",
      },
    },
    transform: jsonSchemaTransform,
  });

  server.register(fastifySwaggerUi, {
    routePrefix: "/docs",
  });
}

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(createCourseRoute);
server.register(getCoursesRoute);
server.register(getCourseByIdRoute);

/*

server.patch("/courses/:id", (request, reply) => {
  type Params = {
    id: string;
  };
  const params = request.params as Params;
  const courseId = params.id;

  type Body = {
    title?: string;
    description?: string;
  };
  const body = request.body as Body;

  const courseIdx = courses.findIndex((course) => course.id === courseId);

  if (courseIdx === -1) {
    return reply.status(404).send({ error: "Course not found" });
  }

  if (!body.title && !body.description) {
    return reply.status(400).send({ error: "At least one field is required" });
  }

  courses[courseIdx] = {
    id: courseId,
    title: body.title ?? courses[courseIdx].title,
    description: body.description ?? courses[courseIdx].description,
  };
  return reply.status(204).send({ course: courses[courseIdx] });
});

server.put("/courses/:id", (request, reply) => {
  type Params = {
    id: string;
  };
  const params = request.params as Params;
  const courseId = params.id;

  type Body = {
    title: string;
    description: string;
  };
  const body = request.body as Body;

  const courseIdx = courses.findIndex((course) => course.id === courseId);

  if (courseIdx === -1) {
    return reply.status(404).send({ error: "Course not found" });
  }

  if (!body.title) {
    return reply.status(400).send({ error: "Title is required" });
  }

  if (!body.description) {
    return reply.status(400).send({ error: "Description is required" });
  }

  courses[courseIdx] = {
    id: courseId,
    title: body.title,
    description: body.description,
  };
  return reply.status(204).send({ course: courses[courseIdx] });
});

server.delete("/courses/:id", (request, reply) => {
  type Params = {
    id: string;
  };
  const params = request.params as Params;
  const courseId = params.id;

  const courseIdx = courses.findIndex((course) => course.id === courseId);

  if (courseIdx === -1) {
    return reply.status(404).send({ error: "Course not found" });
  }

  courses.splice(courseIdx, 1);
  return reply.status(204).send();
});
*/

server.listen({ port: 3333 }).then(() => {
  console.log("Server is running on port 3333");
});
