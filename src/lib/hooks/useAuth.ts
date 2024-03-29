import { useToast } from "@/components/ui/use-toast";
import  secureLocalStorage  from  "react-secure-storage";
import { jwtDecode } from "jwt-decode";
import { useIssnContext } from "./useIssnContext";
import { IssnActionType } from "../types/actions";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { SIGNIN_MUTATION, SIGNOUT_MUTATION } from "../graphql";
import { REFRESH_TOKENS_MUTATION } from "../graphql/refresh-tokens-mutations";
import { useTranslation } from "react-i18next";
import { TokensType, UserRoleType, UserType } from "../types";

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
  const { t } = useTranslation();
  const { toast } = useToast()
  const { dispatch } = useIssnContext()
  const navigate = useNavigate();
  const [login] = useMutation(SIGNIN_MUTATION);
  const [logout, { client }] = useMutation(SIGNOUT_MUTATION);
  const [refreshMutation] = useMutation(REFRESH_TOKENS_MUTATION);

  const weekday = [t("sunday"), t("monday"), t("tuesday"), t("wednesday"), t("thursday"), t("friday"), t("saturday")]

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
  const validateToken = async (): Promise<void> => {
    const session = secureLocalStorage.getItem('session') as TokensType;
    if (!session) return;
    const { exp: expAccesss } = jwtDecode<JwtPayloadType>(session.access_token);
    const { exp: expRefresh } = jwtDecode<JwtPayloadType>(session.refresh_token);
    if (Date.now() >= expRefresh * 1000) {
      secureLocalStorage.clear();
      return;
    };
    if (Date.now() >= expAccesss * 1000) {
      secureLocalStorage.clear();
      await refreshMutation({
        variables: {
          refresh_token: session.refresh_token
        },
        onCompleted: (data) => {
          if (!data.refreshUserTokens.error) {
            updateUserInfo(data.refreshUserTokens);
            secureLocalStorage.setItem("session", data.refreshUserTokens);
          }
        }
      })
    };
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
          client.resetStore();
        }
        toast({
          variant: "default",
          title: !data.signOutUser.error ? t("user_logout_toast_title") : t("error_toast_title"),
          description: !data.signOutUser.error ? t("user_logout_toast_description") : data.signOutUser.error,
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
          title: !data.signInUser.error ? `${user?.name} ${t("user_login_toast_title")}` : t("error_toast_title"),
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
