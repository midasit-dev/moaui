import React from 'react';
import { Button, Check, GuideBox, Table, TableHead, TableRow, TableCell, TableBody, Typography, Stack, DropList, TextField, Panel } from "@midasit-dev/moaui";

const ComponentsTableWithTitle = ({
	title = "Table Title Text", 
  spacing = 2, 
  headers = [
    'head1', 'head2', 'head3'
  ], 
  rows = [
    [ 'Row Text', <TextField width='50px' />, <TextField width='50px' /> ],
    [ 'Row Text', <TextField width='50px' />, <TextField width='50px' /> ],
    [ 'Row Text', <TextField width='50px' />, <TextField width='50px' /> ],
  ], 
}) => {
  return (
		<Panel width={300}>
			<Stack spacing={spacing} display='flex' justifyContent='center'>
				<Panel flexItem width="100%">
					<Typography variant="h1">{title}</Typography>
				</Panel>
				<Table padding="normal" width={300}>
					<TableHead>
						<TableRow>
							{headers.map((header, index) => <TableCell key={index}><Typography textAlign='center'>{header}</Typography></TableCell>)}
						</TableRow>
					</TableHead>
					<TableBody>
							{rows.map((row, index) => {
								return (
									<TableRow key={index}>
										{row.map((cell, index) => <TableCell key={index}>{cell}</TableCell>)}
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</Stack>
		</Panel>
  );
}; 

const TemplatesDualComponentsTypographyDropListSpaceBetween = ({
	width = 300,
	height = 30,
	title = 'Title',
	dropListwidth = 150,
	items = [ 
		['Korean', 	 1],
		['American', 2],
		['Asia', 		 3],
		['Midas', 	 4],
	],
	defaultValue = 1,
	value = undefined,
	onChange = undefined,
	show = false,
}) => {
	const [valueLocal, setValueLocal] = React.useState(defaultValue);
	let onChangeLocal = (e: any) => {
		setValueLocal(e.target.value);
	}

	const itemsMap = new Map<string, number>(items as [string, number][]);
	return (
		<GuideBox show={show} width={width} height={height} itemDirection='row' itemHorizontalAlign='space-between'>
			<Typography flexItem textAlign='center' height={height}>{title}</Typography>
			<DropList 
				itemList={itemsMap} 
				width={dropListwidth} 
				defaultValue={defaultValue}
				value={value || valueLocal}
				onChange={onChange || onChangeLocal}
			/>
		</GuideBox>
	)
};

const TemplatesDualComponentsTypographyTextFieldSpaceBetween = ({
	width = 300,
	height = 30,
	title = 'Title',
	textFieldWidth = 150,
	placeholder = 'placeholder ...',
	defaultValue = '',
	error = false,
	disabled = false,
	value = undefined,
	onChange = undefined,
	show = false,
}) => {
	const [valueLocal, setValueLocal] = React.useState(defaultValue);
	let onChangeLocal = (e: any) => {
		setValueLocal(e.target.value);
	}

	return (
		<GuideBox show={show} width={width} height={height} itemDirection='row' itemHorizontalAlign='space-between'>
			<Typography flexItem textAlign='center' height={height}>{title}</Typography>
			<TextField
				width={textFieldWidth}
				height={30}
				placeholder={placeholder}
				error={error}
				disabled={disabled}
				defaultValue={defaultValue}
				value={value || valueLocal}
				onChange={onChange || onChangeLocal}
			/>
		</GuideBox>
	)
};

const ComponentsGuideBoxLayout2Sample = () => {
	const visible = false;

	return (
		<GuideBox tag="Group Pile Creator" show={visible} padding={1} itemSpacing={1} fill='1'>
			<GuideBox tag="Content" show={visible} itemDirection='row' padding={1} itemSpacing={1} fill='2'>
				{/* Content Left */}
				<GuideBox tag="Content Left" show={visible} padding={1} itemSpacing={1.5} fill='3'>
					<GuideBox tag="Title" show={visible} width={300} height={30} center>
						<Typography variant="h1">Title</Typography>
					</GuideBox>
					<GuideBox tag="DropList & TextField" show={visible}>
						<TemplatesDualComponentsTypographyDropListSpaceBetween />
						<TemplatesDualComponentsTypographyDropListSpaceBetween />
						<TemplatesDualComponentsTypographyDropListSpaceBetween />
						<TemplatesDualComponentsTypographyDropListSpaceBetween />
						<TemplatesDualComponentsTypographyDropListSpaceBetween />
						<TemplatesDualComponentsTypographyDropListSpaceBetween />
						<TemplatesDualComponentsTypographyTextFieldSpaceBetween />
						<TemplatesDualComponentsTypographyTextFieldSpaceBetween />
					</GuideBox>
				</GuideBox>

				{/* Content Right */}
				<GuideBox tag="Content Right" show={visible} fill='3' itemSpacing={1} padding={1}>
					<Panel variant="shadow">
						<GuideBox tag="Title" show={visible} fill='4' width={300} itemCenter>
							<ComponentsTableWithTitle title="Title" />
						</GuideBox>
					</Panel>
					<GuideBox tag="DropList & TextField" show={visible} fill='4' width={320} horSpaceBetween>
						<TemplatesDualComponentsTypographyDropListSpaceBetween 	width={320} />
						<TemplatesDualComponentsTypographyTextFieldSpaceBetween width={320} />
						<TemplatesDualComponentsTypographyTextFieldSpaceBetween width={320} />
						<TemplatesDualComponentsTypographyTextFieldSpaceBetween width={320} />
					</GuideBox>
				</GuideBox>
			</GuideBox>

			{/* Footer */}
			<GuideBox tag="Footer" show={visible} itemDirection='row' padding={1} itemSpacing={0} fill='2'>
				<GuideBox tag="Footer Left" show={visible} fill='3' width={304} height={30} padding={1}>
					<GuideBox tag="Refresh" show={visible} fill='4' width={100} height={30} itemVerticalAlign='center'>
						<Button>Refresh</Button>
					</GuideBox>
				</GuideBox>
				<GuideBox tag="Footer Right" show={visible} fill='4' width={324} height={30} padding={1} itemDirection='row' itemHorizontalAlign='space-between' itemVerticalAlign='center'>
					<Check name='Text' namePlacement='start'/>
					<Button color='negative'>Create</Button>
				</GuideBox>
			</GuideBox>
		</GuideBox>
	);
};

export default ComponentsGuideBoxLayout2Sample;