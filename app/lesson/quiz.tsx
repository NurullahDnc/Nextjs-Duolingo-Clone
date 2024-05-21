"use client"
import { challengeOptions, challenges } from "@/db/schema";
import { useState } from "react";
import Header from "./header";

interface QuizProps {
    initialLessonId: number,
    initialLessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean
        challengeOptions: typeof challengeOptions.$inferSelect[]
    }) [] ,
    initialHearts: number,
    initialPercentage: number,
    userSubscription: any
}



const Quiz = ({initialHearts, initialLessonChallenges, initialLessonId, initialPercentage, userSubscription}: QuizProps) => {

    const [hearts, setHearts] = useState(initialHearts)
    const [percentage, setPercentage] = useState(initialPercentage)

    return ( 
        <>
            <Header
                hearts={hearts}
                percentage={percentage}
                hasActiveSubscription={!!userSubscription?.isActive}
            />

        </>
     );
}
 
export default Quiz;
 