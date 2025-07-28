import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const token = localStorage.getItem("token");
  const isAuthenticated = !!token && !!user;

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    isAuthenticated,
    user,
    logout: handleLogout,
  };
};
