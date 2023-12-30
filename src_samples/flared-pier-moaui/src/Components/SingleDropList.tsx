import { DropList } from '@midasit-dev/moaui';

const CompSingleDropList = (props: any) => {
	const {
		list,
		state,
		setState,
		disabled,
	} = props;

	return (
		<DropList 
			width={82}
			itemList={new Map<string, number>(list as [string, number][])}
			defaultValue={state}
			value={state}
			onChange={(e: any) => setState(e.target.value)}
			disabled={disabled}
			listWidth='auto'
		/>
	)
}

export default CompSingleDropList;