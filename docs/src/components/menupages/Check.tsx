import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CodeComponent from "./CodeBlock";
import { CheckCompo } from "@midasit-dev/moaui/Check/Demo";

const ImportCode = `import Check from "@midasit-dev/moaui/Check"`;

export default function CheckComponent(props: any) {
	return (
    <Box display={"flex"} width={"100%"} flexDirection={"column"}>
      <Typography sx={{ fontWeight: "bold" }} variant="h4" gutterBottom>
        MoaCheck
      </Typography>
      <Typography sx={{ fontWeight: "bold" }} variant="h6" gutterBottom>
        Introduction
      </Typography>
      <Typography variant="body1" gutterBottom>
        The MoaCheck component is a part of our React project that utilizes the
        moaui component library.
      </Typography>
      <br />
      <Typography sx={{ fontWeight: "bold" }} variant="h6" gutterBottom>
        Getting Started
      </Typography>
      <Typography variant="body1" gutterBottom>
        To use the MoaCheck component from the moaui library in your React
        project, follow these steps:
      </Typography>
      <CodeComponent
        language="typescript"
        children={String(ImportCode).replace(/\n$/, "")}
      />
      <br />
      <Typography sx={{ fontWeight: "bold" }} variant="subtitle2" gutterBottom>
        Installation
      </Typography>
      <Typography variant="body2" gutterBottom>
        First, ensure that you have the moaui library and any other required
        dependencies installed in your project. You can install moaui using npm
      </Typography>
      <Box justifyContent={"center"} display={"flex"} width={"100%"}>
        <CheckCompo />
      </Box>
    </Box>
  );
}
