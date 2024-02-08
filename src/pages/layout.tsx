import { Header } from "@/components/header";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { SideNavBar } from "@/components/side-navigation-bar";
import { Separator } from "@/components/ui/separator";
import { UserType } from "@/lib/types/UserType";
import { Loader } from "@/components/ui/loader";

export const Layout = ({ isLoading }: { isLoading?: boolean }) => {

  const user: UserType = {
    name: "Jhon Doe",
    given_name: "Jhon",
    family_name: "Doe",
    roles: []
  }

  return (
    <div className="flex min-h-screen w-full">
      {
        !user ? null : <SideNavBar />
      }
      <Separator orientation="vertical" className="h-screen"/>
      <div className="w-full">
        <Header user={user}/>
        <Separator />
        <main className="w-full p-8 h-[calc(100vh-4rem)]">
          {!isLoading ? <Outlet /> : <Loader />}
          <Toaster />
        </main>
      </div>
    </div>
  )
}
