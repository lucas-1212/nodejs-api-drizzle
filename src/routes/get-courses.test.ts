import { test, expect } from "vitest";
import request from "supertest";
import { faker } from "@faker-js/faker";

import { server } from "../app.ts";
import { makeCourse } from "../tests/factories/make-course.ts";
import { randomUUID } from "node:crypto";

test("Get a course by id", async () => {
  await server.ready();

  const titleId = randomUUID();

  const course = await makeCourse(titleId);

  const response = await request(server.server).get(
    `/courses?title=${titleId}`
  );

  expect(response.status).toEqual(200);
  expect(response.body).toEqual({
    totalPages: 1,
    courses: [
      {
        id: expect.any(String),
        title: titleId,
        enrollments: 0,
      },
    ],
  });
});
