import { DashboardNavbar, Header } from "@components/organisms";
import { useRouter } from "next/router";
import { FunctionComponent, useEffect } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebaseApp from "config/firebase";
import { GlobalDataProvider } from "@root/providers";
import BikeProvider from "@root/providers/BikeProvider";
import { useAuth } from "@root/hooks";
import { UserRole } from "@root/@types";
const auth = getAuth(firebaseApp);

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  const { pathname, push } = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    if (user.role === UserRole.MANAGER)
      onAuthStateChanged(auth, (user) => {
        if (!user) push("/dashboard/auth");
      });
  }, [user]);

  if (isInMainDashboard(pathname))
    return (
      <GlobalDataProvider>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          {/* TODO: passing the initialPath is not enough, the navbar needs to watch for pathname changes  */}
          <DashboardNavbar initialPath={parseDashboardPath(pathname)} />
          <div
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              paddingLeft: 80,
            }}
          >
            <Header />
            <div
              style={{
                padding: "3rem",
              }}
            >
              {children}
            </div>
          </div>
        </div>
      </GlobalDataProvider>
    );
  return <BikeProvider>{children}</BikeProvider>;
};

export default Layout;

function parseDashboardPath(pathname: string) {
  const path = pathname.split("/");
  return path[2];
}

function isInMainDashboard(pathname: string) {
  return pathname.includes("dashboard") && !pathname.includes("auth");
}
