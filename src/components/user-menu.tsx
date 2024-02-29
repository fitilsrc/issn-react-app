import { useAuth } from '@/lib/hooks/useAuth';
import { Avatar, AvatarFallback } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useTranslation } from 'react-i18next';

interface UserMenuProps {
  abbreviation: string,
}

export const UserMenu = ({
  abbreviation
}: UserMenuProps) => {
  const { t } = useTranslation();
  const { userLogout } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Avatar className="select-none">
          <AvatarFallback>{abbreviation}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{t("my_account")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>{t("profile")}</DropdownMenuItem>
        <DropdownMenuItem>{t("setting")}</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={userLogout} className="hover:cursor-pointer">{t("log_out")}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
