import { useToast } from "@/components/ui/use-toast";
import { UserType } from "../types/UserType";
import  secureLocalStorage  from  "react-secure-storage";
import { jwtDecode } from "jwt-decode";
import { useIssnContext } from "./useIssnContext";
import { UserRoleType } from "../types/UserRolesType";
import { TokensType } from "../types/TokensType";
import { IssnActionType } from "../types/actions";
import { useNavigate } from "react-router-dom";

const session = {
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ0WmNGMUlHWGU5UVlhZXV2NmQxVS1makY5V0JBS2lVWEM5eTd5Ml9VM2lnIn0.eyJleHAiOjE3MDc0OTg5ODgsImlhdCI6MTcwNzQ5ODY4OCwianRpIjoiZGNiYmEzYTctZjdlZi00NWQ1LTk5MTItNGI1YTE2YjUyZjYzIiwiaXNzIjoiaHR0cDovL2tleWNsb2FrOjgwODAvYXV0aC9yZWFsbXMvaXNzbiIsImF1ZCI6WyJyZWFsbS1tYW5hZ2VtZW50IiwiYWNjb3VudCJdLCJzdWIiOiJlNzNjZmI0Ny01MjBjLTRiM2EtODZlNC03NTI3ZTdhNWE1NWEiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJpc3NuLWNsdXN0ZXIiLCJzZXNzaW9uX3N0YXRlIjoiMjA5NGE1NTUtNDc1ZC00YjZiLWFhNjktM2NlNjk4ODdlNGQ0IiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsImRlZmF1bHQtcm9sZXMtaXNzbiIsInVtYV9hdXRob3JpemF0aW9uIiwiSVNTTl9BRE1JTiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InJlYWxtLW1hbmFnZW1lbnQiOnsicm9sZXMiOlsibWFuYWdlLXJlYWxtIiwibWFuYWdlLXVzZXJzIiwibWFuYWdlLWNsaWVudHMiXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsInNpZCI6IjIwOTRhNTU1LTQ3NWQtNGI2Yi1hYTY5LTNjZTY5ODg3ZTRkNCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6IlNlcmhpaSBEb3ZoeWkiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJpc3NuX2FkbWluIiwiZ2l2ZW5fbmFtZSI6IlNlcmhpaSIsImZhbWlseV9uYW1lIjoiRG92aHlpIiwiZW1haWwiOiJkb3ZoeWkuc2VyaGlpQGdtYWlsLmNvbSJ9.ShzBOUk2QaDr3DsR7rQvQhKQZh84sfQJ9TvTEU6me3wYIco29KSbjofPZp1_ONN8Ny5iDGu7ZSxxoqZWGugbYgY74yooQGyuGN8WM_reRryRgtZheQsOagQ3cMzM9bOW_OcK-tKtPF7WUbSlQNtKEKw-hCb5SvGImEk-8wWr4S-LOJAkB0oY7QvkHQJ4VydOn39wJDdnwVAh7NqkiC_yz0gEr4ozLlaW7EYdnDzKIOWXi3mKRkwtsXNyQKsCQsIp5iqo63QcNDmV-EBPU-3iAiUr_M6ZBBBCbBFWlsd4yQ2u7PYIE2ZIBoXVHokvdHhepBlqMJ1hfQ1J41oabjA5TA",
  "expires_in": 300,
  "refresh_expires_in": 1799,
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIxMjVjYjg4OS03NWFiLTQ0NTUtYWJlOS04MWZlMzU4NjdkMmEifQ.eyJleHAiOjE3MDc1MDA0ODgsImlhdCI6MTcwNzQ5ODY4OCwianRpIjoiZDhkOTE2YzAtNjZlOS00MjM4LTg5NGItYjgwYmIwZmZmZDlmIiwiaXNzIjoiaHR0cDovL2tleWNsb2FrOjgwODAvYXV0aC9yZWFsbXMvaXNzbiIsImF1ZCI6Imh0dHA6Ly9rZXljbG9hazo4MDgwL2F1dGgvcmVhbG1zL2lzc24iLCJzdWIiOiJlNzNjZmI0Ny01MjBjLTRiM2EtODZlNC03NTI3ZTdhNWE1NWEiLCJ0eXAiOiJSZWZyZXNoIiwiYXpwIjoiaXNzbi1jbHVzdGVyIiwic2Vzc2lvbl9zdGF0ZSI6IjIwOTRhNTU1LTQ3NWQtNGI2Yi1hYTY5LTNjZTY5ODg3ZTRkNCIsInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsInNpZCI6IjIwOTRhNTU1LTQ3NWQtNGI2Yi1hYTY5LTNjZTY5ODg3ZTRkNCJ9.eP0LeCD69etj219uXIm6-Lw4unuaBvYv8bCaxVeOFio"
}

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
      secureLocalStorage.clear();
      /**
       * to to refresh new tokens mutation
       */
    };

    return true;
  }

  /**
   * Process token to user info
   * @param session
   * @returns UserType
   */
  const updateUserInfo = (session: TokensType): UserType => {
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

    return user
  }

  /**
   * Removes user session from server session storage
   * Clear local storage and user info from the context
   */
  const userLogout = () => {
    secureLocalStorage.clear();

    dispatch({
      type: IssnActionType.REMOVE_USER,
    });

    toast({
      variant: "default",
      title: `Your are successfully logged out`,
      description: 'All session data has been deleted from the local system',
    });
  }

  /**
   * Receives user tokens from server api.
   * Keeps tokens to local storage and user info to context state
   * @param values
   */
  const userLogin = (values: { username: string, password: string }) => {

    /**
     * to do login mutation
     */

    console.log('[log] form data', values)

    const date = new Date();
    const user = updateUserInfo(session);

    secureLocalStorage.setItem("session", session);

    toast({
      variant: "default",
      title: `${user.name} successfully logged in`,
      description: `${weekday.at(date.getDay())},
        ${date.toLocaleString("default", { month: "long" })} ${date.getDate()},
        ${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`,
    });

    navigate("/");
  }

  return { userLogout, userLogin, validateToken, userInfo }
}
