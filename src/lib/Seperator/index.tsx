import React from "react";
import MoaSeperator, {type  MoaSeperatorProps} from "./Styled";

Moaseperator.defaultProps = {
	direction: "horizontal"
}

/**
 * @param {MoaSeperatorProps} props - direction
 * @returns {React.ReactElement} MoaSeperator
 */
export default function Moaseperator(props:MoaSeperatorProps): React.ReactElement {
	return (
		<MoaSeperator {...props}/>
	)
}