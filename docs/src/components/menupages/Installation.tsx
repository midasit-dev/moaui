import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CodeComponent from "./CodeBlock";

const InstallCode = `npm install @midasit-dev/moaui`;
const PeerdependenciesCode = `"peerDependencies": {
  "react": "^18.2.0",
  "react-dom": "^18.2.0"
  "@emotion/styled": "^11.11.0",
}`;

export default function Installation(props:any){

	return(
		<Box display={"flex"} width={"100%"} flexDirection={"column"}>
      <Typography sx={{ fontWeight: "bold" }} variant="h4" gutterBottom>
        Installation
      </Typography>
      <Typography sx={{ fontWeight: "bold" }} variant="h6" gutterBottom>
        Get Started with MoaUI
      </Typography>
      <Typography variant="body1" gutterBottom>
        MoaUI is a React component library that provides a set of reusable UI components.<br/>
				If you want to create a plugin used in midas program(like Civil, Gen, etc...), you can use this library.
				<br/>
				<br/>
				You can install MoaUI using npm. Let's start with the installation.
			</Typography>
      <CodeComponent
				title="npm"
        language="typescript"
        children={String(InstallCode).replace(/\n$/, "")}
      />
      <br />
      <Typography sx={{ fontWeight: "bold" }} variant="h6" gutterBottom>
				Peer dependencies
      </Typography>
      <Typography variant="body1" gutterBottom>
        Please note that MoaUI has peer dependencies on 'react', 'react-dom', and '@emotion/styled'.
      </Typography>
			<CodeComponent
				title="pacakge.json"
        language="typescript"
        children={String(PeerdependenciesCode).replace(/\n$/, "")}
      />
    </Box>
	)
}