import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSelectedPoint } from "../slices/selectedPointSlice";

export function useSelectedPoint(point) {
  const dispatch = useDispatch();

  const dispatchSelectedPoint = (point) => {
    dispatch(setSelectedPoint(point));
  };

  useEffect(() => {
    if (point) {
      dispatchSelectedPoint(point);
    }
  }, [point]);
}
