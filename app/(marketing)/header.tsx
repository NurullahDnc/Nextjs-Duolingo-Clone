import { Button } from "@/components/ui/button";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="h-20 w-full border-slate-200 px-4 border-b-2 ">
      <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full ">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3  ">
          <Image src={"/mascot.svg"} width={40} height={40} alt="mascot" />
          <h1 className="text-2xl font-extrabold text-green-600  tracking-wide ">
            Lingo
          </h1>
        </div>

        {/* Clerk kütüphanesi, yüklenirken gösterilecek içerik, icon */}
        <ClerkLoading>
          <Loader className=" h-5 w-5 text-muted-foreground animate-spin " />
        </ClerkLoading>
        
        {/* Clerk kütüphanesi başarıyla yüklendiğinde gösterilecek içerik */}
        <ClerkLoaded>
          {/* Kullanıcı oturum açtığında gösterilecek içerik */}
          <SignedIn>
            {/*Oturum acıldıgında gosterilecek button, cıkış yapıldıgında "/" yonlendir */}
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          {/* Kullanıcı oturum açmadığında gösterilecek içerik */}
          <SignedOut>
            <SignInButton mode="modal" forceRedirectUrl="/as">
              <Button variant="ghost" size="lg">
                Login
              </Button>
            </SignInButton>
          </SignedOut>
        </ClerkLoaded>
      </div>
    </header>
  );
};
