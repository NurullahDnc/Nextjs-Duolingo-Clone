import { challengeOptions, challenges } from "@/db/schema";
import { cn } from "@/lib/utils";
import Card from "./card";

interface challengeProps {
  options: (typeof challengeOptions.$inferSelect)[];
  onSelect: (id: number) => void;
  status: "correct" | "wrong" | "none";
  selectedOption?: number;
  disabled: boolean;
  type: (typeof challenges.$inferSelect)["type"];
}

const Challenge = ({
    options,
  onSelect,
  status,
  selectedOption,
  disabled,
  type,
}: challengeProps) => {
  return (
    <div
    //classname duzenlendi gridler
      className={cn(
        "grid gap-2",
        type === "ASSIST" && "grid-cols-1",
        type === "SELECT" &&
          "md:grid-cols-3 grid-cols-2 lg:grid-cols-[repat(auto-fit, minmax(0,1fr))]  "
      )}
    >
    {options.map((option, i)=>(
          <Card
            key={i}
            id={option.id}
            text={option.text}
            imageSrc={option.imageSrc}
            shortcut={`${i + 1}`}
            selected={selectedOption === option.id}
            onClick={()=>onSelect(option.id)}
            status={status}
            audioSrc={option.audioSrc}
            disabled={disabled}
            type={type}
          />
    ))}
    </div>
  );
};

export default Challenge;
