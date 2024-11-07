import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function OpenRoute({ children }) {
  const { token, user } = useSelector((state) => state.auth);
  const { company } = useSelector((state) => state.company);

  if (!token) {
    return children;
  }

  if (user?.role === "SuperAdmin") {
    return <Navigate to="/admin/dashboard" />;
  }
  if (company?.role === "Company") {
    return <Navigate to="/company/dashboard" />;
  }

  return <Navigate to="/" />;
}

export default OpenRoute;
