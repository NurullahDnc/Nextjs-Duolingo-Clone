import { cn } from "@/lib/utils";
import Image from "next/image";
import SidebarItem from "./sidebar-item";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";

interface props {
  className?: string;
}

interface sidebaritemProps {
  label: string;
  href: string;
  iconSrc: string;
}

const sidebaritem: sidebaritemProps[] = [
  {
    label: "Learn",
    href: "/learn",
    iconSrc: "learn.svg",
  },
  {
    label: "Leaderboard",
    href: "/leaderboard",
    iconSrc: "leaderboard.svg",
  },
  {
    label: "Quests",
    href: "/quests",
    iconSrc: "quests.svg",
  },
  {
    label: "Shop",
    href: "/shop",
    iconSrc: "shop.svg",
  },
];

const Sidebar = ({ className }: props) => {
  return (
    <div
      className={cn(
        " flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 flex-col border-r-2 ",
        className
      )}
    >
      <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3  ">
        <Image src={"/mascot.svg"} width={40} height={40} alt="mascot" />
        <h1 className="text-2xl font-extrabold text-green-600  tracking-wide ">
          Lingo
        </h1>
      </div>

      <div className="flex flex-col gap-y-2 flex-1 ">
        {sidebaritem.map((item, i) => (
          <SidebarItem
            key={i}
            label={item.label}
            href={item.href}
            iconSrc={item.iconSrc}
          />
        ))}
      </div>

      <div className="pt-4">
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>

        <ClerkLoaded>
          <UserButton afterSignOutUrl="/" />
        </ClerkLoaded>
      </div>
    </div>
  );
};

export default Sidebar;
