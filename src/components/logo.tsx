import { GearIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

interface LogoProps {
  isCollapsed?: boolean;
}

export function Logo({ isCollapsed }: LogoProps) {
  return (
    <Link
      className="flex gap-2 items-center"
      to={"/"}
    >
      <GearIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
      { !isCollapsed ? <span className="font-bold">ISSN UI</span> : null}
    </Link>
  )
}