import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../redux/filter/slice";
import { useLocation } from "react-router-dom";

export const useResetPageWhenUnmount = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setCurrentPage(1));
    };
  }, [location.pathname]);
};
