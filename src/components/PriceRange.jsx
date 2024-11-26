import { Range, getTrackBackground } from "react-range";

const PriceRange = ({ priceRange, setPriceRange }) => {
  return (
    <Range
      step={5}
      min={0}
      max={500}
      values={priceRange}
      onChange={(priceRange) => setPriceRange(priceRange)}
      renderTrack={({ props, children }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: "5px",
            width: "30%",
            background: getTrackBackground({
              values: priceRange,
              colors: ["#ccc", "#007783", "#ccc"],
              min: 0,
              max: 500,
            }),
          }}
        >
          {children}
        </div>
      )}
      renderThumb={({ props, value }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: "20px",
            width: "20px",
            backgroundColor: "#007783",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid white",
            outline: "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-28px",
              color: "#fff",
              fontSize: "14px",
              padding: "4px",
              borderRadius: "4px",
              backgroundColor: "#007783",
            }}
          >
            {value}€
          </div>
        </div>
      )}
    />
  );
};

export default PriceRange;
