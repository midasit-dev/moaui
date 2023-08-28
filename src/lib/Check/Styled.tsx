import { styled } from "@mui/material/styles";
import Color from "../Color";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

export type StyledProps = {
  /**
   * If `true`, the component is checked.
   * @defaultValue false
   */
  defaultChecked?: boolean;

  /**
   * Callback fired when the state is changed.
   * @param event The event source of the callback. You can pull out the new checked state by accessing event.target.checked (boolean).
   */
  onChange?: (event: React.SyntheticEvent, checked: boolean) => void;

  /**
   * If `true`, asterisk(*) mark will be appeared after label.
   * @defaultValue false
   */
  required?: boolean;

  /**
   * If `true`, the component appears checked.
   * @defaultValue false
   */
  checked?: boolean;

  /**
   * If `true`, the component appears disabled.
   * @defaultValue false
   */
  disabled?: boolean;

  /**
   * The Name of the component.
   * If not empty, text will appears after button.ssssss
   */
  name?: string;
  /**
   * Defines a string value that labels the current element.
   * @defaultValue "Checkbox"
   */
  ariaLabel?: string;

  /**
   * If `true`, the component appears indeterminate.
   */
  indeterminate?: boolean;

  /**
   * `Not Used` The sx prop lets you style elements quickly using values from your theme.
   * @defaultValue undefined
   */
  sx?: never;
};

type InnerStyledProps = {
  theme: any;
};

const StyledComponent = styled((props: StyledProps): React.ReactElement => {
  return (
    <FormControlLabel
      label={props?.name}
      required={props?.required}
      onChange={props?.onChange}
      disabled={props?.disabled}
      aria-label={`${props?.ariaLabel} FormControlLabel`}
      name={props?.name}
      checked={props?.checked}
      control={
        <Checkbox
          defaultChecked={props?.defaultChecked}
          indeterminate={props?.indeterminate}
          disableFocusRipple
          disableRipple
          disableTouchRipple
          inputProps={{
            "aria-label": `${props?.name || ""} ${props?.ariaLabel}`,
          }}
          sx={{
            ".MuiSvgIcon-root": {
              fontSize: "1rem",
            },
            "&.Mui-checked": {
              color: Color.primary.main,
            },
            "&.MuiCheckbox-indeterminate": {
              color: Color.primary.main,
            },
            ":not(.Mui-checked)": {
              ":not(.MuiCheckbox-indeterminate)": {
                "&:hover": {
                  color: Color.component.gray_dark,
                },
                ":not(hover)": {
                  color: Color.component.gray,
                },
              },
            },
            "&.Mui-disabled": {
              color: `${Color.component.gray_light}!important`,
            },

            margin: "0.25rem",
            padding: 0,
          }}
        />
      }
      sx={{
        m: 0,
        gap: "0.25rem",
        ".MuiTypography-root": {
          fontFamily: "Pretendard",
          fontSize: "0.75rem",
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "0.875rem",
          color: `${Color.text.secondary}!important`,
        },
      }}
    />
  );
})((props: InnerStyledProps) => ({}));

export default StyledComponent;
