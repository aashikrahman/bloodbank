import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Navigate } from "react-router";

const ProtectedRoute = ({ childern, adminOnly }) => {
  const { user , loading} = useContext(AuthContext);

  if(loading) return <p>!loading</p>
  if (!user) return <Navigate to="/" />;
  if (adminOnly && !user.role === "admin")
    return <Navigate to="/profile" replace />;

  return childern;
};

export default ProtectedRoute;
