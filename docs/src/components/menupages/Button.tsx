import Button from "@midasit-dev/moaui/dist/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function ButtonCompo(props: any) {
	return ( 
		<Box display={"flex"} width={"100%"} flexDirection={"column"}>
			<Typography variant="h5"  gutterBottom>MoaButton Component</Typography>
			<Typography variant="h6" gutterBottom>Introduction</Typography>
			<Typography variant="body1" gutterBottom>The MoaButton component is a part of our React project that utilizes the moaui component library. </Typography>
			<Box sx={{border:"1px solid #000000", padding:"1rem"}} display={"flex"} width={"50%"} justifyContent={"center"}>
				<Button>MoaButton</Button>
			</Box>
		</Box>
	);
}