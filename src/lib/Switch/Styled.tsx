import { styled } from '@mui/material/styles';
import Color from '../Color';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export type StyledProps = {
	/**
   * If `true`, the component is checked.
   */
	checked?: boolean;
  /**
   * A text or an element to be used in an enclosing label element.
   */
  name?: React.ReactNode;
	/**
   * Callback fired when the state is changed.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
	onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
	/**
   * If `true`, the component is disabled.
   */
	disabled?: boolean;
};

type InnerStyledProps = {
	theme: any;
};

const StyledComponent = styled((props: StyledProps) : React.ReactElement => {
	//thumb 스타일 (Switch 내부 버튼)
	const thumbStyle = props?.disabled ? {
		border: 'none',
		backgroundColor: Color.primary.white,
	} : {

		border: `1px solid ${Color.component.gray}`,
		backgroundColor: Color.primary.white,
	}

	const checkedThumbStyle = props?.disabled ? {
		border: 'none',
		backgroundColor: Color.component.gray_light
	} : {
		border: 'none',
		backgroundColor: Color.primary.white
	}

	//track 스타일 (Switch 버튼 외부)
	const trackStyle = props?.disabled ? {
		backgroundColor: Color.component.gray_light,
		border: `1px solid ${Color.component.gray_light}`,
	} : {
		backgroundColor: Color.component.gray_light,
		border: `1px solid ${Color.component.gray}`,
	}

	const checkedTrackStyle = props?.disabled ? {
		backgroundColor: Color.component.gray,
		opacity: 1,
		border: `1px solid ${Color.component.gray}`
	} : {
		backgroundColor: Color.primary.main,
		opacity: 1,
		border: `1px solid ${Color.primary.main}`,
	}

	return (
		<FormControlLabel
			sx={{
				padding: 0,
				margin: 0,
				opacity: 1,
			}}
			control={
				<Switch 
					checked={props?.checked} 
					onChange={props?.onChange}
					disabled={props?.disabled}
					sx={{
						width: '32px',
						height: '16px',
						padding: 0,
						margin: '4px',
						'& .MuiSwitch-switchBase': {
							padding: 0,
							margin: 0,
							transitionDuration: '300ms',
							'&:hover': {
								backgroundColor: 'transparent'
							},
							/** Checked 되었을 경우! */
							'&.Mui-checked': {
								transform: 'translateX(1rem)',
								color: '#fff',
								'.MuiSwitch-thumb': checkedThumbStyle,
								'& + .MuiSwitch-track': checkedTrackStyle,
							},
							'&.Mui-focusVisible .MuiSwitch-thumb': {
								color: '#33cf4d',
								border: '6px solid #000',
								backgroundColor: '#000',
							},
							'&.Mui-disabled .MuiSwitch-thumb': {
								color: '#EEEEEE'
							},
							'&.Mui-disabled + .MuiSwitch-track': {
								opacity: 1
							},
						},
						/** UnChecked 되었을 경우! */
						'& .MuiSwitch-thumb': {
							boxSizing: 'border-box',
							width: '12px',
							height: '12px',
							marginTop: '2px',
							marginLeft: '2px',
							boxShadow: 'none',
							...thumbStyle,
						},
						'& .MuiSwitch-track': {
							width: '30px',
							height: '14px',
							borderRadius: 26 / 2,
							opacity: 1,
							transition: 'background-color 300ms linear',
							...trackStyle,
						},
					}}
				/>
			}
			label={props?.name}
		/>
	)
})((props: InnerStyledProps) => ({}));

export default StyledComponent;