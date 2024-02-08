import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "./tooltip";
import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserType } from "@/lib/types/UserType";

interface NavProps {
  isCollapsed?: boolean;
  links: {
    title: string;
    label?: string;
    icon: React.ElementType;
    variant: "default" | "ghost";
    href: string;
  }[];
  user?: UserType;
}

export function Nav({
  isCollapsed,
  links,
}: NavProps) {
  const pathName = useLocation();

  return (
    <TooltipProvider>
      <nav className="flex flex-col items-start justify-start gap-2">
        {links.map((link, index) =>
          <Fragment key={index}>
            <Tooltip>
              <TooltipTrigger className="w-full" asChild>
                <Link
                  to={link.href}
                  className={cn(
                    "w-full gap-2 justify-start",
                    buttonVariants({
                      variant: link.href === pathName.pathname ? "default" : "ghost",
                      size: "sm",
                      className: "justify-start"
                    }),
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  {!isCollapsed && link.title}
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                align="start"
                alignOffset={10}
                className="flex items-center gap-4"
              >
                {link.title}
                {link.label && (
                  <span className="ml-auto text-muted-foreground">
                    {link.label}
                  </span>
                )}
              </TooltipContent>
            </Tooltip>
          </Fragment>
        )}
      </nav>
    </TooltipProvider>
  );
}