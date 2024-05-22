"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useExitModal } from "@/store/use-exit-modal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";


export const ExitModal = () => {
  const router = useRouter();
  const [isClinet, setIsClient] = useState(false);
  const { isOpen, close } = useExitModal();

  useEffect(() => setIsClient(true), []);

  if (!isClinet) {
    return null;
  } 

  return (
    //open- modalın durumu, onOpenChange- modalı kapatma fonksiyonu
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex justify-center items-center mb-5 w-full ">
            <Image src="/mascot_sad.svg" alt="mascot" height={80} width={80} />
          </div>
          <DialogTitle className="text-center font-bold text-2xl ">
            wait, don&apos;t go!
          </DialogTitle>
          <DialogDescription className="text-center text-base ">
            you&apo;re about to leave the lesson. Are you?
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
              Keep learnig
            </Button>

            <Button
              variant="dangerOutline"
              className="w-full"
              size="lg"
              onClick={() => {
                close();
                router.push("/learn");
              }}
            >
              end session
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
