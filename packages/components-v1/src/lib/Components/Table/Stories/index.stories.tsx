import type { Meta, StoryObj } from '@storybook/react';
import { Table, TableHead, TableBody, TableRow, TableCell, Typography } from "../../../index";
import Explore from "./Explore.mdx";

import LiveEditStory from '../../../Common/Storybook/LiveEditStory';
import { cleanMask } from "../../../Common/Storybook/CodeExtractor";
import { BundleCode, HeaderCode, BodyCode, CellCode, RowCode, WithTitleCode } from '../Code';

const meta = {
  title: 'Components/Table',
  component: Table,
	tags: ['autodocs'],
  parameters: { 
		docs: { page: Explore },
		layout: 'centered',
	},
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Bundle = LiveEditStory(cleanMask(BundleCode));
export const Header = LiveEditStory(cleanMask(HeaderCode));
export const Body = LiveEditStory(cleanMask(BodyCode));
export const Cell = LiveEditStory(cleanMask(CellCode));
export const Row = LiveEditStory(cleanMask(RowCode));
export const WithTitle = LiveEditStory(cleanMask(WithTitleCode));

export const Sample: Story = {
	args: {
		padding: 'normal'
	},
	render: ({padding}) => {
		return (
			<Table padding={padding}>
				<TableHead>
					<TableRow>
						<TableCell>
							<Typography>head 1</Typography>
						</TableCell>
						<TableCell>
							<Typography>head 2</Typography>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow>
						<TableCell>
							<Typography>body 1</Typography>
						</TableCell>
						<TableCell>
							<Typography>body 2</Typography>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		)
	}
};
