import * as React from 'react';
import { styled } from '@mui/material/styles';
import * as MuiIcon from '@mui/icons-material';
import { type iconNameType, IconNameTypes } from './iconDict';

export type StyledProps = {
	/**
	 * The name of the icon.
	 * Icon name is the same as the name of the icon component in MUI.
	 * @link https://mui.com/components/material-icons/
	 * @type string
	 * @example
	 * iconName="Add"
	 * iconName="CheckCircle"
	 */
	iconName: iconNameType;
}

const StyledComponent = styled((props:StyledProps) => {
	const { iconName } = props;

	if (iconName === undefined || 
			iconName === null ||
			iconName === "" ) { return (<>Icon Name is undefined or null.</>) }
	
	if (!IconNameTypes.includes(iconName)) { return (<>Icon Name is not valid.</>) }

	const iconStyle = {
		fontSize: '16px',   // Set icon size to 16px
	};

	const Icon = MuiIcon[iconName as keyof typeof MuiIcon] as React.ElementType;
	
	return (
		<Icon style={iconStyle} />
	)
})
(({theme}) => ({}))

const ThemedComponent = (props: StyledProps) => (
	<StyledComponent {...props} />
);

export default ThemedComponent;