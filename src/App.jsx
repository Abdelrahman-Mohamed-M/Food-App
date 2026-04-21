import "./App.css";
import { createBrowserRouter } from "react-router";
import AuthLayout from "./modules/Shared/components/AuthLayout/AuthLayout";
import NotFound from "./modules/Shared/components/NotFound/NotFound";
import Login from "./modules/Authentication/components/Login/Login";
import Register from "./modules/Authentication/components/Register/Register";
import ForgetPass from "./modules/Authentication/components/ForgetPass/ForgetPass";
import ResetPass from "./modules/Authentication/components/ResetPass/ResetPass";
import { RouterProvider } from "react-router/dom";
// import MasterLayout from "./modules/Shared/components/MasterLayout/MasterLayout";
import Dashboard from "./modules/Dashboard/components/Dashboard/Dashboard";
import VerifyAccount from "./modules/Authentication/components/VerifyAccount/VerifyAccount";
import MasterLayout from "./modules/Shared/components/MasterLayout/MasterLayout";
import RecipesList from "./modules/Recipes/components/RecipesList/RecipesList";
import RecipeData from "./modules/Recipes/components/RecipeData/RecipeData";
import CategoryData from "./modules/Categories/components/CategoryData/CategoryData";
import CategoriesList from "./modules/Categories/components/CategoriesList/CategoriesList";
import UsersList from "./modules/Users/components/UsersList/UsersList";
import FavList from "./modules/Favourites/components/FavList/FavList";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import ProtectedRoutes from "./modules/Shared/components/ProtectedRoutes/ProtectedRoutes";
function App() {
  let [loginData, setLoginData] = useState(null);

  const saveLoginData = () => {
    const encodedToken = localStorage.getItem("token");
    const decodedToken = jwtDecode(encodedToken);
    setLoginData(decodedToken);
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      saveLoginData();
    }
  }, []);
  const routes = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login saveLoginData={saveLoginData} /> },
        { path: "login", element: <Login saveLoginData={saveLoginData} /> },
        { path: "register", element: <Register /> },
        { path: "forget-pass", element: <ForgetPass /> },
        { path: "reset-pass", element: <ResetPass /> },
        { path: "verify-account", element: <VerifyAccount /> },
      ],
    },
    {
      path: "dashboard",
      element: (
        <ProtectedRoutes loginData={loginData}>
          <MasterLayout
            loginData={loginData}
            setLoginData={setLoginData}
          />{" "}
        </ProtectedRoutes>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "", element: <Dashboard /> },
        { path: "recipes", element: <RecipesList /> },
        { path: "recipe-data", element: <RecipeData /> },
        { path: "categories", element: <CategoriesList /> },
        { path: "users", element: <UsersList /> },
        { path: "favourits", element: <FavList /> },
      ],
    },
  ]);
  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;
