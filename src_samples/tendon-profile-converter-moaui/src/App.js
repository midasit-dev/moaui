import React from "react";
import Contents from "./Components/Content";
import { SnackbarProvider } from "notistack";
import { VerifyDialog, VerifyUtil } from "@midasit-dev/moaui";

function App() {
	const [showDialog, setDialogShowState] = React.useState(false);
	React.useEffect(() => {
		if (
			!VerifyUtil.isExistQueryStrings("redirectTo") &&
			!VerifyUtil.isExistQueryStrings("mapiKey")
		) {
			setDialogShowState(true);
		}
	}, []);

	return (
		<React.Fragment>
			<SnackbarProvider maxSnack={3}>
				{showDialog && <VerifyDialog />}
				<Contents />
			</SnackbarProvider>
			<py-script src="./Runtime/pyruntime.py"></py-script>
		</React.Fragment>
	);
}

export default App;
