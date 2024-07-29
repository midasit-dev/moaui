import React from 'react';
import { styled } from '@mui/material/styles';
import MoaStyledComponent from '../../Style/MoaStyled';
import { Dialog } from "@mui/material";
import HelpDialog, { type HelpProps } from "./HelpDialog";
import { GuideBox, Typography, Icon } from "../..";


export type StyledProps = {
  /**
   * current element id
   * @defaultValue ""
   * @optional
   * @type string
   */
  id?: React.HtmlHTMLAttributes<HTMLDivElement>["id"];
  /**
   * If `true`, the component is shown.
   */
  open: boolean;
  /**
   * title icon of dialog
   */
  headerIcon?: React.ReactNode;
  /**
   * title text of dialog
   */
  headerTitle?: string;
  /**
   * children of dialog
   */
  children?: React.ReactNode;
  /**
   * If `true`, the component is only shown.
   */
  justPreview?: boolean;
  /**
   * Set setter function of dialog open state
   *
   * @param open
   * @returns void
   */
  setOpen?: (open: boolean) => void;
  /**
   * If you define json, it makes dialog dynamic
   */
  json?: {
    type: "" | "help";
    data: object | HelpProps;
  };

  /**
   * If you define onClose, it makes dialog dynamic
   */
  onClose?: () => void;

  /**
   * Set a Hidden Close Option
   */
  hiddenClose?: boolean;
};

const StyledComponent = styled((props: StyledProps) => {
	const {
		id,
    open,
    setOpen,
    json,
    children,
    headerIcon,
    headerTitle,
    onClose,
		hiddenClose,
    ...rest
  } = props;

	if (json && json.type === 'help') {
		return <HelpDialog open={open} setOpen={setOpen} onClose={onClose} props={json.data} />;
	}

	return (
    <Dialog
			id={id}
      open={open}
      onClose={() => {
				//esc | backdrop click
        setOpen?.(false);
        onClose?.();
      }}
			maxWidth={false}
			{...rest}
    >
      <GuideBox show row verCenter spacing={1} padding={2} fill="2" horSpaceBetween>
        <GuideBox row verCenter spacing={2}>
          {headerIcon ? headerIcon : <></>}
          <Typography variant="h1">{headerTitle}</Typography>
        </GuideBox>
        {!hiddenClose && (
          <Icon
            iconName='Close'
            toButton 
            onClick={() => {
              setOpen?.(false);
              onClose?.();
            }}
          />
        )}
      </GuideBox>
      <GuideBox padding={2}>{children}</GuideBox>
    </Dialog>
  );
})
(() => ({}))


const ThemedComponent = (props: StyledProps) => (
	<MoaStyledComponent>
		<StyledComponent {...props} />
	</MoaStyledComponent>
);
export default ThemedComponent;