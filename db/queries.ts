import { cache } from "react";

import db from "@/db/drizzle";
import { auth } from "@clerk/nextjs/server";
import { Column, asc, eq } from "drizzle-orm";
import {
  challengeProgress,
  challenges,
  courses,
  lessons,
  units,
  userProgress,
  userSubscription,
} from "./schema";

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
    orderBy: (units, {asc}) => [asc(units.order)],
    where: eq(units.courseId, userProgress.activeCourseId),
    with: {
      lessons: {
        orderBy: (lessons, {asc}) => [asc(lessons.order)],
        with: {
          challenges: {
            orderBy: (challenges, {asc}) => [asc(challenges.order)],
            with: {
              challengeProgress: {
                where: eq(challengeProgress.userId, userId),
              },
            },
          },
        },
      },
    },
  });

  const normalizeData = data.map((unit) => {
    const lessonsWithCompletedStatus = unit.lessons.map((lesson) => {

      if(lesson.challenges.length === 0  ){
        return{...lesson, completed: false }
      }

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
      with: {
        units: {
          orderBy: (units, {asc}) => [asc(units.order)],
          with: {
            lessons: {
              orderBy: (lessons, {asc}) => [asc(lessons.order)]
            }
          }
        }
      }
    });
    return data;
  } catch (error) {
    console.error("Error fetching coursesId:", error);
    return [];
  }
});

export const getCourseProgress = cache(async () => {
  const { userId } = await auth();
  const userProgress = await getUserProgress();

  if (!userId || !userProgress?.activeCourseId) {
    return null;
  }
  const unitInActiviteCourse = await db.query.units.findMany({
    orderBy: (units, { asc }) => [asc(units.order)],
    where: eq(units.courseId, userProgress.activeCourseId),

    with: {
      lessons: {
        orderBy: (lessons, { asc }) => [asc(lessons.order)],
        with: {
          unit: true,
          challenges: {
            with: {
              challengeProgress: {
                where: eq(challengeProgress.userId, userId),
              },
            },
          },
        },
      },
    },
  });

  const firstUncompletedLesson = unitInActiviteCourse
    .flatMap((units) => units.lessons)
    .find((lessons) => {
      return lessons.challenges.some((challenge) => {
        return (
          !challenge.challengeProgress ||
          challenge.challengeProgress.length === 0 ||
          challenge.challengeProgress.some((progress) => {
            progress.completed === false;
          })
        );
      });
    });

  return {
    activeLesson: firstUncompletedLesson,
    activeLessonId: firstUncompletedLesson?.id,
  };
});

export const getLesson = cache(async (id?: number) => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const courseProgress = await getCourseProgress();

  const lessonsId = id || courseProgress?.activeLessonId;

  if (!lessonsId) {
    return null;
  }

  const data = await db.query.lessons.findFirst({
    where: eq(lessons.id, lessonsId),
    with: {
      challenges: {
        orderBy: (challenges, { asc }) => [asc(challenges.order)],
        with: {
          challengeOptions: true,
          challengeProgress: {
            where: eq(challengeProgress.userId, userId),
          },
        },
      },
    },
  });
  if (!data || !data.challenges) {
    return null;
  }

  const normalizeChallenges = data.challenges.map((challenge) => {
    const completed =
      challenge.challengeProgress &&
      challenge.challengeProgress.length > 0 &&
      challenge.challengeProgress.every((process) => {
        process.completed;
      });

    return { ...challenge, completed };
  });

  return { ...data, challenges: normalizeChallenges };
});

export const getLessonPercentage = cache(async () => {
  const courseProgress = await getCourseProgress();

  if (!courseProgress?.activeLesson) {
    return 0;
  }
  const lesson = await getLesson(courseProgress.activeLessonId);

  if (!lesson) {
    return 0;
  }

  const completedChallenges = lesson.challenges.filter((challenge) => {
    challenge.completed;
  });

  const percentage = Math.round(
    (completedChallenges.length / lesson.challenges.length) * 100
  );

  return percentage;
});

const DAY_IN_MS = 86_400_000
export const getUserSubscription = cache(async () => {
  const {userId} = await auth();

  if (!userId) {
    return null;
  }

  const data = await db.query.userSubscription.findFirst({
    where: eq(userSubscription.userId, userId)
  })

  if(!data) return null

  const isActive = data.stripePriceId && data.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.
  now()

  return{
    ...data,
    isActive: !!isActive
  }
  

});


export const getTopTenUsers = cache(async ()=>{

  const {userId} = auth()

  if (!userId) {
    return []
  }

  const data = await db.query.userProgress.findMany({

    orderBy: (userProgress, {desc} ) =>[desc(userProgress.points)],

    limit: 10,
    columns: {
      userId: true,
      userName: true,
      userImageSrc: true,
      points: true
    }

  })

  return data;

})

