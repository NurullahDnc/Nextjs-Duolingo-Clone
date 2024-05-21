import { Button } from "@/components/ui/button";
import { NotebookText } from "lucide-react";
import Link from "next/link";

interface UnitBannerProps {
  title: string;
  description: string;
}

const UnitBanner = ({ title, description }: UnitBannerProps) => {
  return (
    <div className=" w-full flex items-center justify-between bg-green-500 text-white p-5 rounded-xl ">
      <div className="space-y-2.5">
        <h3 className="text-xl font-bold">{title}</h3>

        <p className="text-lg">{description}</p>
      </div>

      <Link href="/lesson">
        <Button
          size="lg"
          variant="secondary"
          className=" hidden xl:flex border-2 border-b-4 active:border-b-2 "
        >
          <NotebookText className="mr-2" />
          Contiune
        </Button>
      </Link>
    </div>
  );
};

export default UnitBanner;
