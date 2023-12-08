import React from 'react'; /**${comma}*/
import { Panel, Stack, Typography, DropList } from "@midasit-dev/moaui"; /**${comma}*/

const ComponentsPanelTypographyDropList = ({ 
	typographyValue, 
	dropListItems, 
	dropListValue, 
	dropListOnChange 
}: any) => (
  <Panel width={300} padding={8}>
    <Stack 
      direction="row" 
      spacing={2} 
      justifyContent="space-between" 
      alignItems="center"
    >
      <Typography>{typographyValue}</Typography>
      <DropList 
        itemList={dropListItems} 
        width="150px" 
        defaultValue="Korean"
        value={dropListValue}
        onChange={dropListOnChange}
      />
    </Stack>
  </Panel>
) /**${comma}*/

const useComponentsPanelTypographyTextField = () => {
	/**
	 * Custom hook for the panel typography text field
	 */
  const [state, setState] = React.useState({
    selected: 1, // Default to the first item, similar to 'value' in the original component
    items: new Map<string, number>([
      ['Korean', 1],
      ['American', 2],
      ['Asia', 3],
      ['Midas', 4]
    ])
  });

  return {
    values: state, // 'values' now holds the entire state
    setSelection: (selectedItem: number) => setState({ ...state, selected: selectedItem })
  };
}; /**${comma}*/

const SampleComponentsPanelTypographyTextField = () => {
	/**
	 * Sample
	 */
  const { 
    values: ComponentsPanelTypographyTextFieldValues, 
    setSelection: ComponentsPanelTypographyTextFieldSetSelection 
  } = useComponentsPanelTypographyTextField();

  return (
    <ComponentsPanelTypographyDropList 
      typographyValue="Title Text"
      dropListItems={ComponentsPanelTypographyTextFieldValues.items} // Use .items to access the Map
      dropListValue={ComponentsPanelTypographyTextFieldValues.selected} // Use .selected to access the selected value
      dropListOnChange={(e: any) => ComponentsPanelTypographyTextFieldSetSelection(Number(e.target.value))} // Convert the string value to a number
    />
  );
}; /**${comma}*/

export default SampleComponentsPanelTypographyTextField;