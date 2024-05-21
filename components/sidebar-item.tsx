"use client";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import { url } from "inspector";

interface props {
  label: string;
  href: string;
  iconSrc: string;
}

const SidebarItem = ({ label, href, iconSrc }: props) => {
  const patname = usePathname();
  const active = patname === href;

  return (
    <Button
      variant={active ? "sidebarOutline" : "sidebar"}
      className="justify-start h-[52px] "
    >
      <Link className="flex items-center" href={href}>
        <Image
          src={iconSrc}
          alt="label"
          height={32}
          width={32}
          className="mr-5"
        />
        {label}
      </Link>
    </Button>
  );
};

export default SidebarItem;
