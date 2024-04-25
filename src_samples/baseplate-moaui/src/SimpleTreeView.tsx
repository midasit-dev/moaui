import { SimpleTreeView } from '@mui/x-tree-view';
import { TreeItem } from '@mui/x-tree-view';
import { BP_Node } from './variables';
import { useRecoilState } from 'recoil';
import { useState } from 'react';

const TreeView = () => {
  const [bp_Node, setBP_Node] = useRecoilState(BP_Node);
  const [selectedLabel, setSelectedLabel] = useState(''); // 선택된 노드의 label을 저장하기 위한 상태
  
  // 노드의 label을 저장하는 객체
  const labelMap:any = {};

  const renderTreeItems = (data: any, nodeIdPrefix = '') =>
    Object.entries(data).map(([key, value], index) => {
      const nodeId = `${nodeIdPrefix}${key}-${index}`;
      labelMap[nodeId] = key; // nodeId와 label 매핑

      if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
        return (
          <TreeItem key={nodeId} itemId={nodeId} label={key}>
            {renderTreeItems(value, `${nodeId}-`)}
          </TreeItem>
        );
      } else {
        return <TreeItem key={nodeId} itemId={nodeId} label={`${key}: ${value}`} />;
      }
    });

  const handleNodeSelect = (event:any, itemId:any) => {
    // labelMap에서 선택된 nodeId에 해당하는 label 값을 찾아 상태를 업데이트함
    setSelectedLabel(labelMap[itemId]);
    console.log("Selected label:", selectedLabel);
  };

  return (
    <SimpleTreeView defaultExpandedItems={['root']}>
      {renderTreeItems(bp_Node)}
    </SimpleTreeView>
  );
};

export default TreeView;