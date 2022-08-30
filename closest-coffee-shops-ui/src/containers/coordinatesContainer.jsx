import { useSelector } from "react-redux";

function CoordinatesContainer() {
  const coords = useSelector((state) => state.coords);

  return (
    <div className="coordinatesContainer">
      <h2>
        Coords: {coords.x} {coords.y}
      </h2>
    </div>
  );
}

export default CoordinatesContainer;
