import Home from "./pages/home/Home";
import Users from "./pages/users/Users";
import Team from "./pages/team/Team";
import Login from "./pages/login/Login";
import Requests from "./pages/requests/Requests";
import FindAdvisor from "./pages/findAdvisor/FindAdvisor";
import FormGroup from "./pages/formGroup/FormGroup";
import SignUp from "./pages/signUp/SignUp";
import Tasks from "./pages/tasks/Tasks";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Profile from "./components/profile/Profile";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Verification from "./pages/Verification/Verification";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import React from "react";

function App() {
  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/users",
          element: <Users />,
        },
        {
          path: "/project",
          element: <Team />,
        },
        {
          path: "/users/:id",
          element: <Profile />,
        },
        {
          path: "/tasks",
          element: <Tasks />,
        },
        {
          path: "/requests",
          element: <Requests />,
        },
        {
          path: "/find_an_advisor",
          element: <FindAdvisor />,
        },
        {
          path: "/form_group",
          element: <FormGroup />,
        },
      ],
    },
    {
      path: "/register",
      element: <SignUp />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/reset-password",
      element: <ResetPassword />,
    },
    {
      path: "/verify",
      element: <Verification />,
    },
  ]);

  return (
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
  );
}

export default App;
