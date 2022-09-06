import "../scss/coordinates/_coordsContainer.scss";

function CoordinatesContainer(props) {
  return (
    <div className="coordinatesContainer">
      <h2>
        <p>Coords:</p>
        <p data-testid="coordinatevalues">
          {props.coords.x} {props.coords.y}
        </p>
      </h2>
    </div>
  );
}

export default CoordinatesContainer;
