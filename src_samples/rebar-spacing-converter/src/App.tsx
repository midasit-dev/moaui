import React from 'react';
import { GuideBox, Panel, Typography, Color, DropList } from "@midasit-dev/moaui";
import { useRecoilValue } from 'recoil';
import { VarValids, VarRebarCode } from './Components/variables'; // useRecoilValue import 추가
import CompRebarCode from './Components/DesignCode';
import RebarConverter from './Components/RebarData';
import TableList from './Components/Table';
import CompOutputType from './Components/SelectMethod';

const App = () => {
  const valids = useRecoilValue(VarValids);
  const design_code = useRecoilValue(VarRebarCode);


  return (
    <GuideBox width="100%" center padding={2}>
      <Panel variant="shadow2" padding={2}>
        <CompRebarCode />
        <GuideBox height={10} />
        <GuideBox width="100%" row verSpaceBetween>
          <Panel variant="shadow2" padding={2} width="100%">
            <GuideBox show fill='1' width="100%" center padding={1} borderRadius={1}>
              <Typography verCenter variant="h1" height={30} color={Color.secondary.main}>Convert Rebar Spacing to Another Rebar</Typography>
            </GuideBox>
            <GuideBox height={10} />
            <CompOutputType />
            <RebarConverter />
          </Panel>
        </GuideBox>
        <GuideBox height={10} />
        <Panel variant="shadow2" padding={3} width="100%">
          <GuideBox show fill='1' width="100%" center padding={1} borderRadius={1}>
            <Typography verCenter variant="h1" height={30} color={Color.secondary.main}>Converted Rebar Data List</Typography>
          </GuideBox>
          <GuideBox width="100%" verSpaceBetween>
          <TableList />
          </GuideBox>
        </Panel>
      </Panel>
    </GuideBox>
  );
}

export default App;