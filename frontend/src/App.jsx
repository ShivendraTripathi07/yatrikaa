import "./App.css";
import { Outlet } from "react-router-dom";
// import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import Api from "./common";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import { useEffect } from "react";
import Context from "./context";
function App() {
  const dispatch = useDispatch(); // what does disptatch used for
  const fetchUserDetail = async () => {
    try {
      const dataResponse = await fetch(Api.current_user.url, {
        method: Api.current_user.method,
        credentials: "include",
      });
      const dataApi = await dataResponse.json(); // Await the JSON parsing
      // console.log("User Detail Response:", dataApi.data); // Log the full response for inspection
      if (dataApi.success) {
        dispatch(setUserDetails(dataApi.data)); // Assuming 'data' holds user details
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    fetchUserDetail();
  }, []);
  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetail,
        }}
      >
        {/* <Header /> */}
        <ToastContainer position="top-right" />
        <main className="mt-0 overflow-y-hidden">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
