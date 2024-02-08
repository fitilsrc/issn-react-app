import React from 'react';
import { ModeToggle } from '@/components/mode-toggle';
import { Logo } from './logo';
import { UserMenu } from './user-menu';
import { UserType } from '@/lib/types/UserType';

interface HeaderProps {
  user?: UserType
}

export const Header = ({
  user
}: HeaderProps) => {

  const getAbbreviation = !user
    ? ""
    : `${user?.given_name.split("")[0].toUpperCase()}${user?.family_name
        .split("")[0]
        .toUpperCase()}`;

  return (
    <header>
      <div className="flex h-16 items-center space-x-4 justify-between mt-[14px] px-8">
        <div>
          {!user ? <Logo /> : null}
        </div>
        <div className="flex gap-x-6 items-center">
          <UserMenu abbreviation={getAbbreviation} />
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
