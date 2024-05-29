"use client"

import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

const Promo = () => {
    return ( 
        <div className=" border-2 rounded-xl p-4 space-y-4  ">
            <div className=" space-y-4 ">
                <div className="flex items-center gap-x-4 ">
                    <Image
                        src="/unlimited.svg"
                        alt="pro"
                        width={26}
                        height={26}
                    />
                    <h3 className=" font-bold text-lg ">
                        Upgrade to pro
                    </h3>
                    <p className=" Get unlimited hearts and more! ">
                        get unlimited hearts and more!
                    </p>

                </div>
                <Link href="/shop">
                <Button asChild variant="super" className="w-full" size="lg" >
                    Upagre today
                </Button>
                </Link>
            </div>
        </div>
     );
}
 
export default Promo;