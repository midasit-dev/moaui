import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Stack } from '@mui/material';
import { SvgIconOwnProps, Tooltip } from '@mui/material';
import { SolidRectangle } from '@midasit-dev/moaui-lab/Section/2D';
import { TextFieldProps } from '@mui/material/TextField';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';
import InterestsIcon from '@mui/icons-material/Interests';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import StraightenIcon from '@mui/icons-material/Straighten';
import PropsCanvas from '../tabs/props-canvas';
import PropsShape from '../tabs/props-shape';
import PropsReferLine from '../tabs/props-reference-line';
import PropsSize from '../tabs/props-size';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function SolidRectangleTester() {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => setExpanded(!expanded);

	const [favoriteColor, setFavoriteColor] = React.useState<SvgIconOwnProps['color']>('disabled');
	const handleFavoriteClick = () => setFavoriteColor(favoriteColor === 'disabled' ? 'primary' : 'disabled');

	const [tabIdx, setTabIdx] = React.useState(0);
	const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => setTabIdx(newValue);

	const [allProps, setAllProps] = React.useState<any>({
		canvas: {
			background: '#f4f6f7',
			dimension: { width: 500, height: 500 },
			translateCoords: '0, 0',
			autoScale: true,
			scale: 1,
			rotate: 0,
			guideLine: false,
		},
		shape: {
			fill: 'white',
			stroke: '#000000',
			strokeWeight: 1,
		},
		referLine: {
			b: {
				offset: 20,
				lineExtension: 5,
				lineExtensionAngle: 5,
				lineColor: 'black',
				lineWeight: 1,
				text: null,
				textColor: 'black',
				textSize: 14,
				textOffset: null,
			},
			h: {
				offset: 20,
				lineExtension: 5,
				lineExtensionAngle: 5,
				lineColor: 'black',
				lineWeight: 1,
				text: null,
				textColor: 'black',
				textSize: 14,
				textOffset: null,
			},
		},
		b: 300,
		h: 300
	}); // all props

  return (
    <Card>
      {/* <CardHeader title="Solid Rectangle Tester" /> */}

      <CardContent>
        <Stack direction="row">
          <Box>
            <SolidRectangle {...allProps} />
          </Box>

          <Box
            sx={{
              position: "fixed",
              right: 0,
              top: 0,
              width: "auto",
              height: "100vh",
              backdropFilter: "blur(10px)",
              borderLeft: "1px solid #d1d1d1",
              backgroundColor: "white",
            }}
          >
            <IconTabs tabIdx={tabIdx} handleChangeTab={handleChangeTab} />
            <Stack width={500} padding={3}>
              <Stack spacing={2}>
                {tabIdx === 0 && <PropsCanvas {...{allProps, setAllProps}} />}
                {tabIdx === 1 && <PropsShape {...{allProps, setAllProps}} />}
                {tabIdx === 2 && <PropsReferLine {...{allProps, setAllProps}} titles={['b', 'h']} />}
								{tabIdx === 3 && <PropsSize {...{allProps, setAllProps}} titles={['b', 'h']} />}
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={handleFavoriteClick}>
          <FavoriteIcon color={favoriteColor} />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
					<Box sx={{ display: 'flex', justifyContent: 'center' }}>
						😜
					</Box>
				</CardContent>
      </Collapse>
    </Card>
  );
}

function IconTabs(props: any) {
	const { tabIdx, handleChangeTab } = props;

  return (
    <Tabs value={tabIdx} onChange={handleChangeTab} aria-label="tabs">
			<Tooltip title="canvas"><Tab icon={<Grid3x3Icon />} aria-label="canvas" /></Tooltip>
			<Tooltip title="shape"><Tab icon={<InterestsIcon />} aria-label="shape" /></Tooltip>
			<Tooltip title="reference line"><Tab icon={<LinearScaleIcon />} aria-label="referLLine" /></Tooltip>
			<Tooltip title="size"><Tab icon={<StraightenIcon />} aria-label="size" /></Tooltip>
    </Tabs>
  );
}