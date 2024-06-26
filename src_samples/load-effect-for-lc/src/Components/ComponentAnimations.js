//skeleton
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

function rNumber() {
	const min = 30;
	const max = 100;
	return (Math.floor(Math.random() * (max - min + 1)) + min);
}

function Animations() {
  return (
    <Box sx={{ width: 1108, height: 495 }}>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
      <Skeleton width={`${rNumber()}%`} />
      <Skeleton width={`${rNumber()}%`} />
      <Skeleton width={`${rNumber()}%`} />
      <Skeleton width={`${rNumber()}%`} />
      <Skeleton width={`${rNumber()}%`} />
    </Box>
  );
}

export default Animations;