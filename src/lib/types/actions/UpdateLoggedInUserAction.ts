import { UserType } from "../UserType";
import { IssnActionType } from "./IssnActionType";

export type UpdateLoggedInUserAction = {
  type: IssnActionType.UPDATE_USER;
  payload: {
    isLoggedIn: boolean;
    user: UserType;
  };
}
