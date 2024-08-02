import { styled } from '@mui/material/styles';
import MoaStyledComponent from "../../Style/MoaStyled";
import React, { useEffect, useState } from "react";
import DropList, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import Color from "../../Style/Color";
import Font from "../../Style/Font";

export type StyledProps = {
  /**
   * current element id
   * @defaultValue ""
   * @optional
   * @type string
   */
  id?: React.HtmlHTMLAttributes<HTMLDivElement>["id"];
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
  width?: string | number;
  /**
   * This is a form in which the droplist items are stored in a Map (text:string, value:string | number)
   * @defaultValue new Map()
   */
  itemList:
    | Map<string, string | number>
    | (() => Map<string, string | number>)
    | Array<[string, string | number]>;
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
  onChange?: (event: SelectChangeEvent) => void;
  /**
   * The `input` value. Providing an empty string will select no options.
   * Set to an empty string `''` if you don't want any of the available options to be selected.
   *
   * If the value is an object it must have reference equality with the option in order to be selected.
   * If the value is not an object, the string representation must match with the string representation of the option in order to be selected.
   * @defaultValue ""
   */
  value: any;
  /**
   * The default value. Use when the component is not controlled.
   * @defaultValue ""
   */
  defaultValue?: any;
  /**
   * If true, the droplist is disabled.
   * @defaultValue false
   */
  disabled?: boolean;
  /**
   * Set the background color of droplist
   */
  backgroundColor?: string;

  /**
   * Set the width value of droplist's list width.
   */
  listWidth?: string | number;

  /**
   * If true, the droplist will take up the full width of its container.
   */
  fullWidth?: boolean;

  /**
   * Set the placeholder of droplist's input.
   */
  placeholder?: string;

  /**
   * Set a string max length of droplist's input.
   */
  maxLength?: number;

  /**
   * If true, the droplist will appear below the DOM hierarchy of the parent component.
   */
  disablePortal?: boolean;
};

const useDroplistOpenCloseEffect = () => {
	const [isDroplistOpen, setIsDroplistOpen] = React.useState<boolean>(false);

	const truncateText = React.useCallback((text: string | undefined, maxLength: number | undefined) => {
		if (text === undefined) {
			return "";
		}

		if (isDroplistOpen) {
			return text;
		}

		if (maxLength !== undefined && text.length > maxLength) {
			return text.slice(0, maxLength) + "...";
		}
		return text;
	}, [isDroplistOpen]);

	return { 
		isDroplistOpen, 
		setIsDroplistOpen, 
		truncateText,
	};
}

const StyledComponent = styled((props:StyledProps) => {
	const {id, itemList, width, value, onChange, defaultValue, backgroundColor, listWidth, maxLength, fullWidth = false, disablePortal = false} = props;

	//정방향 map 생성
	const [itemMap, setItemMap] = useState<Map<string, string | number>>(new Map());
	useEffect(() => {
		if (itemList instanceof Function) {
			setItemMap(itemList());
		} else if (itemList instanceof Array) {
			setItemMap(new Map(itemList));
		} else if (itemList instanceof Map) {
			setItemMap(itemList);
		} else {
			console.error('itemList is not a Map or a function that returns a Map');
		}
	}, [itemList]);

	//역방향 map 생성
	const [reverseItemMap, setReverseItemMap] = useState<Map<string | number, string>>(new Map());
	useEffect(() => {
		const reverseMap = new Map();
		itemMap.forEach((value, key) => reverseMap.set(value, key));
		setReverseItemMap(reverseMap);
	}, [itemMap]);

	const parentRef = React.useRef<HTMLDivElement | null>(null);

  const itemWidth = React.useMemo(() => {
    if (listWidth) return listWidth;
    if (parentRef?.current) return `${parentRef.current.offsetWidth}`;
    return "auto";
  }, [listWidth]);

	const { truncateText, isDroplistOpen, setIsDroplistOpen } = useDroplistOpenCloseEffect();

	return (
    <div
			id={id}
			data-current-value={reverseItemMap.get(value) ?? 'error'}
		>
      <FormControl
        ref={parentRef}
        sx={{ width: fullWidth ? '100%' : width, maxHeight: "2rem", '& fieldset':{
          height: "2rem",
        } }}
      >
        <DropList
          defaultValue={defaultValue}
          value={value}
          autoWidth={!fullWidth}
          fullWidth={fullWidth}
          sx={{
            "& .MuiOutlinedInput-input.MuiSelect-select": {
              display: "flex",
              alignItems: "center",
              gap: "0.375rem",
              alignSelf: "stretch",
              padding: "0.375rem 0.375rem 0.375rem 0.625rem",
              //font
              color: Color.text.secondary,
              fontFeatureSettings: Font.fontFeatureSettings,

              //background color
              backgroundColor: backgroundColor || Color.primary.white,
            },
            height: "1.75rem",
          }}
          onChange={onChange}
          disabled={props?.disabled}
          displayEmpty={props?.placeholder ? true : false}

					open={isDroplistOpen}
					onOpen={() => setIsDroplistOpen(true)}
					onClose={() => setIsDroplistOpen(false)}
					MenuProps={{
						disablePortal: disablePortal,
					}}
        >
					{props?.placeholder && 
						<MenuItem disabled value=""
							sx={{
								display: "flex",
								padding: "0.25rem 0.625rem",
								justifyContent: "center",
								alignItems: "center",
								gap: "0.625rem",
								alignSelf: "stretch",
								minHeight: "1.75rem",
								width: itemWidth,
								height: "1.75rem",
								//font
								color: Color.text.secondary,
								fontFeatureSettings: Font.fontFeatureSettings,
							}}
						>
							<em>{`${truncateText(props?.placeholder, maxLength || undefined)}`}</em>
						</MenuItem>
					}
          {Array.from(itemMap.keys()).map((key, index) => {
            if (key === "subheader")
              return (
                <ListSubheader
                  key={"subheader" + itemMap.get(key) + index}
                  sx={{
                    display: "flex",
                    padding: "0.25rem 0.625rem",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "0.625rem",
                    alignSelf: "stretch",
                    height: "1.75rem",
                    width: itemWidth,
                    //font
                    color: Color.text.secondary,
                    fontFeatureSettings: Font.fontFeatureSettings,
                  }}
                >
                  {itemMap.get(key)}
                </ListSubheader>
              );

            return (
              <MenuItem
                key={"item" + itemMap.get(key) + index}
                value={itemMap.get(key)}
                sx={{
                  display: "flex",
                  padding: "0.25rem 0.625rem",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "0.625rem",
                  alignSelf: "stretch",
                  minHeight: "1.75rem",
                  width: itemWidth,
                  height: "1.75rem",
                  //font
                  color: Color.text.secondary,
                  fontFeatureSettings: Font.fontFeatureSettings,
                  "&.Mui-selected": {
                    backgroundColor: `${Color.primary.enable_strock}!important`,
                  },
                  "&:hover": {
                    backgroundColor: `${Color.component.gray_light}!important`,
                  },
                }}
              >
                {truncateText(key, maxLength || undefined)}
              </MenuItem>
            );
          })}
        </DropList>
      </FormControl>
    </div>
  );
})(() => ({
	display: "flex",
	fullWidth: true,
	alignItems: "center",
	alignSelf: "stretch",
	borderRadius: "0.25rem",
	border: `1px solid ${Color.component.gray}`,
	background: Color.primary.white,
}))

const ThemedComponent = (props: StyledProps) => (
	<MoaStyledComponent>
		<StyledComponent {...props} />
	</MoaStyledComponent>
);
export default ThemedComponent;