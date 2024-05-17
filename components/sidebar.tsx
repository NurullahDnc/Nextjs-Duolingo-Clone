import { cn } from "@/lib/utils";

interface props {
    className?: string
}

const Sidebar = ({className}: props) => {
    return ( 
        <div className={cn("bg-blue-300 flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 flex-col border-r-2 ", className)}>
            sidebar
        </div>
     );
}
 
export default Sidebar;