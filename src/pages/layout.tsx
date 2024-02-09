import { Header } from "@/components/header";
import { Outlet } from "react-router-dom";
import { useIssnContext } from "@/lib/hooks/useIssnContext";
import { Loader, Separator, SideNavBar, Toaster } from "@/components";

export const Layout = ({ isLoading }: { isLoading?: boolean }) => {
  const { state } = useIssnContext();

  return (
    <div className="flex min-h-screen w-full">
      {
        !state.isLoggedIn ? null : <SideNavBar />
      }
      <Separator orientation="vertical" className="h-screen"/>
      <div className="w-full">
        <Header user={state.user}/>
        <Separator />
        <main className="w-full p-8 h-[calc(100vh-4rem)]">
          {!isLoading ? <Outlet /> : <Loader />}
          <Toaster />
        </main>
      </div>
    </div>
  )
}
