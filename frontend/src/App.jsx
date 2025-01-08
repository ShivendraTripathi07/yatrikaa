import "./App.css";
import { Outlet } from "react-router-dom";
// import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <>
      {/* <Header /> */}
      <ToastContainer position="top-right" />
      <main className="mt-0">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
