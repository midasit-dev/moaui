import { MarginTypes } from "../../Style/Margin";
import { PaddingTypes } from "../../Style/Padding";
import MoaStyledComponent from "../../Style/MoaStyled";

export interface StyledProps extends MarginTypes, PaddingTypes {
  /**
   * current element id
   * @defaultValue ""
   * @optional
   * @type string
   */
  id?: React.HtmlHTMLAttributes<HTMLDivElement>["id"];
  /**
   * The URL of the SVG or image.
   */
  url?: string;
  /**
   * The alt prop of the SVG or image.
   */
  alt?: string;

  /**
   * The width of the SVG or image.
   */
  width?: string | number;
  /**
   * The height of the SVG or image.
   */
  height?: string | number;
}

const StyledComponent = (props: StyledProps) => {
	const { id, url, alt, width, height } = props;
	return (
		<img {...{
			id,
			src: url,
			alt,
			width,
			height,
		}} />
  );
}

const ThemedComponent = (props: StyledProps) => (
	<MoaStyledComponent>
		<StyledComponent {...props} />
	</MoaStyledComponent>
);

export default ThemedComponent;