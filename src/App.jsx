import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCountryOption, getCourses, getPrefCountryOption } from "./features/generalSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { router } from "./routes/Route";
import { agentInformation } from "./features/agentSlice";

function App() {
  const role = localStorage.getItem("role");
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(user)
    dispatch(getCountryOption());
    dispatch(getPrefCountryOption());
    dispatch(getCourses());
    if (role === "2"){
      dispatch(agentInformation())
    }
  }, []);

  return (
    <>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar />
      <div className="overflow-hidden">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
