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
	/**
	 * The opacity of the icon.
	 * @type number
	 * @defaultValue 1
	 * @example
	 * opacity={0.5}
	 */
	opacity?: number;
	/**
	 * If `true`, the component is shown as a button.
	 */
	toButton?: boolean;
	/**
	 * The click event handler of the icon.
	 */
	onClick?: (event: React.SyntheticEvent) => void;
}

const Default = (props: StyledProps) => {
	const { iconName, opacity } = props;

	if (iconName === undefined || 
			iconName === null ||
			iconName === "" ) { return (<>Icon Name is undefined or null.</>) }
	
	if (!IconNameTypes.includes(iconName)) { return (<>Icon Name is not valid.</>) }

	const iconStyle = {
		fontSize: '16px',   // Set icon size to 16px
		opacity: opacity,
	};

	const Icon = MuiIcon[iconName as keyof typeof MuiIcon] as React.ElementType;

	return (
		<Icon style={iconStyle} />
	)
}

const ToButton = (props: StyledProps) => {
	const { iconName, opacity, onClick, } = props;

  const [varOpacity, setVarOpacity] = React.useState(1);

  const customStyle = {
		display: 'flex',
    width: 'atuo',
    height: 'auto',
    cursor: 'pointer',
    opacity: varOpacity,
    transition: 'opacity 0.1s ease',
  };

	const MuiIconWrapper = MuiIcon[iconName as keyof typeof MuiIcon] as React.ElementType;

  return (
    <div
      style={customStyle}
      onMouseOver={() => setVarOpacity(0.5)}
      onMouseOut={() => setVarOpacity(1)}
      onMouseDown={() => setVarOpacity(0.2)}
      onMouseUp={() => setVarOpacity(0.5)}
			onClick={onClick}
    >
			<MuiIconWrapper 
				sx={{
					fontSize: '16px',   // Set icon size to 16px
					opacity: opacity,
				}}
			/>
		</div>
  );
}

const StyledComponent = styled((props:StyledProps) => {
	const { toButton } = props;
	if (toButton) { 
		return <ToButton {...props} />
	}

	return <Default {...props} />
})
(() => ({}))

const ThemedComponent = (props: StyledProps) => (
	<StyledComponent {...props} />
);

export default ThemedComponent;