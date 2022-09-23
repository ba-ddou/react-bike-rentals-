import { DashboardNavbar } from "@components/organisms";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";

interface DashboardLayoutProps {}

const DashboardLayout: FunctionComponent<DashboardLayoutProps> = ({
  children,
}) => {
  const { pathname } = useRouter();
  if (pathname.includes("dashboard"))
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <DashboardNavbar />
        {children}
      </div>
    );
  return <>{children}</>;
};

export default DashboardLayout;
