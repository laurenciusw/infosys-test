import { createBrowserRouter, redirect } from "react-router-dom";
import App from "./App";
import LoginPage from "./views/loginPage";
import Dashboard from "./views/dashboard";

const router = createBrowserRouter([
  {
    element: <App />,
    loader: () => {
      let userStorage = localStorage.user;
      if (!userStorage) {
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    loader: () => {
      let userStorage = localStorage.user;
      if (userStorage) {
        return redirect("/dashboard");
      }
      return null;
    },
  },
  {
    path: "/",
    loader: () => {
      let userStorage = localStorage.user;
      if (userStorage) {
        return redirect("/dashboard");
      } else {
        return redirect("/login");
      }
    },
  },
]);

export default router;
