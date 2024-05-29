import FeedWrapper from "@/components/feed-wrapper";
import StickyWrapper from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import {
  getTopTenUsers,
  getUserProgress,
  getUserSubscription,
} from "@/db/queries";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator"
import { AvatarImage } from "@radix-ui/react-avatar";

const LeaderboardPage = async () => {
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();
  const topTenUserData = getTopTenUsers();

  const [userProgress, userSubscription, topTenUser] = await Promise.all([
    userProgressData,
    userSubscriptionData,
    topTenUserData,
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  const isPro = !!userSubscription?.isActive;

  return (
    <div className=" flex flex-row-reverse gap-[48px] px-6 ">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={isPro}
        />
      </StickyWrapper>
      <FeedWrapper>
        <div className=" w-full flex flex-col items-center ">
          <Image
            src="/Leaderboard.svg"
            alt="Leaderboard"
            width={90}
            height={90}
          />

          <h1 className=" text-center font-bold text-neutral-800 text-2xl my-6 ">
            Leaderboard
          </h1>
          <p className=" text-muted-foreground text-center text-lg mb-6 ">
            see where you stand among other comunity
          </p>

          <Separator className=" mb-4 h-. rounded-full " />
          {topTenUser.map((userProgress, index) => (
            <div
              key={userProgress.userId}
              className="flex items-center w-full p-2 px-4 rounded-xl hover:bg-gray-200/50 "
            >
              <p className=" font-bold text-lime-700 mr-4 ">{index + 1}</p>

              <Avatar 
                className=" border bg-green-500 h-12 w-12 ml-3 mr-6 "
              >
                <Image
                  src={userProgress.userImageSrc}
                  alt="image"
                  fill
                  className="object-cover"
                />
              </Avatar>
              <p className="font-bold text-neutral-700 flex-1 ">
                {userProgress.userName}
              </p>
              <p className=" text-muted-foreground ">
                {userProgress.points} Xp
              </p>
            </div>
          ))}
        </div>
      </FeedWrapper>
    </div>
  );
};

export default LeaderboardPage;
