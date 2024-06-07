import { SimpleTreeView } from '@mui/x-tree-view';
import { TreeItem } from '@mui/x-tree-view';
import { BP_Node, BPName, BasePlateHeight, BasePlateWidth, AnchorXPitch, AnchorYPitch, PlateThickness, PlanViewSelectedNode } from './variables';
import { useRecoilState } from 'recoil';
import { useState } from 'react';
import { set } from 'lodash';

const TreeView = () => {
  const [bp_Node, setBP_Node] = useRecoilState(BP_Node);
  const [selectedLabel, setSelectedLabel] = useState(''); // 선택된 노드의 label을 저장하기 위한 상태
  const [parentNode, setParentNode] = useState('');
  
  const [bPName, setBPName] = useRecoilState(BPName);
  const [basePlateWidth, setBasePlateWidth] = useRecoilState(BasePlateWidth);
  const [basePlateHeight, setBasePlateHeight] = useRecoilState(BasePlateHeight);
  const [anchorXPitch, setAnchorXPitch] = useRecoilState(AnchorXPitch);
  const [anchorYPitch, setAnchorYPitch] = useRecoilState(AnchorYPitch);
  const [plateThickness, setPlateThickness] = useRecoilState(PlateThickness);
  const [planViewSelectedNode, setPlanViewSelectedNode] = useRecoilState(PlanViewSelectedNode);

  function handleItemClick(path:any, value:any) {
    console.log('currentPath:', path);
    console.log('itemvalue:', value);

    const selectedBPName = path[0];
    setBPName(selectedBPName);
    
    let OriginBP_Node:any = bp_Node;
    const selectBP_Thickness = OriginBP_Node[selectedBPName]['BP_Thickness'];
    const selectBP_Width = OriginBP_Node[selectedBPName]['BP_Width'];
    const selectBP_Height = OriginBP_Node[selectedBPName]['BP_Height'];
    const selectBP_XPitch = OriginBP_Node[selectedBPName]['Anchor_XPitch'];
    const selectBP_YPitch = OriginBP_Node[selectedBPName]['Anchor_YPitch'];
    const selectNode = OriginBP_Node[selectedBPName]['NODE'];
    setPlateThickness(selectBP_Thickness);
    setBasePlateWidth(selectBP_Width);
    setBasePlateHeight(selectBP_Height);
    setAnchorXPitch(selectBP_XPitch);
    setAnchorYPitch(selectBP_YPitch);
    setPlanViewSelectedNode(selectNode);
  }

  function renderJsonTree(data:any, path = []) {
    return Object.entries(data).map(([key, value]:any) => {
      const currentPath = path.concat(key);
      const itemId = currentPath.join("-");

      if(typeof value === 'object' && value !== null && !Array.isArray(value)) {
        // 객체 처리
        return (
          <TreeItem key={itemId} itemId={itemId} label={key}>
            {renderJsonTree(value, currentPath)}
          </TreeItem>
        );
      } else {
        // 기본 타입 처리
        return (
          <TreeItem
            key={itemId}
            itemId={itemId}
            label={`${key}: ${value.toString()}`}
            onClick={() => handleItemClick(currentPath, value)}
          />
        );
      }
    });
  }

  return (
    <SimpleTreeView
      aria-label="bp-node-tree"
      multiSelect
    >
      {renderJsonTree(bp_Node)}
    </SimpleTreeView>
  );
};

export default TreeView;