import React from "react";
import { GuideBox, Typography, DropList, Color } from "@midasit-dev/moaui";
import { useRecoilState, useRecoilValue } from "recoil";
import { VarRebarCode, VarGetCodeList } from "./variables";
 
const CompRebarCode = () => {
  //나중에 추가되면 Recoil에 변수 추가할 것
  const [rebarCode, setRebarCode] = useRecoilState(VarRebarCode);
  const rebar_code_list = useRecoilValue(VarGetCodeList);
 
  return (
    <GuideBox width="100%" row horSpaceBetween>
      <GuideBox width="inherit" row horSpaceBetween verCenter height={30}>
        <Typography
          verCenter
          variant="h1"
          height={30}
          color={Color.secondary.main}
        >
          Rebar Code
        </Typography>
        <DropList
          width={200}
          itemList= {rebar_code_list}
          defaultValue={rebarCode}
          value={rebarCode}
          onChange={(e: any) => setRebarCode(e.target.value)}
          listWidth={200}
        />
      </GuideBox>
    </GuideBox>
  );
};

export default CompRebarCode;