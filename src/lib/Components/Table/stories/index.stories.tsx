import type { Meta, StoryObj } from '@storybook/react';
import Table from ".";
import { TableHead, TableBody, TableRow, TableCell, Typography } from "../..";
import Docs from "./Docs.mdx";

const meta = {
  title: 'Components/Table',
  component: Table,
	tags: ['autodocs'],
  parameters: { 
		docs: { page: Docs },
		layout: 'centered',
	},
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
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

export const Head: Story = {
	args: { padding: 'normal' },
	render: ({padding}) => {
		return (
			<Table padding={padding}>
				<TableHead>
					<TableRow>
						<TableCell>
							TableHead
						</TableCell>
					</TableRow>
				</TableHead>
			</Table>
		)
	}
}

export const Body: Story = {
	args: { padding: 'checkbox' },
	render: ({padding}) => {
		return (
			<Table padding={padding}>
				<TableBody>
					<TableRow>
						<TableCell>Body</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		)
	}
}

export const Cell: Story = {
	args: { padding: 'normal' },
	render: ({padding}) => {
		return (
			<Table padding={padding}>
				<TableBody>
					<TableRow>
						<TableCell>Cell</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		)
	}
}

export const Row: Story = {
	args: { padding: 'normal' },
	render: ({padding}) => {
		return (
			<Table padding={padding}>
				<TableHead>
					<TableRow>
						<Typography>Header Row</Typography>
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow>
						<Typography>Body Row</Typography>
					</TableRow>
				</TableBody>
			</Table>
		)
	}
}