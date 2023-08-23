import { styled } from '@mui/material/styles';
import React from "react";
import DropList, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import Color from "../Color";
import Font from "../Font";
import Box from '@mui/material/Box'

export type MoaDropListProps = {
	/**
	 * Set the width value of droplist.
	 * The width value is applied to the droplist and the droplist's input.
	 * @optional
	 * @type string
	 * @example
	 * width="100px"
	 * width="100%"
	 * @defaultValue "auto"
	 */
	width? : string
	/**
	 * This is a form in which the droplist items are stored in a Map (text:string, value:string | number)
	 * @defaultValue new Map()
	 */
	itemList : Map<string, string | number> | (() => Map<string, string | number>);
	/**
   * Callback fired when a menu item is selected.
   *
   * @param {SelectChangeEvent<Value>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (any).
   * **Warning**: This is a generic event, not a change event, unless the change event is caused by browser autofill.
   * @param {object} [child] The react element that was selected when `native` is `false` (default).
	 * 
	 * @defaultValue () => {}
   */
	onChange: (event: SelectChangeEvent) => void;
  /**
   * The `input` value. Providing an empty string will select no options.
   * Set to an empty string `''` if you don't want any of the available options to be selected.
   *
   * If the value is an object it must have reference equality with the option in order to be selected.
   * If the value is not an object, the string representation must match with the string representation of the option in order to be selected.
	 * @defaultValue ""
   */
	value : string;
	/**
   * The default value. Use when the component is not controlled.
	 * @defaultValue ""
   */
	defaultValue?: string;
}

const MoaDropList = styled((props:MoaDropListProps) => {
	const {itemList, width, value, onChange, defaultValue} = props;
	const itemMap = typeof itemList === 'function' ? itemList() : itemList;

	const [parentWidthInPixels, setParentWidthInPixels] = React.useState<number>(0);
	const parentRef = React.useRef<HTMLDivElement | null>(null);

	React.useEffect(() => {
		if(parentRef.current){
			setParentWidthInPixels(parentRef.current.offsetWidth);
		}
	},[width]);

	return (
		<React.Fragment>
			<FormControl ref={parentRef} sx={{width: width, maxHeightight:"1.75rem"}}>
				<DropList
					defaultValue={defaultValue}
					autoWidth
					value={value}
					sx={{
						'& .MuiOutlinedInput-input.MuiSelect-select':{
							display: "flex",
							alignItems: "center",
							gap: "0.375rem",
							alignSelf: "stretch",
							padding: "0.375rem 0.375rem 0.375rem 0.625rem",
							//font
							color: Color.text.secondary,
							fontFeatureSettings: Font.fontFeatureSettings,
							/* body1 */
							fontFamily: Font.fontFamily,
							fontSize: "0.75rem",
							fontStyle: "normal",
							fontWeight: 400,
							lineHeight: "0.875rem",
						},
						height: "1.75rem",
					}}
					onChange={onChange}
				>
					{Array.from(itemMap.keys()).map((key, index) => {
						if(key === "subheader")
							return (
								<ListSubheader key={"subheader" + itemMap.get(key) + index}
									sx={{
										display: "flex",
										padding: "0.25rem 0.625rem",
										justifyContent: "center",
										alignItems: "center",
										gap: "0.625rem",
										alignSelf: "stretch",
										height: "1.75rem",
										width: `${parentWidthInPixels}px`,
										//font
										color: Color.text.secondary,
										fontFeatureSettings: Font.fontFeatureSettings,
										/* body1 */
										fontFamily: Font.fontFamily,
										fontSize: "0.75rem",
										fontStyle: "normal",
										fontWeight: 400,
										lineHeight: "0.875rem", /* 116.667% */
									}}
								>
									{itemMap.get(key)}
								</ListSubheader>
							)

						return (
							<MenuItem key={"item"+ itemMap.get(key) + index} value={itemMap.get(key)}
								sx={{
									display: "flex",
									padding: "0.25rem 0.625rem",
									justifyContent: "center",
									alignItems: "center",
									gap: "0.625rem",
									alignSelf: "stretch",
									minHeight:"1.75rem",
									width: `${parentWidthInPixels}px`,
									height:"1.75rem",
									//font
									color: Color.text.secondary,
									fontFeatureSettings: Font.fontFeatureSettings,
									/* body1 */
									fontFamily: Font.fontFamily,
									fontSize: "0.75rem",
									fontStyle: "normal",
									fontWeight: 400,
									lineHeight: "0.875rem",
									'&.Mui-selected':{
										backgroundColor: `${Color.primary.enable_strock}!important`,
									},
									'&:hover': {
										backgroundColor: `${Color.component.gray_light}!important`,
									}
								}}
							>
								{key}
							</MenuItem>
						)
					})}
				</DropList>	
			</FormControl>
		</React.Fragment>
	)
})(({theme}) => ({
	display: "flex",
	fullWidth: true,
	alignItems: "center",
	alignSelf: "stretch",
	borderRadius: "0.25rem",
	border: `1px solid ${Color.component.gray}`,
	background: Color.primary.white,
}))

export default MoaDropList;