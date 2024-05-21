import { cache } from "react";

import db from "@/db/drizzle";
import { auth } from "@clerk/nextjs/server";
import { asc, eq } from "drizzle-orm";
import { challengeProgress, challenges, courses, lessons, units, userProgress } from "./schema";

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

export const getUnits = cache(async () => {
  const { userId } = await auth();
  const userProgress = await getUserProgress();
  //userId eklenecek if iceriisne
  if (!userId || !userProgress?.activeCourseId) {
    return [];
  }

  const data = await db.query.units.findMany({
    where: eq(units.courseId, userProgress.activeCourseId),
    with: {
      lessons: {
        with: {
          challenges: {
            with: {
              challengeProgress: {
                where: eq(challengeProgress.userId, userId )
              },
            },
          },
        },
      },
    },
  });

  const normalizeData = data.map((unit) => {
    const lessonsWithCompletedStatus = unit.lessons.map((lesson) => {
      const allComplettedChallenges: any = lesson.challenges.every(
        (challenge) => {
          {
            return (
              challenge.challengeProgress &&
              challenge.challengeProgress.length > 0 &&
              challenge.challengeProgress.every((process) => process.completed)
            );
          }
        }
      );
      return { ...lesson, completed: allComplettedChallenges };
    });
    return { ...unit, lessons: lessonsWithCompletedStatus };
  });

  return normalizeData;
});

export const getCoursesById = cache(async (coursesId: number) => {
  try {
    const data = await db.query.courses.findFirst({
      where: eq(courses.id, coursesId),
    });
    return data;
  } catch (error) {
    console.error("Error fetching coursesId:", error);
    return [];
  }
});


export const getCourseProgress = cache (async () =>{
  const {userId } = await auth()
  const userProgress = await getUserProgress()

  if (!userId || !userProgress?.activeCourseId ) {
    return null
  }

  const unitInActiviteCourse = await db.query.units.findMany({
    orderBy: (units, {asc} ) => [asc(units.order)],
    where: eq(units.courseId, userProgress.activeCourseId),

    with: {
      lessons:{
        orderBy:(lessons, {asc}) => [asc(lessons.order)],
        with: {
          unit: true,
          challenges: {
            with: {
              challengeProgress: {
                where: eq(challengeProgress.userId, userId)
              }
            }
          }
        }

      }
    }

  })

  const firstUncompletedLesson = unitInActiviteCourse.flatMap((units)=>units.lessons)
  .find((lessons)=>{
    return lessons.challenges.some((challenge) =>{
      
      return !challenge.challengeProgress ||challenge.challengeProgress.length == 0
    }
)
  })

  return{
    activeLesson: firstUncompletedLesson,
    activeLessonId: firstUncompletedLesson?.id

  }

})

