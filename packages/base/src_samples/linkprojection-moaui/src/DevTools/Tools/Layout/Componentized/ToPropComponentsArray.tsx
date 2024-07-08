import { useCallback, useEffect, useRef, useState } from 'react';
import JSONEditor, { type JSONEditorOptions } from 'jsoneditor';
import { debounce } from 'lodash';
import { 
	Typography,
	GuideBox
} from '@midasit-dev/moaui';
import { PropComponentProps, usePropComponent } from './ToPropComponents';

import 'jsoneditor/dist/jsoneditor.min.css';

const JsonEditor = (props: {
	name: string;
	arr: any[];
	updateGlobalValue: (prev: any) => any;
}) => {
	const { name, arr, updateGlobalValue } = props;

	const editorContainerRef = useRef<HTMLDivElement | null>(null);
	const [, setEditor] = useState<JSONEditor | null>(null);

	const updateGlobalValueHandler = useCallback((json: any) => {
		updateGlobalValue((prev: any) => {
			return {
				...prev,
				props: {
					...prev.props,
					[name]: json,
				},
		}});
	}, [name, updateGlobalValue]);

	//초기화
	useEffect(() => {
	  // create the editor
	  const container = editorContainerRef.current;
	  if (!container) return;

	  const options: JSONEditorOptions = {
			mode: 'tree',
			modes: ['tree'], // set all allowed modes
			onChangeText: debounce((jsonString: any) => {
				//내부 값이 변경되면 Global Add or Modify 데이터를 업데이트 한다.
				updateGlobalValueHandler(JSON.parse(jsonString));
	    }, 500),
			onSelectionChange(start, end) {
				// tree모드에서 변경 될 때,
			},
			onEvent(node, event) {
				// tree모드에서 변경 될 때,
			},
		};
	  const newEditor = new JSONEditor(container, options);
	  setEditor(newEditor);

	  // set initial JSON
		const initialJson = arr;
	  newEditor.set(initialJson);

	  // cleanup when the component is unmounted
	  return () => {
	    newEditor.destroy();
	  };
		// eslint-disable-next-line
	}, []);

	return (
	  <GuideBox>
	    <div ref={editorContainerRef} style={{ width: '100%', height: '300px' }} />
	  </GuideBox>
	);
};

const ToPropComponentArray = (props: PropComponentProps<any[]>): JSX.Element => {
	//1차원 배열은 Column1, 2차원 배열은 Column2로 구분
	//그 이상 차원의 배열은... 음.. 고민을 해봅시다.
	const { type, name, value, hookType } = props;
	const { localValue, updateGlobalValue } = usePropComponent(type, name, value, hookType);

	return (
		<GuideBox width="100%" horSpaceBetween verCenter spacing={1}>
			<Typography variant='body1'>{name}</Typography>
			<JsonEditor name={name} arr={localValue} updateGlobalValue={updateGlobalValue} />
		</GuideBox>
	);
};

export default ToPropComponentArray;