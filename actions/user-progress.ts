"use server";

import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import db from "@/db/drizzle";
import { getCoursesById, getUserProgress } from "@/db/queries";
import { challengeProgress, challenges, userProgress } from "@/db/schema";
  
export const upsertUserProgress = async (courseId: number) => {
  const { userId } = await auth();

  const user = await currentUser();

  if (!userId || !user) {
    throw new Error("Unaunhorized");
  }

  const course = await getCoursesById(courseId);

  if (!course) {
    throw new Error("course not found");
  }

 
  const existingUserProgress = await getUserProgress();

  if (existingUserProgress) {
    await db.update(userProgress).set({
      activeCourseId: courseId,
      userName: user.firstName || "user",
      userImageSrc: user.imageUrl || "/mascot.svg",
    });

    revalidatePath("/courses");
    revalidatePath("/learn");
    redirect("learn");
  }
  
  await db.insert(userProgress).values({
    userId,
    activeCourseId: courseId,
    userName: user.firstName || "user",
    userImageSrc: user.imageUrl || "/mascot.svg",
  });

  revalidatePath("/courses");
  revalidatePath("/learn");
  redirect("learn");
};

export const reduceHearts = async (challengeId: number) =>{
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unaunhorized");
  }

  const currentGetUserProgress = await getUserProgress();

  const challenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId),
  });

  if (!challenge) console.log("challenge not found");

  const lessonId = challenge?.lessonId;

  const existingChallengeProgress = await db.query.challengeProgress.findFirst({
    where: and(
      eq(challengeProgress.userId, userId ),
      eq(challengeProgress.challengesId, challengeId )

    )
  })
  
  const isPractice = !!existingChallengeProgress;

  if(isPractice) return {error: "practice"}

  if (!currentGetUserProgress) {
    throw new Error("User progress not found.")
  }

  if (currentGetUserProgress.hearts === 0) {
    return{ error: "hearts"}
  }

  await db.update(userProgress).set({
    hearts: Math.max(currentGetUserProgress.hearts -1, 0)
  }).where(eq(userProgress.userId, userId))

  revalidatePath("/shop");
  revalidatePath("/learn");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
  revalidatePath(`/lesson/${lessonId}`);


}