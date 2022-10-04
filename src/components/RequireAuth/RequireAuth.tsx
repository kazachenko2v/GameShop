import React from "react";
import { useSelector } from "react-redux";
import { getUid } from "../../redux/auth/selectors";

import { Navigate } from "react-router-dom";

const RequireAuth: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const uid = useSelector(getUid);

  return uid ? children : <Navigate replace to="/" />;
};

export default RequireAuth;
