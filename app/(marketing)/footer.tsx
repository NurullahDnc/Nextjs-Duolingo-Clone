import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Footer = () => {
  interface Language {
    name: string;
    image: string;
  }

  const data: Language[] = [
    {
      name: "Turkey",
      image: "/tr.svg",
    },
    {
      name: "Italıan",
      image: "/it.svg",
    },
    {
      name: "JAPANESE",
      image: "/jp.svg",
    },
    {
      name: "FRENCH",
      image: "/fr.svg",
    },
  ];
  return (
    <div className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2 ">
      <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full ">
        {data.map((item: any) => (
          <Button size="lg" variant="ghost" className="w-full">
            <Image
              src={item.image}
              alt={item.name}
              width={40}
              height={32}
              className="mr-4 rounded-md"
            />
            {item.name}
          </Button>
        ))}
      </div>
    </div>
  );
};
