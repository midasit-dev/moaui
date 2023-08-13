import { styled } from '@mui/material/styles';
import React from "react";
import DropList, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import Color from "../Color";
import Font from "../Font";

export type MoaDropListProps = {
	/**
	 * Set the width value of droplist.
	 */
	width? : string
	/**
	 * 우선 Children으로 하위 항목들을 받았는데 itemList라는걸 새로 만들어서 뺄지 고민중
	 */
	children : Map<string, string | number>
	/**
   * Callback fired when a menu item is selected.
   *
   * @param {SelectChangeEvent<Value>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (any).
   * **Warning**: This is a generic event, not a change event, unless the change event is caused by browser autofill.
   * @param {object} [child] The react element that was selected when `native` is `false` (default).
   */
	onChange: (event: SelectChangeEvent) => void;
  /**
   * The `input` value. Providing an empty string will select no options.
   * Set to an empty string `''` if you don't want any of the available options to be selected.
   *
   * If the value is an object it must have reference equality with the option in order to be selected.
   * If the value is not an object, the string representation must match with the string representation of the option in order to be selected.
   */
	value : string;
	/**
   * The default value. Use when the component is not controlled.
   */
	defaultValue?: string;
}

const MoaDropList = styled((props:MoaDropListProps) => {
	const {children, width, value, onChange, defaultValue} = props;

	return (
		<React.Fragment>
			<FormControl sx={{ml:5, width:`${width}`, maxHeightight:"1.75rem"}}>
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
					{Array.from(children.keys()).map((key, index) => {
						if(key === "subheader")
							return (
								<ListSubheader key={"subheader" + index}
									sx={{
										display: "flex",
										padding: "0.25rem 0.625rem",
										justifyContent: "center",
										alignItems: "center",
										gap: "0.625rem",
										alignSelf: "stretch",
										height: "1.75rem",
										width:`${width}`,
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
									{children.get(key)}
								</ListSubheader>
							)

						return (
							<MenuItem key={"item"+index} value={children.get(key)}
								sx={{
									display: "flex",
									padding: "0.25rem 0.625rem",
									justifyContent: "center",
									alignItems: "center",
									gap: "0.625rem",
									alignSelf: "stretch",
									minHeight:"1.75rem",
									width:`${width}`,
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