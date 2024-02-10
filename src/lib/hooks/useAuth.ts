import { useToast } from "@/components/ui/use-toast";
import { UserType } from "../types/UserType";
import  secureLocalStorage  from  "react-secure-storage";
import { jwtDecode } from "jwt-decode";
import { useIssnContext } from "./useIssnContext";
import { UserRoleType } from "../types/UserRolesType";
import { TokensType } from "../types/TokensType";
import { IssnActionType } from "../types/actions";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { SIGNIN_MUTATION, SIGNOUT_MUTATION } from "../graphql";
import { REFRESH_TOKENS_MUTATION } from "../graphql/refresh-tokens-mutations";

type JwtPayloadType = {
  realm_access: any,
  name: string,
  family_name: string,
  given_name: string,
  phone: string,
  email: string,
  exp: number,
}

export function useAuth() {
  const { toast } = useToast()
  const { dispatch } = useIssnContext()
  const navigate = useNavigate();
  const [login] = useMutation(SIGNIN_MUTATION);
  const [logout] = useMutation(SIGNOUT_MUTATION);
  const [refresh] = useMutation(REFRESH_TOKENS_MUTATION);

  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  /**
   * Gets user info from existing access token
   * @returns UserType
   */
  const userInfo = (): UserType | undefined => {
    const session = secureLocalStorage.getItem('session') as TokensType;
    if (!session) return;
    const { realm_access, name, family_name, given_name, phone, email } = jwtDecode<JwtPayloadType>(session.access_token);
    return {
      name,
      given_name,
      family_name,
      phone,
      email,
      roles: realm_access.roles.filter((role: UserRoleType) => Object.keys(UserRoleType).includes(role))
    };
  }

  /**
   * Gets tokens from local storage and validate
   * @returns UserType | undefined
   */
  const validateToken = (): boolean => {
    const session = secureLocalStorage.getItem('session') as TokensType;
    if (!session) return false;
    const { exp: expAccesss } = jwtDecode<JwtPayloadType>(session.access_token);
    const { exp: expRefresh } = jwtDecode<JwtPayloadType>(session.refresh_token);
    if (Date.now() >= expRefresh * 1000) {
      secureLocalStorage.clear();
      return false;
    };
    if (Date.now() >= expAccesss * 1000) {
      refresh({
        variables: {
          refresh_token: session.refresh_token
        },
        onCompleted: (data) => {
          if (!data.refreshUserTokens.error) {
            secureLocalStorage.clear();
            updateUserInfo(data.refreshUserTokens);
            secureLocalStorage.setItem("session", data.refreshUserTokens);
          }
        }
      })
    };

    return true;
  }

  /**
   * Process token to user info
   * @param session
   * @returns UserType
   */
  const updateUserInfo = (session: TokensType) => {
    secureLocalStorage.setItem("session", session);
    const { realm_access, name, family_name, given_name, phone, email } = jwtDecode<JwtPayloadType>(session.access_token);
    const user: UserType = {
      name,
      given_name,
      family_name,
      phone,
      email,
      roles: realm_access.roles.filter((role: UserRoleType) => Object.keys(UserRoleType).includes(role))
    };

    dispatch({
      type: IssnActionType.UPDATE_USER,
      payload: {
        isLoggedIn: true,
        user
      }
    });
  }

  /**
   * Removes user session from server session storage
   * Clear local storage and user info from the context
   */
  const userLogout = () => {
    const session = secureLocalStorage.getItem('session') as TokensType;
    if (!session) navigate("/login");

    logout({
      variables: {
        access_token: session.access_token,
        refresh_token: session.refresh_token
      },
      onCompleted: (data) => {
        if (!data.signOutUser.error) {
          secureLocalStorage.clear();
          dispatch({
            type: IssnActionType.REMOVE_USER,
          });
        }
        toast({
          variant: "default",
          title: !data.signOutUser.error ? "Your are successfully logged out" : "An error occurred",
          description: !data.signOutUser.error ? "All session data has been deleted from the local system" : data.signOutUser.error,
        });
      }
    })
  }

  /**
   * Receives user tokens from server api.
   * Keeps tokens to local storage and user info to context state
   * @param values
   */
  const userLogin = async (values: { username: string, password: string }) => {

    await login({
      variables: {
        username: values.username,
        password: values.password
      },
      onCompleted: (data) => {

        const date = new Date();

        if (!data.signInUser.error) {
          updateUserInfo(data.signInUser);
        }

        const user = userInfo();

        toast({
          variant: "default",
          title: !data.signInUser.error ? `${user?.name} successfully logged in` : "An error occurred",
          description: !data.signInUser.error ? `${weekday.at(date.getDay())},
            ${date.toLocaleString("default", { month: "long" })} ${date.getDate()},
            ${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}` : data.signInUser.error,
        });
      }
    });

    navigate("/");
  }

  return { userLogout, userLogin, validateToken, userInfo }
}
