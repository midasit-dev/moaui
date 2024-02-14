import { styled } from '@mui/material/styles';
import { useCallback, useEffect, useState, useMemo } from 'react';
import MoaStyledComponent from "../../Style/MoaStyled";
import TextField from '@mui/material/TextField';
import Color from '../../Style/Color';
import Font from '../../Style/Font';
import Tooltip from '../Tooltip';

export type StyledProps = {
	/**
	 * If `true`, the `input` element is focused during the first mount.
	 * @default false
	 */
	autoFocus?: boolean;
		/**
	 * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
	 */
	type?: React.InputHTMLAttributes<unknown>['type'];
	/**
	 * This is the placeholder attached to the textfield.
	 * @defaultValue ""
	 */
	placeholder?:string,
	/**
	 * This is the title attached to the textfield. 
	 * @defaultValue ""
	 */
	title ?:string,
	/**
	 * Sets where the title will be located outside of the Textfield.
	 * @defaultValue "left"
	 */
	titlePosition ?: "left" | "right" | "top" | "bottom",
	/**
	 * The value to display by default in the textfield.
	 * @defaultValue undefined
	 */
	defaultValue?:string,
		/**
	 * If the value is true, The Textfield border is displayed in red.
	 * @defaultValue false
	 */
	error?: boolean | ((value: string | undefined) => boolean),
			/**
	 * If the value is true, The state of the textfield is disabled.
	 * @defaultValue false
	 */
	disabled?: boolean
	/**
	 * The callback function that is fired when the textfield's value changes.
	 * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
	 * You can pull out the new value by accessing `event.target.value` (string).
	 * @defaultValue undefined
	 */
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	/**
	 * The value of the textfield.
	 * @defaultValue undefined
	 */
	value?:string,
	/**
	 * The width of the textfield.
	 * @defaultValue "auto"
	 * @optional
	 * @type string
	 * @example 
	 * width="auto"
	 * width="100%"
	 * width="10rem"
	 * width="10vw"
	 * width="10vh"
	 * width="10ex"
	 * width="10px"
	 */
	width?: number | string,
	/**
	 * The height of the textfield.
	 */
	height?: string | number;
	/**
	 * The alignment of the textfield.
	 */
	inputAlign?: "left" | "center" | "right",
	/**
	 * The multiline of the textfield.
	 */
	multiline?: boolean,
	/**
	 * The rows of the textfield.
	 */
	rows?: number,
	/**
	 * The max rows of the textfield.
	 */
	maxRows?: number,

	/**
	 * Apply if the type is number.
	 * @defaultValue undefined
	 */
	numberOptions?: {
		/**
		 * The minimum value of the textfield.
		 * @defaultValue undefined
		 */
		min?: number,
		/**
		 * The maximum value of the textfield.
		 * @defaultValue undefined
		 */
		max?: number,
		/**
		 * The step value of the textfield.
		 * @defaultValue undefined
		 */
		step?: number,
		/**
		 * Only accept when number is integer.
		 */
		onlyInteger?: boolean,
	
		/**
		 * The condition of the textfield.
		 * @defaultValue undefined
		 */
		condition?: {
			/**
			 * apply when the value is less than the max value.
			 * @defaultValue "lessEqual"
			 */
			max?: "less" | "lessEqual",
	
			/**
			 * apply when the value is greater than the min value.
			 * @defaultValue "greaterEqual"
			 */
			min?: "greater" | "greaterEqual",
		},
	}
}

