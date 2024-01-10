/**
 *		                                                                         __      
 *		                                                                        /\ \__   
 *		  ___     ___     ___ ___     _____     ___     ___       __     ___    \ \ ,_\  
 *		 /'___\  / __`\ /' __` __`\  /\ '__`\  / __`\ /' _ `\   /'__`\ /' _ `\   \ \ \/  
 *		/\ \__/ /\ \L\ \/\ \/\ \/\ \ \ \ \L\ \/\ \L\ \/\ \/\ \ /\  __/ /\ \/\ \   \ \ \_ 
 *		\ \____\\ \____/\ \_\ \_\ \_\ \ \ ,__/\ \____/\ \_\ \_\\ \____\\ \_\ \_\   \ \__\
 *		 \/____/ \/___/  \/_/\/_/\/_/  \ \ \/  \/___/  \/_/\/_/ \/____/ \/_/\/_/    \/__/
 *		                                \ \_\                                            
 *		                                 \/_/                                            
 */

import React from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { VarDialogConcrete } from "./variables";
import { GuideBox, Button, Dialog, Typography, TextField } from "@midasit-dev/moaui";

const DialogButton = () => {
    const [open, setOpen] = useRecoilState(VarDialogConcrete);

	const [steelYield, setSteelYiled] = React.useState("500");
    const [steelErr, setSteelErr] = React.useState(false);
	
    //steelYield가 0보다 작거나 같으면 에러를 발생시킵니다.
	React.useEffect(() => {
		if (steelYield === "" || steelYield === undefined || steelYield === null || isNaN(+steelYield) || +steelYield <= 0) {
			setSteelErr(true);
		} else {
			setSteelErr(false);
		}
	}, [steelYield]);

	return (
        <>
        <Button variant="contained" onClick={()=>setOpen(true)}> ADDTIONAL INFO. </Button>
        <Dialog open={open} setOpen={setOpen} headerTitle="Additional informations">
            <GuideBox column width={500}>
                <GuideBox width="100%" row horSpaceBetween verCenter>
                    <Typography>
                        Steel chcracteristic yield strength, fyk
                    </Typography>
                    <GuideBox row verCenter spacing={1}>
                        <TextField
                            type="number"
                            width={120}
                            value={steelYield}
                            onChange={(e: any) => setSteelYiled(e.target.value)}
                            error={steelErr}
                        />
                        <Typography>
                            MPa
                        </Typography>
                    </GuideBox>
                </GuideBox>
            </GuideBox>
        </Dialog>
        </>
	);
};

export default DialogButton;
