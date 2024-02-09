import React from "react";
import { UserRoleType } from "@/lib/types/UserRolesType";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useIssnContext } from "@/lib/hooks/useIssnContext";

interface SecuredRouteProps {
  allovedRoles: UserRoleType[];
}

export const SecuredRoute = ({ allovedRoles }: SecuredRouteProps) => {
  const { state } = useIssnContext();
  const location = useLocation();

  return (
    !state.isLoggedIn ? (
      <Navigate to="/login" state={{ from: location }} replace />
    ) : (
      <Outlet />
    )
  )
};
