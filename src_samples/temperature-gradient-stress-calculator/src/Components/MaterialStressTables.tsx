/**
 *		                                                                         __      
 *		                                                                        /\ \__   
 *		  ___     ___     ___ ___     _____     ___     ___       __     ___    \ \ ,_\  
 *		 /'___\  / __`\ /' __` __`\  /\ '__`\  / __`\ /' _ `\   /'__`\ /' _ `\   \ \ \/  
 *		/\ \__/ /\ \L\ \/\ \/\ \/\ \ \ \ \L\ \/\ \L\ \/\ \/\ \ /\  __/ /\ \/\ \   \ \ \_ 
 *		\ \____\\ \____/\ \_\ \_\ \_\ \ \ ,__/\ \____/\ \_\ \_\\ \____\\ \_\ \_\   \ \__\
 *		 \/____/ \/___/  \/_/\/_/\/_/  \ \ \/  \/___/  \/_/\/_/ \/____/ \/_/\/_/    \/__/
 *		                                \ \_\                                            
 *		                                 \/_/                                            
 */

import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { VarCalculationParseResult } from './variables';
import { VarMaterialStressTableDataOfTab1 , VarMaterialStressTableDataOfTab2 } from './variables';
import { Typography, Table, TableHead, TableRow, TableCell, TableBody, Panel, Tab, TabGroup } from '@midasit-dev/moaui';

const TypoBody1 = ({ text }: any) => <Typography variant="body1" textAlign='center'>{text}</Typography>;

const CompTableMaterialStress = () => {
	const calcValue = useRecoilValue(VarCalculationParseResult);
	const [matlStressValueTable1, setMatlStressValueTable1] = useRecoilState(VarMaterialStressTableDataOfTab1);
	const [matlStressValueTable2, setMatlStressValueTable2] = useRecoilState(VarMaterialStressTableDataOfTab2);

	React.useEffect(() => {
		setMatlStressValueTable1([
			{ 
				Component: <TypoBody1 text="Girder" />,
				Property: <TypoBody1 text="E_girder" />,
				Value: <TypoBody1 text={calcValue["g_elastic"].toFixed(0)} />,
			},
			{ 
				Component: <TypoBody1 text="Girder" />,
				Property: <TypoBody1 text="G_thermal" />,
				Value: <TypoBody1 text={calcValue["g_thermal"].toExponential(2)} />,
			},
			{ 
				Component: <TypoBody1 text="Slab" />,
				Property: <TypoBody1 text="S_elastic" />,
				Value: <TypoBody1 text={calcValue["s_elastic"].toFixed(0)} />,
			},
			{ 
				Component: <TypoBody1 text="Slab" />,
				Property: <TypoBody1 text="S_thermal" />,
				Value: <TypoBody1 text={calcValue["s_thermal"].toExponential(2)} />,
			},
		]);

		const ensureToFixed = (value: any, fractionDigits: number) => {
			if (typeof value === 'number') return value.toFixed(fractionDigits);
			return value;
		}

		const stressCount = calcValue["stress_heating"].length;

		if (stressCount === 2) {
			setMatlStressValueTable2([
				{
					Component: <TypoBody1 text="Girder Top" />,
					Heating: <TypoBody1 text={ensureToFixed(calcValue["stress_heating"][0], 3)} />,
					Cooling: <TypoBody1 text={ensureToFixed(calcValue["stress_cooling"][0], 3)} />,
				},
				{
					Component: <TypoBody1 text="Girder Bot" />,
					Heating: <TypoBody1 text={ensureToFixed(calcValue["stress_heating"][1], 3)} />,
					Cooling: <TypoBody1 text={ensureToFixed(calcValue["stress_cooling"][1], 3)} />,
				},
				{
					Component: <TypoBody1 text="Slab Top" />,
					Heating: <TypoBody1 text="-" />,
					Cooling: <TypoBody1 text="-" />,
				},
				{
					Component: <TypoBody1 text="Slab Bot" />,
					Heating: <TypoBody1 text="-" />,
					Cooling: <TypoBody1 text="-" />,
				}
			])
		} else {
			setMatlStressValueTable2([
				{
					Component: <TypoBody1 text="Girder Top" />,
					Heating: <TypoBody1 text={ensureToFixed(calcValue["stress_heating"][0], 3)} />,
					Cooling: <TypoBody1 text={ensureToFixed(calcValue["stress_cooling"][0], 3)} />,
				},
				{
					Component: <TypoBody1 text="Girder Bot" />,
					Heating: <TypoBody1 text={ensureToFixed(calcValue["stress_heating"][1], 3)} />,
					Cooling: <TypoBody1 text={ensureToFixed(calcValue["stress_cooling"][1], 3)} />,
				},
				{
					Component: <TypoBody1 text="Slab Top" />,
					Heating: <TypoBody1 text={ensureToFixed(calcValue["stress_heating"][2], 3)} />,
					Cooling: <TypoBody1 text={ensureToFixed(calcValue["stress_cooling"][2], 3)} />,
				},
				{
					Component: <TypoBody1 text="Slab Bot" />,
					Heating: <TypoBody1 text={ensureToFixed(calcValue["stress_heating"][3], 3)} />,
					Cooling: <TypoBody1 text={ensureToFixed(calcValue["stress_cooling"][3], 3)} />,
				}
			])
		}
	}, [calcValue, setMatlStressValueTable1, setMatlStressValueTable2]);

	return (
		<ComponentsTabGroupWithTable
			tab1Label="Material"
			tab1TableHeadRow={["Component", "Property", "Value"]}
			tab1TableDataRows={matlStressValueTable1}
			tab2Label="Stress Summary"
			tab2TableHeadRow={["Component", "Heating", "Cooling"]}
			tab2TableDataRows={matlStressValueTable2}
		/>
	)
}

export default CompTableMaterialStress;

const ComponentsTabGroupWithTable = (props: any) => {
	const {
		tab1Label,
		tab1TableHeadRow,
		tab1TableDataRows,
		tab2Label,
		tab2TableHeadRow,
		tab2TableDataRows,
	} = props;

	const [tabValue, setTabValue] = React.useState('Tab 1');
	const CompTable = ({ headRow, dataRows }: any) => {
		return (
			<Table>
				<TableHead>
					<TableRow>
						{headRow.map((item: any, index: number) => (
							<TableCell key={index}>{item}</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{dataRows.map((item: any, index: number) => (
						<TableRow key={index}>
							{Object.keys(item).map((key: any, index: number) => (
								<TableCell key={index}>{item[key]}</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		)
	}

	return (
    <Panel width={300}>
      <TabGroup value={tabValue} onChange={(e: any, newValue: string) => setTabValue(newValue)}>
        <Tab value="Tab 1" label={tab1Label} />
        <Tab value="Tab 2" label={tab2Label} />
      </TabGroup>
      {tabValue === "Tab 1" && <CompTable headRow={tab1TableHeadRow} dataRows={tab1TableDataRows} />}
			{tabValue === "Tab 2" && <CompTable headRow={tab2TableHeadRow} dataRows={tab2TableDataRows} />}
    </Panel>
  );
}