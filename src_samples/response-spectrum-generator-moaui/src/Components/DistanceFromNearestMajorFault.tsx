import { GuideBox, Typography, TextField } from "@midasit-dev/moaui";
import { useRecoilState } from "recoil";
import { VarDistanceFromNearestMajorFault } from "./variables";

const CompDistanceFromNearestMajorFault = () => {
  const [distance_from_nearest_major_fault, setDistance_from_nearest_major_fault,] = useRecoilState(VarDistanceFromNearestMajorFault);

  return (
    <GuideBox width="100%" row horSpaceBetween>
      <GuideBox width="inherit" row horSpaceBetween verCenter height={30}>
				<GuideBox spacing={0}>
					<Typography variant="h1">Distance From</Typography>
					<Typography variant="h1">Nearest Major Fault (km)</Typography>
				</GuideBox>
        <TextField
          error={false}
          width={200}
          height={30}
          placeholder="Input value ..."
          onChange={(e: any) => setDistance_from_nearest_major_fault(e.target.value)}
          value={distance_from_nearest_major_fault}
          disabled={false}
        />
      </GuideBox>
    </GuideBox>
  );
};

export default CompDistanceFromNearestMajorFault;
