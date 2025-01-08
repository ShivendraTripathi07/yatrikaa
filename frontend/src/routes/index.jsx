import { createBrowserRouter } from "react-router-dom";
// import App from "../App";

import Home from "../pages/Home";
import App from "../App";
import Login from "../pages/login";
import SignUp from "../pages/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
]);
export default router;
