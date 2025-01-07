import SidebarLayout from "@/components/layouts/SidebarLayout";

import { Outlet } from "react-router";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <SidebarLayout>
      <Outlet />
    </SidebarLayout>
  );
};

export default HomePage;
