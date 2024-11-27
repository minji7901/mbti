import { useDispatch } from "react-redux";
import Router from "./routes/Router";
import { useEffect } from "react";
import { fetchUserInfo } from "./redux/slices/authSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      dispatch(fetchUserInfo());
    }
  }, [dispatch]);

  return <Router />;
};

export default App;
