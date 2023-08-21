import Button from "@midasit-dev/moaui/dist/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from "@mui/material/IconButton"
import CodeComponent from "./CodeBlock";

const Code = `import Button from "@midasit-dev/moaui/dist/Button";\t
function ButtonCompo(props: any) {
	return (
		<Box display={"flex"} width={"100%"} flexDirection={"column"}>ssss
	)
}
`;

export default function ButtonCompo(props: any) {
	return (
		<Box display={"flex"} width={"100%"} flexDirection={"column"}>
			<Typography sx={{fontWeight: 'bold'}} variant="h4" gutterBottom>
				MoaButton
			</Typography>
			<Typography sx={{fontWeight: 'bold'}} variant="h6" gutterBottom>
				Introduction
			</Typography>
			<Typography variant="body1" gutterBottom>
				The MoaButton component is a part of our React project that utilizes the
				moaui component library.
			</Typography><br/>
			<Typography sx={{fontWeight: 'bold'}} variant="h6" gutterBottom>
				Getting Started
			</Typography>
			<Typography variant="body1" gutterBottom>
				To use the MoaButton component from the moaui library in your React project, follow these steps:
			</Typography><br/>
			<Typography sx={{fontWeight: 'bold'}} variant="subtitle2" gutterBottom>
				Installation
			</Typography>
			<Typography variant="body2" gutterBottom>
				First, ensure that you have the moaui library and any other required dependencies installed in your project.
				You can install moaui using npm
			</Typography>
			<Box
				justifyContent={"center"}
				display={"flex"}
				width={"100%"}
			>
				<Box
					sx={{
						border: "1px solid #cce2e8",
						paddingRight: "1rem", paddingLeft:"1rem", paddingTop:"0.5rem", paddingBottom:"0.5rem",
						backgroundColor: "#e1effc",
						mt: 2, mb:2,
						borderRadius: 5
					}}
					display={"flex"}
					width={"60%"}
					justifyContent={"center"}
					flexDirection={"column"}
				>	
					<Stack direction={"row"}>
						<Box display={"flex"} justifyContent={"center"} alignItems={"center"} width={"70%"} height="6rem">
							<Button>MoaButton</Button>
						</Box>
						<Divider variant="middle" orientation="vertical" flexItem/>
						<Box display={"flex"} justifyContent={"center"} alignItems={"center"} width={"30%"} height="6rem">
							TEST
						</Box>
					</Stack>
					<Box>
						<Box display="flex" justifyContent={"right"} sx={{backgroundColor:"#18244a", width:"100%", height:"1.6rem", borderTopLeftRadius:8, borderTopRightRadius:8}}>
							<IconButton>
								<ContentCopyIcon fontSize="small" color="success"/>
							</IconButton>
						</Box>
						<CodeComponent
							language="typescript"
							children={String(Code).replace(/\n$/, "")}
						/>
					</Box>
				</Box>
			</Box>

		</Box>
	);
}
