import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
	VarValidations,
  VarPileArrayLong,
  VarPileArrayTran,
  VarPileSpacingLong,
  VarPileSpacingTran,
  VarCapEdgeSpacingLong,
  VarCapEdgeSpacingTran,
	VarCapModeling,
} from "./variables";
import {
  GuideBox,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
} from "@midasit-dev/moaui";

const CompGroupPileAndCapOptions = () => {
	const validations = useRecoilValue(VarValidations);

  const [pile_array_long, setPile_array_long] = useRecoilState(VarPileArrayLong);
  const [pile_array_tran, setPile_array_tran] = useRecoilState(VarPileArrayTran);
  const [pile_spacing_long, setPile_spacing_long] = useRecoilState(VarPileSpacingLong);
  const [pile_spacing_tran, setPile_spacing_tran] = useRecoilState(VarPileSpacingTran);
  const [cap_edge_spacing_long, setCap_edge_spacing_long] = useRecoilState(VarCapEdgeSpacingLong);
  const [cap_edge_spacing_tran, setCap_edge_spacing_tran] = useRecoilState(VarCapEdgeSpacingTran);

	const cap_modeling = useRecoilValue(VarCapModeling);

  return (
    <GuideBox spacing={2}>
      <GuideBox width={300} center>
        <Typography variant="h1">Group Pile & Cap Option</Typography>
      </GuideBox>
      <Table padding="normal" width={300}>
        <TableHead>
          <TableRow>
            {["Component", "Longitudinal", "Transverse"].map(
              (header, index) => (
                <TableCell key={index}>
                  <Typography center>{header}</Typography>
                </TableCell>
              )
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography center>Pile Array</Typography>
            </TableCell>
            <TableCell>
              <TextField
                width={50}
                value={pile_array_long}
                onChange={(e: any) => {setPile_array_long(e.target.value)}}
								error={validations.pile_array(pile_array_long)}
              />
            </TableCell>
            <TableCell>
              <TextField
                width={50}
                value={pile_array_tran}
                onChange={(e: any) => setPile_array_tran(e.target.value)}
								error={validations.pile_array(pile_array_tran)}
							/>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography center>Spacing (c-c)</Typography>
            </TableCell>
            <TableCell>
              <TextField
                width={50}
                value={pile_spacing_long}
                onChange={(e: any) => setPile_spacing_long(e.target.value)}
								error={validations.pile_spacing(pile_spacing_long)}
							/>
            </TableCell>
            <TableCell>
              <TextField
                width={50}
                value={pile_spacing_tran}
                onChange={(e: any) => setPile_spacing_tran(e.target.value)}
								error={validations.pile_spacing(pile_spacing_tran)}
							/>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography center>Cap Edge</Typography>
            </TableCell>
            <TableCell>
              <TextField
                width={50}
                value={cap_edge_spacing_long}
                onChange={(e: any) => setCap_edge_spacing_long(e.target.value)}
								error={validations.cap_edge_spacing(cap_edge_spacing_long)}
								disabled={!cap_modeling}
							/>
            </TableCell>
            <TableCell>
              <TextField
                width={50}
                value={cap_edge_spacing_tran}
                onChange={(e: any) => setCap_edge_spacing_tran(e.target.value)}
								error={validations.cap_edge_spacing(cap_edge_spacing_tran)}
								disabled={!cap_modeling}
							/>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </GuideBox>
  );
};

export default CompGroupPileAndCapOptions;
