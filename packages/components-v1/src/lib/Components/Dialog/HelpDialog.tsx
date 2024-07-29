import { Dialog } from "@mui/material";
import { Stack, Typography, IconButton, Icon } from "../..";

export interface BodyProps {
	/**
	 * @single Body Title (any) - Body Content (any)
	 * @composite Body Title (any) - Body Content (any[])
	 */
	type?: 'single' | 'multiple'
	title?: any;
	content?: any | any[];
}

export interface HelpProps {
	/**
	 * If you customize the icon, it will be displayed with the corresponding icon.
	 * 
	 * @default <HelpIcon />
	 */
	titleIcon?: React.ReactNode;
	/**
	 * If you customize the text, it will be displayed with the corresponding text.
	 */
	titleText?: string;
	/**
	 * If you customize the body, it will be displayed with the corresponding body.
	 */
	body?: BodyProps[];
}

const HelpIcon = () => {
	return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.4 8.4H6.6V9.6H5.4V8.4ZM6 0C2.688 0 0 2.688 0 6C0 9.312 2.688 12 6 12C9.312 12 12 9.312 12 6C12 2.688 9.312 0 6 0ZM6 10.8C3.354 10.8 1.2 8.646 1.2 6C1.2 3.354 3.354 1.2 6 1.2C8.646 1.2 10.8 3.354 10.8 6C10.8 8.646 8.646 10.8 6 10.8ZM6 2.4C4.674 2.4 3.6 3.474 3.6 4.8H4.8C4.8 4.14 5.34 3.6 6 3.6C6.66 3.6 7.2 4.14 7.2 4.8C7.2 6 5.4 5.85 5.4 7.8H6.6C6.6 6.45 8.4 6.3 8.4 4.8C8.4 3.474 7.326 2.4 6 2.4Z"
        fill="#343A3F"
      />
    </svg>
  );
}

const HelpDialog = ({
	open, 
	setOpen, 
	onClose, 
	props
}: {
	open: boolean; 
	setOpen?: (open: boolean) => void; 
	onClose?: () => void; 
	props?: HelpProps;
}) => {
	return (
    <Dialog
      open={open}
      onClose={() => {
				//esc | backdrop click
        setOpen?.(false);
        onClose?.();
      }}
    >
      <Stack direction="column" justifyContent="center" spacing={1}>
        {/** Title Bar */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          paddingX={2}
          paddingY={1}
          spacing={1}
          bgcolor={"#dddddd"}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            {props?.titleIcon ? props?.titleIcon : <HelpIcon />}
            <Typography variant="h1">
              Help : {props?.titleText ? props?.titleText : "Define title text"}
            </Typography>
          </Stack>
          <IconButton transparent onClick={() => {
						setOpen?.(false);
						onClose?.();
					}}>
            <Icon iconName="Close" />
          </IconButton>
        </Stack>

        {/** Body Region*/}
        <Stack
          direction="column"
          justifyContent="center"
          padding={2}
          spacing={1}
        >
          {props?.body?.map((body, index) => {
            if (body.type === "single") {
              return (
                <Stack
                  key={index}
                  direction="column"
                  spacing={1}
                  paddingBottom={2}
                >
                  <Typography variant="h1">{body.title}</Typography>
                  <Typography>{body.content}</Typography>
                </Stack>
              );
            } else if (body.type === "multiple") {
              return (
                <Stack direction="column" spacing={1} paddingBottom={2}>
                  <Typography variant="h1">{body.title}</Typography>
                  {body.content?.map((content: any, index: number) => {
                    if (typeof content === "string") {
                      return <Typography key={index}>{content}</Typography>;
                    } else {
                      return <div key={index}>{content}</div>;
                    }
                  })}
                </Stack>
              );
            } else {
              return <Typography>undefined body type</Typography>;
            }
          })}
        </Stack>
      </Stack>
    </Dialog>
  );
}

export default HelpDialog;