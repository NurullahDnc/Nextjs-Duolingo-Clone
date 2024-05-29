"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePracticeModal } from "@/store/use-practice-modal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";


export const PracticeModal = () => {
  const router = useRouter();
  const [isClinet, setIsClient] = useState(false);
  const { isOpen, close } = usePracticeModal();

  useEffect(() => setIsClient(true), []);

  if (!isClinet) {
    return null;
  } 

  const onClick =()=>{
    close();
    router.push("/store")
  }

  return (
    //open- modalın durumu, onOpenChange- modalı kapatma fonksiyonu
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex justify-center items-center mb-5 w-full ">
            <Image src="/heart.svg" alt="heart" height={80} width={80} />
          </div>
          <DialogTitle className="text-center font-bold text-2xl ">
            Practice lesson
          </DialogTitle>
          <DialogDescription className="text-center text-base ">
            use Practice lessons of regain hearts and points.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mb-4">
          <div className="flex flex-col gap-y-4 w-full ">
            <Button
              variant="primary"
              className="w-full"
              size="lg"
              onClick={close}
            >
              I understand
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
