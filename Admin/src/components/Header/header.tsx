/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { SafeKaroUser } from "../../context/constant";

const Header = () => {
  const [userData, setUserData] = useState<any>();
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  useEffect(() => {
    if (storedTheme) {
      setUserData(JSON.parse(storedTheme!));
    }
  }, [storedTheme]);
  const signOut = () => {
    localStorage.removeItem("user");
    localStorage.clear();
  };
  return (
    <>
      {/* Main content */}
      <div className="flex items-center justify-between bg-white py-4 px-6 ">
        <div className="text-2xl font-medium">{/* Welcome Back, Jay */}</div>
        <div className="flex items-center">
          <div className="bg-orange-200 p-3 rounded-lg mr-6">
            <i className="fas fa-bell text-l "></i>
          </div>
          <div className="flex items-center">
            <div className="group relative cursor-pointer ">
              <div className="flex items-center justify-between space-x-0 bg-white px-4">
                <a
                  href="/"
                  className="menu-hover my-1 py-0 text-base font-medium text-black lg:mx-4"
                >
                  <p className="text-l font-semibold">{userData?.name!}</p>
                  <p className="text-gray-500 text-sm">{userData?.role!}</p>
                </a>
              </div>

              <div className="invisible rounded-lg absolute z-50 flex w-full flex-col bg-white py-0 px-4 text-gray-800 shadow-xl group-hover:visible">
                <a
                  href="/"
                  className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-1"
                >
                  Profile
                </a>

                <a
                  href="/"
                  onClick={signOut}
                  className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-1"
                >
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
