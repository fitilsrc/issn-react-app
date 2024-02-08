import { useToast } from "@/components/ui/use-toast";
import { UserType } from "../types/UserType";

export function useAuth() {
  const { toast } = useToast()

  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  const userLogout = () => {
    toast({
      variant: "default",
      title: `Your are successfully logged out`,
      description: 'All session data has been deleted from the local system',
    });
  }

  const userLogin = (values: { username: string, password: string }) => {
    const user: UserType = {
      name: "Jhon Doe",
      given_name: "Jhon",
      family_name: "Doe",
      roles: []
    }

    const date = new Date();

    console.log('[log] form data', values)

    toast({
      variant: "default",
      title: `${user.name} successfully logged in`,
      description: `${weekday.at(date.getDay())},
        ${date.toLocaleString("default", { month: "long" })} ${date.getDate()},
        ${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`,
    });
  }

  return { userLogout, userLogin }
}
