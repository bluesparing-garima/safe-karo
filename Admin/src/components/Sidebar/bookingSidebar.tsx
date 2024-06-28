/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import logo from "../../assets/logo.svg";
// Define types for menu items and submenu items
type MenuItem = {
  id: number;
  label: string;
  svgIcon?: string;
  link?: string;
  subMenu?: SubMenuItem[];
};

type SubMenuItem = {
  id: number;
  svgIcon?: string;
  label: string;
  link?: string;
};

const bookingSidebar: React.FC = () => {
  // Sample menu items data
  const menuItems: MenuItem[] = [
    {
      id: 1,
      label: "Dashboard",
      link: "/#/dashboard",
      svgIcon: "M4 6h16M4 12h16M4 18h16",
    },
    {
      id: 2,
      label: "Policy",
      svgIcon:
        "M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z",
      subMenu: [
        {
          id: 21,
          label: "Motor",
          link: "/#/policy/motorpolicies",
          svgIcon:
            "M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25m-2.25 0h-2.25m0 0v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v4.964m12-4.006v4.006m0 0v3.75m-12-7.756v3.75m0 0h12m-12 0V14.25m12-4.5V9m0 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25m-2.25 0h-2.25m0 0v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v4.964m12-4.006v4.006m0 0v3.75m-12-7.756v3.75m0 0h12m-12 0V14.25m12-4.5V9",
        },
      ],
    },
    {
      id: 3,
      label: "Booking Request",
      svgIcon:
        "M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z",
      subMenu: [
        {
          id: 31,
          label: "Request",
          link: "/#/booking",
          svgIcon:
            "M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25m-2.25 0h-2.25m0 0v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v4.964m12-4.006v4.006m0 0v3.75m-12-7.756v3.75m0 0h12m-12 0V14.25m12-4.5V9m0 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25m-2.25 0h-2.25m0 0v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v4.964m12-4.006v4.006m0 0v3.75m-12-7.756v3.75m0 0h12m-12 0V14.25m12-4.5V9",
        },
      ],
    },
  ];

  // State to manage active menu item and open/close state of submenus
  const [activeMenuItem, setActiveMenuItem] = useState<number | null>(null);
  const [openSubMenus, setOpenSubMenus] = useState<number[]>([]);

  // Function to handle menu item click
  const handleMenuItemClick = (itemId: number) => {
    setActiveMenuItem(itemId === activeMenuItem ? null : itemId);
  };

  // Function to toggle submenu open/close
  const toggleSubMenu = (parentId: number) => {
    if (openSubMenus.includes(parentId)) {
      setOpenSubMenus(openSubMenus.filter((id) => id !== parentId));
    } else {
      setOpenSubMenus([...openSubMenus, parentId]);
    }
  };

  return (
    <div>
      <div className="hidden md:flex flex-col w-64 bg-white">
        <div className="flex items-center justify-center h-16 bg-white">
          <a href="/">
            <img src={logo} className="w-48 mx-auto" alt="Logo" />
          </a>
        </div>
        {/* Menu */}
        <div className="flex flex-col flex-1 max-h-full overflow-y-auto">
          <div className="flex-1 py-7 bg-white">
            <ul>
              {menuItems.map((item) => (
                <li
                  key={item.id}
                  className={activeMenuItem === item.id ? "active" : ""}
                >
                  {item.subMenu ? (
                    // Render submenu
                    <div className="flex flex-col mt-2 ml-3 mr-3">
                      <div
                        className="flex items-center px-4 py-2 text-gray-500 hover:bg-safekaroDarkBlue hover:text-white hover:rounded-lg cursor-pointer"
                        onClick={() => toggleSubMenu(item.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 mr-2"
                          viewBox="0 0 24 24"
                          stroke="grey"
                          fill="none"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1"
                            d={item.svgIcon}
                          />
                        </svg>
                        {item.label}
                        {openSubMenus.includes(item.id) ? (
                          <>
                            <i className="fas fa-chevron-up text-sm text-gray-400 ml-auto"></i>
                          </>
                        ) : (
                          <>
                            <i className="fas fa-chevron-down text-sm text-gray-400 ml-auto"></i>
                          </>
                        )}
                      </div>
                      {openSubMenus.includes(item.id) && (
                        <>
                          <div className="ml-6 max-h-60 overflow-y-auto">
                            <ul>
                              {item.subMenu.map((subItem) => (
                                <li key={subItem.id}>
                                  <a
                                    href={subItem.link}
                                    className="flex items-center px-4 py-2 mt-2 text-gray-500 hover:bg-safekaroDarkBlue hover:text-white hover:rounded-lg"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      className="h-6 w-6 mr-2"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d={subItem.svgIcon}
                                      />
                                    </svg>
                                    {subItem.label}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    // Render normal menu item
                    <a
                      href={item.link}
                      onClick={() => handleMenuItemClick(item.id)}
                      className="flex items-center px-4 py-2 ml-3 text-gray-500 hover:bg-safekaroDarkBlue hover:text-white hover:rounded-lg mr-3"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mr-2"
                        viewBox="0 0 24 24"
                        stroke="grey"
                        fill="none"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1"
                          d={item.svgIcon}
                        />
                      </svg>
                      {item.label}
                    </a>
                  )}
                  <hr className="my-3" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default bookingSidebar;
