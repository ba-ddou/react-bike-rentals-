import { DashboardNavbar } from "@components/organisms";
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
        <DashboardNavbar initialPath={parseDashboardPath(pathname)} />
        {children}
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