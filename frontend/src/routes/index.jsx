import { createBrowserRouter } from "react-router-dom";
// import App from "../App";

import Home from "../pages/Home";
import App from "../App";
import Login from "../pages/login";
import SignUp from "../pages/SignUp";
import Destinations from "../pages/Destinations";
import ParticularDestination from "../pages/ParticularDestination";
import PostDestination from "../pages/PostDestination";
import Profile from "../pages/Profile";
import AllUsers from "../components/AllUsers";
import MyProfile from "../components/MyProfile";

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
      {
        path: "destinations",
        element: <Destinations />,
      },
      {
        path: "destinations/:destinationId",
        element: <ParticularDestination />,
      },
      {
        path: "postDestination",
        element: <PostDestination />,
      },
      {
        path: "profile",
        element: <Profile />,
        children: [
          {
            path: "allusers",
            element: <AllUsers />,
          },
          {
            path: "myprofile",
            element: <MyProfile />,
          },
        ],
      },
    ],
  },
]);
export default router;
