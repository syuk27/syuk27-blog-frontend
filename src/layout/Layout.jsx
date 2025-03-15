import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="container p-12 space-y-4 px-4 mx-auto">
      <Outlet />
    </div>
  );
};

export default Layout;
