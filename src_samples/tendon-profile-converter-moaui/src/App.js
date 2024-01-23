import React from "react";
import Contents from "./Components/Content";
import { SnackbarProvider } from "notistack";
import { GuideBox, MidasController, VerifyDialog, VerifyUtil } from "@midasit-dev/moaui";

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
				{process.env.NODE_ENV === 'development' && <MidasController title='Tendon Profile Converter' icoSrc={`${process.env.PUBLIC_URL}/favicon.ico`}/>}
				<GuideBox width="100%" center>
					<GuideBox padding={2}>
						<Contents />
					</GuideBox>
				</GuideBox>
			</SnackbarProvider>
			<py-script src="./Runtime/pyruntime.py"></py-script>
		</React.Fragment>
	);
}

export default App;
