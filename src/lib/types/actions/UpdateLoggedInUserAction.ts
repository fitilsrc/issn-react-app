import { UserType } from "./UserType";
import { TmdbActionType } from "./enums";

export type UpdateLoggedInUserAction = {
  type: TmdbActionType.UPDATE_USER;
  payload: {
    isLoggedIn: boolean;
    user: UserType;
  };
}
