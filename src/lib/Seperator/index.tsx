import React from "react";
import MoaSeperator, {type  MoaSeperatorProps} from "./Styled";

Moaseperator.defaultProps = {
	Direction: "horizontal"
}

/**
 * @param {MoaSeperatorProps} props - Direction
 * @returns {React.ReactElement} MoaSeperator
 */
export default function Moaseperator(props:MoaSeperatorProps): React.ReactElement {
	return (
		<MoaSeperator {...props}/>
	)
}