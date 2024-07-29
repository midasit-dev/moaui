import React, { useRef } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Stack } from '@mui/material';
import { SvgIconOwnProps, Tooltip } from '@mui/material';
import { Polygon } from '@midasit-dev/moaui-lab/Section/2D';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';
import StraightenIcon from '@mui/icons-material/Straighten';
import PropsCanvas from '../tabs/props-canvas';
import { editor } from 'monaco-editor';
import Editor, { Monaco } from '@monaco-editor/react';
import * as _ from 'lodash';
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

export default function SolidRectangleTester() {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => setExpanded(!expanded);

	const [favoriteColor, setFavoriteColor] = React.useState<SvgIconOwnProps['color']>('disabled');
	const handleFavoriteClick = () => setFavoriteColor(favoriteColor === 'disabled' ? 'primary' : 'disabled');

	const [tabIdx, setTabIdx] = React.useState(0);
	const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => setTabIdx(newValue);

	const [allProps, setAllProps] = React.useState<any>({
    canvas: {
      background: "#f4f6f7",
      dimension: { width: 500, height: 500 },
      translateCoords: "0, 0",
      autoScale: true,
      scale: 1,
      rotate: 0,
      guideLine: false,
    },
    shape: {
      fill: "white",
      stroke: "#000000",
      strokeWeight: 1,
    },
    vertices: [[{"x":-125,"y":150},{"x":125,"y":150},{"x":125,"y":110},{"x":115,"y":100},{"x":25,"y":100},{"x":15,"y":90},{"x":15,"y":-90},{"x":25,"y":-100},{"x":115,"y":-100},{"x":125,"y":-110},{"x":125,"y":-150},{"x":-125,"y":-150},{"x":-125,"y":-110},{"x":-115,"y":-100},{"x":-25,"y":-100},{"x":-15,"y":-90},{"x":-15,"y":90},{"x":-25,"y":100},{"x":-115,"y":100},{"x":-125,"y":110}]],
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
            <Polygon {...allProps} />
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
                {/* {tabIdx === 1 && <PropsShape {...{allProps, setAllProps}} />} */}
								{tabIdx === 1 && <PropsSizeJsonEditor {...{allProps, setAllProps}} />}
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
			{/* <Tooltip title="shape"><Tab icon={<InterestsIcon />} aria-label="shape" /></Tooltip> */}
			{/* <Tooltip title="reference line"><Tab icon={<LinearScaleIcon />} aria-label="referLLine" /></Tooltip> */}
			<Tooltip title="size"><Tab icon={<StraightenIcon />} aria-label="size" /></Tooltip>
    </Tabs>
  );
}

function PropsSizeJsonEditor(props: any) {
	const { allProps, setAllProps } = props;

	const editorRef = useRef<any>(null);

  function handleEditorDidMount(editor: editor.IStandaloneCodeEditor, monaco: Monaco) {
    editorRef.current = editor;
  }

	const debounceDataChange = _.debounce((value: string | undefined, ev: any) => {
		if (!value) return;

		try {
			const parsed = JSON.parse(value);
			setAllProps({ 
				...allProps, 
				vertices: parsed,
			});
		} catch (err) {
			console.error(err);
		}
	}, 500);

  return (
    <>
      <Editor
        height="90vh"
        defaultLanguage="json"
        defaultValue={JSON.stringify(allProps.vertices, null, 2)}
        onMount={handleEditorDidMount}
				onChange={debounceDataChange}
      />
    </>
  );
}