import { styled } from '@mui/material/styles';
import MoaStyledComponent from '../../Style/MoaStyled';
import { Dialog } from "@mui/material";
import HelpDialog, { type HelpProps } from "./HelpDialog";
import { GuideBox, IconButton, Icon, Typography } from "../..";

export type StyledProps = {
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
};

const StyledComponent = styled((props: StyledProps) => {
	const { open, setOpen, json, children, headerIcon, headerTitle, ...rest } = props;

	if (json && json.type === 'help') {
		return <HelpDialog open={open} setOpen={setOpen} props={json.data} />;
	}

	return (
    <Dialog open={open} {...rest}>
      <GuideBox
        show
        row
        verCenter
        spacing={1}
        padding={2}
        fill="2"
        horSpaceBetween
      >
        <GuideBox row verCenter spacing={2}>
          {headerIcon ? headerIcon : <></>}
          <Typography variant="h1">{headerTitle}</Typography>
        </GuideBox>
        <IconButton transparent onClick={() => setOpen?.(false)}>
          <Icon iconName="Close" />
        </IconButton>
      </GuideBox>
      <GuideBox padding={2}>{children}</GuideBox>
    </Dialog>
  );
})
(({theme}) => ({}))


const ThemedComponent = (props: StyledProps) => (
	<MoaStyledComponent>
		<StyledComponent {...props} />
	</MoaStyledComponent>
);
export default ThemedComponent;