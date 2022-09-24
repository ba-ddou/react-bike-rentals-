import { DashboardNavbar, Header } from "@components/organisms";
import { useAuth } from "@root/providers";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";

interface DashboardLayoutProps {}

const DashboardLayout: FunctionComponent<DashboardLayoutProps> = ({
  children,
}) => {
  const { pathname } = useRouter();
  if (isInMainDashboard(pathname))
    return (
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
    );
  return <>{children}</>;
};

export default DashboardLayout;

function parseDashboardPath(pathname: string) {
  const path = pathname.split("/");
  return path[2];
}


function isInMainDashboard(pathname: string) {
  return pathname.includes("dashboard") && !pathname.includes("auth");
}