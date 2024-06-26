import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  //const { isLoggedIn, userData } = useAuth();

  const storedIsLoggedIn = sessionStorage.getItem("isLoggedIn");
  //const storedUserData = JSON.parse(sessionStorage.getItem("userData"));

  if (!storedIsLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;
