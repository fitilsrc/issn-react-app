import { UserRoleType } from "./UserRolesType";

export type UserType = {
  name: string,
  given_name: string,
  family_name: string,
  phone?: string,
  email?: string,
  roles: UserRoleType[],
}