import ReactSpreadsheet from "react-spreadsheet";

export type StyledProps = {
	/**
	 * The ColumnLabels of the SpreadSheet.
	 */
	columnLabels?: string[],
} & any;

const StyledComponent = (props: StyledProps) => {
	const {
		columnLabels,
		...otherProps
	} = props;

  return (
		<ReactSpreadsheet 
			columnLabels={columnLabels}
			{...otherProps}
		/>
	)
}

export default StyledComponent;