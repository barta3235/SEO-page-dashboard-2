import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Home from "./Home";

const Main = () => {
  return (
    <div>
      {/* <Header></Header> */}
      <Outlet></Outlet>
    </div>
  );
};

export default Main;
