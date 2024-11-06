import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const { token, user } = useSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (user?.role !== "SuperAdmin") {
    return <Navigate to="/" />;
  }

  return children;
}

export default PrivateRoute;
