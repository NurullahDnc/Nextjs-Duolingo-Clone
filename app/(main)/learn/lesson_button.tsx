import { Check, Crown, Divide, Star } from "lucide-react";

import Link from "next/link";

import "react-circular-progressbar/dist/styles.css";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import CircularProgress from "./CircularProgress";

interface LessonButtonProps {
  id: number;
  index: number;
  totalCount: number;
  current?: boolean;
  locked?: boolean;
  percentage: number;
}

const LessonButton = ({
  id,
  index,
  totalCount,
  current,
  locked,
  percentage,
}: LessonButtonProps) => {
  const cycleLength = 8;
  const cycleIndex = index % cycleLength;

  let indentationLevel;

  if (cycleIndex <= 2) {
    indentationLevel = cycleIndex;
  } else if (cycleIndex <= 4) {
    indentationLevel = 4 - cycleIndex;
  } else if (cycleIndex <= 6) {
    indentationLevel = 4 - cycleIndex;
  } else {
    indentationLevel = cycleIndex - 8;
  }

  const rightPosition = indentationLevel * 40;

  const isFirst = index === 0;
  const isLast = index === totalCount;
  const isCompleted = !current && !locked;

  const Icon = isCompleted ? Check : isLast ? Crown : Star;

  const href = isCompleted ? `/lesson/${id}` : `/lesson`;

  return (
    <Link
      href={href}
      aria-disabled={locked}
      style={{ pointerEvents: locked ? "none" : "auto" }}
    >
      <div
        className="relative "
        style={{
          right: `${rightPosition}px`,
          marginTop: isFirst && isCompleted ? 60 : 24,
        }}
      >
        {/* tamamlanan kurslar ve tamamlanmayan kursalar */}
        {current ? (
           <div className="h-[102px] mt-16 w-[102px] relative flex items-center justify-center">
            <div className="absolute -top-7 left-2.5 px-3 py-2.5 border-2 font-bold uppercase text-green-500 bg-white rounded-xl animate-bounce tracking-wide z-10">
              Start
              <div className="absolute left-1/2 -bottom-2 w-0 h-0 border-x-8 border-x-transparent border-t-8 transform -translate-x-1/2"></div>
            </div>
            <CircularProgress
              percentage={Number.isNaN(percentage) ? 0 : percentage}
            />
            <Button
              size="rounded"
              variant={locked ? "locked" : "secondary"}
              className="w-[70px] h-[70px] border-b-8 absolute"
            >
              <Icon
                className={cn(
                  "h-10 w-10",
                  locked
                    ? "fill-neutral-400 stroke-neutral-400"
                    : "fill-primary-foreground text-primary-foreground",
                  isCompleted && "fill-none stroke-[4]"
                )}
              />
            </Button>
           </div>
        ) : (
          <div>
            <Button
              size="rounded"
              variant={locked ? "locked" : "secondary"}
              className=" w-[70px] h-[70px] border-b-8 "
            >
              <Icon
                className={cn(
                  "h-10 w-10",
                  locked
                    ? "fill-neutral-400  stroke-neutral-400"
                    : "fill-primary-foreground text-primary-foreground ",
                  isCompleted && "fill-none stroke-[4]  "
                )}
              />
            </Button>
          </div>
        )}
      </div>
    </Link>
  );
};

export default LessonButton;
