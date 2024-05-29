import { getLesson, getUserProgress, getUserSubscription } from "@/db/queries";
import { redirect } from "next/navigation";
import Quiz from "./quiz";

interface LessonIdPageProps {
  params:{
    lessonId: number
  }
}

const LessonIdPage = async ({params}: LessonIdPageProps) => {
  const lessonData = getLesson(params.lessonId);
  const userProgressData = await getUserProgress();
  const userSubscriptionData = getUserSubscription()


  const [userProgress, lesson, userSubscription] = await Promise.all([
    userProgressData,
    lessonData,
    userSubscriptionData
  ]);

  if (!lesson || !userProgress) {
    redirect("/learn");
  }

  const initialPercentage =
    lesson.challenges.filter((challenge) => challenge.completed).length /
      lesson.challenges.length *
    100;

  return (
    <Quiz
      initialLessonId={lesson.id}
      initialLessonChallenges={lesson.challenges}
      initialHearts={userProgress.hearts}
      initialPercentage={initialPercentage}
      userSubscription={null}
    />
  );
};

export default LessonIdPage;


/*
import { getLesson, getUserProgress, getUserSubscription } from "@/db/queries";
import { redirect } from "next/navigation";
import Quiz from "./quiz";

interface LessonIdPageProps {
  params:{
    lessonId: number
  }
}

const LessonIdPage = async ({params}: LessonIdPageProps) => {
  const lessonData = getLesson(params.lessonId);
  const userProgressData = await getUserProgress();
  const userSubscriptionData = getUserSubscription()


  const [userProgress, lesson, userSubscription] = await Promise.all([
    userProgressData,
    lessonData,
    userSubscriptionData
  ]);

  if (!lesson || !userProgress) {
    redirect("/learn");
  }

  const initialPercentage =
    lesson.challenges.filter((challenge) => challenge.completed).length /
      lesson.challenges.length *
    100;

  return (
    <Quiz
      initialLessonId={lesson.id}
      initialLessonChallenges={lesson.challenges}
      initialHearts={userProgress.hearts}
      initialPercentage={initialPercentage}
      userSubscription={null}
    />
  );
};

export default LessonIdPage;


*/