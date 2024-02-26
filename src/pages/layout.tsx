import { Header } from "@/components/header";
import { Outlet } from "react-router-dom";
import { useIssnContext } from "@/lib/hooks/useIssnContext";
import { Loader, Separator, SideNavBar, Toaster } from "@/components";

export const Layout = ({ isLoading }: { isLoading?: boolean }) => {
  const { state } = useIssnContext();

  return (
    <div className="flex justify-stretch w-full">
      {
        !state.isLoggedIn ? null : <SideNavBar />
      }
      <div className="w-full relative">
        <Separator orientation="vertical" className="absolute h-full left-0"/>
        <Header user={state.user}/>
        <Separator />
        <main className="w-full p-8">
          {!isLoading ? <Outlet /> : <Loader />}
          <Toaster />
        </main>
      </div>
    </div>
  )
}
