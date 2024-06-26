import { ModeToggle } from '@/components/mode-toggle';
import { Logo } from './logo';
import { UserMenu } from './user-menu';
import { UserType } from '@/lib/types/UserType';
import { LanguageToggle } from './language-toggle';

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
        <div className="flex gap-x-4 items-center">
          {!user ? null : <UserMenu abbreviation={getAbbreviation} />}
          <LanguageToggle />
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
