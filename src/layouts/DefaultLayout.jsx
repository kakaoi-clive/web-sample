import { Outlet } from 'react-router-dom';

const DefaultLayout = () => {
  return (
    <div className="app bg-white dark:bg-black text-white">
      <Outlet />
    </div>
  );
}

export default DefaultLayout;