function CoordinatesContainer(props) {
  return (
    <div className="coordinatesContainer">
      <h2>
        Coords: {props.coords.x} {props.coords.y}
      </h2>
    </div>
  );
}

export default CoordinatesContainer;