const StyledComponent = styled((props:StyledProps) => {
	const { error, ...others } = props;
	const [localValue, setLocalValue] = useState<string | undefined>(props?.value || props?.defaultValue);
	const [tooltipText, setTooltipText] = useState<string | undefined>(undefined);
	const [errorOverride, setErrorOverride] = useState<boolean | undefined>(undefined);
	const numberOptionsMin = useMemo(() => Number(props?.numberOptions?.min), [props?.numberOptions?.min]);
	const numberOptionsMax = useMemo(() => Number(props?.numberOptions?.max), [props?.numberOptions?.max]);
	const Text = useCallback((props: any) => {
		
		return (
			<TextField
				autoFocus={props?.autoFocus}
				type={props?.type}
				onChange={props?.onChange}
				defaultValue={props?.defaultValue}
				error = {props?.error}
				disabled = {props?.disabled}
				value = {props?.value}
				fullWidth
				onBlur={props?.onBlur}
				sx={{
					height: props?.height || "auto",
					'& .MuiOutlinedInput-root': {
						'& fieldset':{
							border: `1px solid ${Color.component.gray}`,
						},
						'&:hover fieldset': {
							border: `1px solid ${Color.component.gray_02}`,
						},
						'&.Mui-focused fieldset':{
							border: `1px solid ${Color.component.gray_dark}`,
						}
					},
					'& .MuiInputBase-input':{
						padding:0
					},
					borderRadius: "0.25rem",
					background: Color.primary.white
				}}
				InputProps={{ // input component의 스타일 변경
					sx:{
						...(props?.multiline ? {height: "auto"} : {height: "1.75rem"}),
						padding: "0.375rem 0.375rem 0.375rem 0.625rem",
						alignItems: "center",
						flexShrink: 0,
						//text
						color: Color.text.secondary,
						fontFeatureSettings: Font.fontFeatureSettings,
					},
					inputProps:{
						style:{
							textAlign: props?.inputAlign,
						},
						min: numberOptionsMin,
						max: numberOptionsMax,
						step: props?.numberOptions?.step,
					}
				}}
				placeholder={props?.placeholder}
				multiline={props?.multiline}
				rows={props?.rows}
				maxRows={props?.maxRows}
			/>
		)
	}, []);

	const errorResolver = useCallback((value: string | undefined) => {
		if (typeof error === "function") {
			return error(value);
		} else {
			return error;
		}
	}, [error]);

	if (props?.type === "number") {
		useEffect(() => {
			if (!Number.isNaN(numberOptionsMin) && !Number.isNaN(numberOptionsMax) && numberOptionsMin > numberOptionsMax) {
				setTooltipText("min is greater than max");
				setErrorOverride(true);
				return;
			}

			let txt = "";
			if (!Number.isNaN(numberOptionsMin)) {
				txt += `min value ${props?.numberOptions?.condition?.min === "greater" ? ">" : ">=" } ${numberOptionsMin}`;
			}
			
			if (!Number.isNaN(numberOptionsMax)) {
				if (txt) txt += "\n";
				txt += `max value ${props?.numberOptions?.condition?.max === "less" ? "<" : "<="} ${numberOptionsMax}`;
			}
			
			setTooltipText(txt);
			setErrorOverride(undefined);
		}, [props?.numberOptions?.condition?.max, props?.numberOptions?.condition?.min, numberOptionsMax, numberOptionsMin, props.type]);

		return (
			<Tooltip open={errorOverride} title={tooltipText} arrowBorder>
				<Text {...others} error={errorResolver(localValue) || errorOverride} onBlur={(e: any) => {
					let value = Number((e.target as HTMLInputElement).value);
					setLocalValue(e.target.value);

					if(props?.numberOptions?.onlyInteger){
						value = Math.round(value);
					}

					if (!Number.isNaN(numberOptionsMin)){
						if (props?.numberOptions?.condition?.min === "greater" && value <= numberOptionsMin) {
							value = numberOptionsMin + 1;
						} else if (props?.numberOptions?.condition?.min === "greaterEqual" && value < numberOptionsMax) {
							value = numberOptionsMin;
						} else if (value <= numberOptionsMin) {
							value = numberOptionsMin;
						}
					}
					
					if (!Number.isNaN(numberOptionsMax)) {
						if (props?.numberOptions?.condition?.max === "less" && value >= numberOptionsMax) {
							value = numberOptionsMax - 1;
						} else if (props?.numberOptions?.condition?.max === "lessEqual" && value > numberOptionsMax) {
							value = numberOptionsMax;
						} else if (value >= numberOptionsMax) {
							value = numberOptionsMax;
						}
					}

					(e.target as HTMLInputElement).value = value + "";
					props?.onChange?.(e as React.ChangeEvent<HTMLInputElement>);
				}} />
			</Tooltip>
		)
	} else {
		useEffect(() => {
			setTooltipText(undefined);
		}, []);
		
		return (
			<Text {...others} error={errorResolver(localValue)} onBlur={(e: any) => setLocalValue(e.target.value)} />
		)
	}
})(({theme}) => ({
	display:"flex",
	fullWidth: true,
}))

const ThemedComponent = (props: StyledProps) => (
	<MoaStyledComponent>
		<StyledComponent {...props} />
	</MoaStyledComponent>
);

export default ThemedComponent;