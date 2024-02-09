import { Dispatch, PropsWithChildren, createContext, useContext, useReducer } from "react";
import { UserType } from "../types/UserType";
import { IssnActionType, RemoveLoggedInUserAction, UpdateLoggedInUserAction } from "../types/actions";

export type IssnStateType = {
  isLoggedIn?: boolean;
  user?: UserType;
}

export type IssnAction =
  | UpdateLoggedInUserAction
  | RemoveLoggedInUserAction

export const issnReducer = (state: IssnStateType, action: IssnAction) => {
  switch (action.type) {

    case IssnActionType.UPDATE_USER:
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        user: action.payload.user,
      };

    case IssnActionType.REMOVE_USER:
      return {
        ...state,
        isLoggedIn: false,
        user: undefined,
      };

    default:
      return state;
  }
}

export const IssnContext = createContext<{
  state: IssnStateType,
  dispatch: Dispatch<IssnAction>,
}>({
  state: {},
  dispatch: () => null,
});

export function useIssnContext() {
  return useContext(IssnContext)
}

export function IssnProvider({ children }: PropsWithChildren) {
  const initial = {
    isLoggedIn: true,
    user: {
      name: 'test',
      given_name: 'test',
      family_name: 'test',
      phone: '123456',
      email: 'test@local.com',
      roles: [],
    },
  }

  const [state, dispatch] = useReducer(issnReducer, initial);

  return (
    <IssnContext.Provider value={{state, dispatch}}>
      { children }
    </IssnContext.Provider>
  );
}
