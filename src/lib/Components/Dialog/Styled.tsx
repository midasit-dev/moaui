import { styled } from '@mui/material/styles';
import MoaStyledComponent from '../../Style/MoaStyled';
import { Dialog } from "@mui/material";
import HelpDialog, { type HelpProps } from "./HelpDialog";

export type StyledProps = {
  /**
   * If `true`, the component is only shown.
   */
  justPreview?: boolean;
  /**
   * If `true`, the component is shown.
   */
  open: boolean;
  /**
   * Set setter function of dialog open state
   *
   * @param open
   * @returns void
   */
  setOpen: (open: boolean) => void;
  /**
   * If you define json, it makes dialog dynamic
   */
  json?: {
    type: "" | "help";
    data: object | HelpProps;
  };
};

const StyledComponent = styled((props: StyledProps) => {
	const { open, setOpen, json, ...rest } = props;

	if (json && json.type === 'help') {
		return <HelpDialog open={open} setOpen={setOpen} props={json.data} />;
	}

	return <Dialog open={open} {...rest} />;
})
(({theme}) => ({}))


const ThemedComponent = (props: StyledProps) => (
	<MoaStyledComponent>
		<StyledComponent {...props} />
	</MoaStyledComponent>
);
export default ThemedComponent;