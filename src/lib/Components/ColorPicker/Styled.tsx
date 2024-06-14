import React from "react";
import { RgbColorPicker, RgbColor } from "react-colorful";
import TextFieldV2 from "../TextFieldV2";

export type StyledProps = {
	/**
	 * current element id
	 * @defaultValue ""
	 * @optional
	 * @type string
	 */
	id?: React.HtmlHTMLAttributes<HTMLDivElement>['id'],
  /**
   * The color of the button.
   * @defaultValue "black"
   * @optional
   * @type RgbColor
   */
  color?: RgbColor;
  /**
   * The callback function that is fired when the button is clicked.
   * @param {RgbColor} color The color source of the callback.
   * @defaultValue ()=>{}
   * @optional
   * @type (color:string) => void
   * @example
   * onChange={(color) => {}}
   * onChange={handleChange}
   */
  onChange?: (newColor: RgbColor) => void;

  /**
   * Show RGB Color TextField
   */
  showRGB?: boolean;
  /**
   * The direction of the button.
   * @defaultValue "column"
   * @optional
   * @type "row" | "column"
   */
  direction?: "row" | "column";
};

const StyledComponent = (props: StyledProps) => {
  const { color, onChange, showRGB, direction } = props;
  const [rgbColor, setrgbColor] = React.useState<RgbColor>({
    r: 255,
    g: 255,
    b: 255,
  });

	const [currentColor, setCurrentColor] = React.useState<string>(JSON.stringify(color || rgbColor));

  return (
    <div
      id={props?.id}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: direction,
        width: direction === "column" ? "200px" : "auto",
        height: direction === "row" ? "200px" : "auto",
      }}
			data-temporary={currentColor}
    >
      <div
        style={{
          marginRight: direction === "row" ? "20px" : 0,
          marginBottom: direction === "column" ? "10px" : 0,
        }}
      >
        <RgbColorPicker
          color={rgbColor || color}
          onChange={(newColor) => {
            setrgbColor(newColor as RgbColor);
            onChange?.(newColor as RgbColor);
						setCurrentColor(JSON.stringify(newColor as RgbColor));
          }}
        />
      </div>
      {showRGB && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <div
            style={{ marginBottom: direction === "column" ? "5px" : "25px" }}
          >
            <TextFieldV2
              title="Red"
              width={direction === "row" ? "150px" : "100%"}
              type={"number"}
              value={rgbColor.r.toString() || color?.r.toString()}
              onChange={(e) => {
                color && onChange?.({ ...color, r: parseInt(e.target.value) });
                setrgbColor({ ...rgbColor, r: parseInt(e.target.value) });
              }}
              numberOptions={{
                max: 255,
                min: 0,
                onlyInteger: true,
              }}
            />
          </div>
          <div
            style={{ marginBottom: direction === "column" ? "5px" : "25px" }}
          >
            <TextFieldV2
              title="Green"
              width={direction === "row" ? "150px" : "100%"}
              type={"number"}
              value={rgbColor.g.toString() || color?.g.toString()}
              onChange={(e) => {
                color && onChange?.({ ...color, g: parseInt(e.target.value) });
                setrgbColor({ ...rgbColor, g: parseInt(e.target.value) });
              }}
              numberOptions={{
                max: 255,
                min: 0,
              }}
            />
          </div>
          <div style={{ marginBottom: "5px" }}>
            <TextFieldV2
              title="Blue"
              width={direction === "row" ? "150px" : "100%"}
              type={"number"}
              value={rgbColor.b.toString() || color?.b.toString()}
              onChange={(e) => {
                color && onChange?.({ ...color, b: parseInt(e.target.value) });
                setrgbColor({ ...rgbColor, b: parseInt(e.target.value) });
              }}
              numberOptions={{
                max: 255,
                min: 0,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StyledComponent;
