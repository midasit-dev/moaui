import React from "react";
import MoaSeperator, {type StyledProps} from "./Styled";

Moaseperator.defaultProps = {
	direction: "horizontal"
}

/**
 * @param {MoaSeperatorProps} props - direction
 * @returns {React.ReactElement} MoaSeperator
 */
export default function Moaseperator(props:StyledProps): React.ReactElement {
	return (
		<MoaSeperator {...props}/>
	)
}