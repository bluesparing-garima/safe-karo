import { Navigate, useLocation, useRoutes } from "react-router-dom";
import routes from "./routes";
import "./App.css";
import Sidebar from "./components/Sidebar/sidebar";
import AgentSidebar from "./components/Sidebar/agentSideBar";
import BookingSidebar from "./components/Sidebar/bookingSidebar";
import OperationSidebar from "./components/Sidebar/operationSideBar";
import Header from "./components/Header/header";
import { SafekaroProvider } from "./context/SafeKaroContext";
import { SafeKaroUser } from "./context/constant";

function App() {
  const content = useRoutes(routes);
  const location = useLocation();
  const currentUrl = location.pathname;
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let userData = storedTheme ? JSON.parse(storedTheme) : storedTheme;

  return (
    <>
      <SafekaroProvider>
        {currentUrl === "/" ||
        currentUrl === "/signup" ||
        currentUrl === "/403" ? (
          <> {content}</>
        ) : (
          <>
            {userData !== null && userData !== undefined ? (
              <div className="flex h-screen bg-gray-100">
                {userData.role.toLowerCase() === "admin" && <Sidebar />}
                {userData.role.toLowerCase() === "agent" && <AgentSidebar />}
                {userData.role.toLowerCase() === "booking" && (
                  <BookingSidebar />
                )}
                {userData.role.toLowerCase() === "operation" && (
                  <OperationSidebar />
                )}

                {/* {userData.role.toLowerCase() === "admin" && <Sidebar />}
                {userData.role.toLowerCase() === "agent" && <AgentSidebar />}
                {userData.role.toLowerCase() === "booking" ||
                  (userData.role.toLowerCase() === "operation" && (
                    <BookingSidebar />
                  ))} */}

                <div className="flex flex-col flex-1 overflow-y-auto">
                  <Header />
                  {content}
                </div>
              </div>
            ) : (
              <Navigate to="/403" />
            )}
          </>
        )}
      </SafekaroProvider>
    </>
  );
}

export default App;
