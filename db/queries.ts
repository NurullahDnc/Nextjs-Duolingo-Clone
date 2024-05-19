import { cache } from "react";

import db from "@/db/drizzle";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { courses, userProgress } from "./schema";

export const getUserProgress = cache(async () => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return null;
    }

    const data = await db.query.userProgress.findFirst({
      where: eq(userProgress.userId, userId),
      with: {
        activeCourse: true,
      },
    });

    return data;
  } catch (error) {
    console.error("Error fetching user progress:", error);
    return null;
  }
});

export const getCourses = cache(async () => {
  try {
    const data = await db.query.courses.findMany();
    return data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
});

export const getCoursesById = cache(async (coursesId: number) => {
    try {
      const data = await db.query.courses.findFirst({
        where: eq(courses.id, coursesId)
      });
      return data;
    } catch (error) {
      console.error("Error fetching coursesId:", error);
      return [];
    }
  });
  

