import { FC, ReactElement } from "react";
import {
  Navigate,
  RouteProps as NativeProps,
  useLocation,
} from "react-router-dom";
import { useAuth } from "../context/auth";

interface RouteProps {
  children: JSX.Element;
}

export const RequireAuth: FC<RouteProps> = ({ children, ...props }) => {
  //   const roles = useRoles(route.roles);
  const { session } = useAuth();
  const location = useLocation();

  if (!session) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
