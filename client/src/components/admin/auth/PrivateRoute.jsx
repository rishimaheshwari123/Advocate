import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const { token, user } = useSelector((state) => state.auth);
  const { company } = useSelector((state) => state.company);

  if (!token) {
    return <Navigate to="/login" />;
  }

  // Allow access only if the user has either SuperAdmin or Company role
  if (user?.role === "SuperAdmin" || company?.role === "Company") {
    return children;
  }

  return <Navigate to="/" />;
}

export default PrivateRoute;
