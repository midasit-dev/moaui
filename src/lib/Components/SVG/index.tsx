import React from 'react';
import StyledComponent, { type StyledProps } from "./Styled";

/**
 * moaui Styled SVG
 * 
 * @param props - id, url, alt, width, height
 * @example
 * <SVG
 * 	id="svg"
 * 	url="https://www.example.com/image.svg"
 * 	alt="image of svg"
 * 	width="auto"
 * 	height="auto"
 * />
 * @reuturns JSX.Element
 */

const SVG = (props: StyledProps) => (<StyledComponent	{...props} />);

SVG.defaultProps = {}

const SampleProps = {
	id: "midas_logo_svg",
	url: "https://raw.githubusercontent.com/midasit-dev/moaui-fixed-repo/main/svg/midas_ci_mono_350_150.svg",
	alt: "image of svg",
	width: "350px",
	height: "150px",
}

export default SVG;

export {
	type StyledProps as SVGProps,
	SampleProps as SVGSample,
}