import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, LayoutDashboard, Users } from 'lucide-react';
import { Logo } from './logo';
import { Nav } from './ui/nav';

export const SideNavBar = () => {
  const [ isCollapsed, setIsCollapsed ] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div className={
      cn(
        "relative px-8 py-9 flex flex-col justify-start items-center gap-20 transition-all",
        isCollapsed ? "min-w-20" : "min-w-fit"
      )
    }>

      <div className="absolute right-[-16px] top-7 z-50">
        <Button
          onClick={toggleSidebar}
          variant="secondary"
          className="rounded-full p-2 w-8 h-8"
        >
          {isCollapsed ? (
            <ChevronRight />
          ) : (
            <ChevronLeft />
          )}

        </Button>
      </div>

      <Logo isCollapsed={isCollapsed} />

      <Nav
        isCollapsed={isCollapsed}
        links={[
          {
            title: "Dashboard",
            label: "User Dashboard",
            href: "/",
            icon: LayoutDashboard,
            variant: "default"
          },
          {
            title: "Persons",
            label: "Person Management",
            href: "/persons",
            icon: Users,
            variant: "default"
          }
        ]}
      />
    </div>
  )
}
