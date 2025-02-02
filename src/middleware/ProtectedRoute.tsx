import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode, JwtPayload } from "jwt-decode";

const ProtectedRoute = () => {
  // Ambil token dari localStorage
  const token = localStorage.getItem("access_token");

  const isAuthenticated = token !== null && isTokenValid(token);

  return isAuthenticated ? <Outlet /> : <Navigate replace to="/login" />;
};

const isTokenValid = (token: string): boolean => {
  try {
    const decodedToken = jwtDecode<JwtPayload>(token);

    if (decodedToken.exp && decodedToken.exp * 1000 > Date.now()) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error decoding token:", error);

    return false;
  }
};

export default ProtectedRoute;
