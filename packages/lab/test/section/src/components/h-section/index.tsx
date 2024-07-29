import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Stack } from '@mui/material';
import { SvgIconOwnProps, Tooltip } from '@mui/material';
import { HSection } from '@midasit-dev/moaui-lab/Section/2D';
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
import { motion } from 'framer-motion';

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

export default function HSectionTester() {
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
			tw: {
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
			b1: {
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
			tf1: {
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
			b2: {
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
			tf2: {
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
			r1: {
				halfLength: 20,
				lineColor: 'black',
				lineWeight: 1,
				text: null,
				textColor: 'black',
				textSize: 14,
			},
			r2: {
				halfLength: 20,
				lineColor: 'black',
				lineWeight: 1,
				text: null,
				textColor: 'black',
				textSize: 14,
			},
		},
		h: 300,
		tw: 50,
		b1: 250,
		tf1: 50,
		b2: 250,
		tf2: 50,
		r1: 10,
		r2: 10,
	}); // all props

  return (
    <Card>
      {/* <CardHeader title="Solid Rectangle Tester" /> */}

      <CardContent>
        <Stack direction="row">
					<motion.div
						initial={{ opacity: 0, x: -500 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ type: "spring", stiffness: 260, damping: 20, duration: 0.3 }}
					>
            <HSection {...allProps} />
          </motion.div>

          <motion.div
						initial={{ opacity: 0, x: 500 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ type: "spring", stiffness: 260, damping: 20, duration: 0.3 }}
            style={{
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
                {tabIdx === 2 && 
									<PropsReferLine 
										{...{allProps, setAllProps}} 
										titles={['h', 'tw', 'b1', 'tf1', 'b2', 'tf2', 'r1', 'r2']} 
									/>
								}
								{tabIdx === 3 && 
									<PropsSize 
										{...{allProps, setAllProps}} 
										titles={['h', 'tw', 'b1', 'tf1', 'b2', 'tf2', 'r1', 'r2']} 
									/>
								}
              </Stack>
            </Stack>
          </motion.div>
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