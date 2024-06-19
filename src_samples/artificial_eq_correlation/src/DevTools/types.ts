/**
 * {
 * 		type: {
 * 			type: 'string',
 * 			description: 'UI 요소의 종류 (예: "Button", "Input", "Form", 등)'
 * 		},
 * 		props: {
 * 			type: 'object',
 * 			description: 'UI 요소에 전달되는 속성들',
 * 			properties: {
 * 				// 여기에 해당 UI 요소의 속성을 정의합니다.
 * 			}
 * 		},
 * 		children: {
 * 			type: 'array',
 * 			description: '하위 UI 요소들',
 * 			items: {
 * 				type: 'object',
 * 				$ref: '#'
 * 			}
 * 		}
 * }
 * 
 * @typedef {Object} Layer
 * @property {string} type - UI 요소의 종류 (예: 'Button', 'Input', 'Form', 등)
 * @property {Object} props - UI 요소에 전달되는 속성들
 * @property {Array<Layers>} children - 하위 UI 요소들
 */
interface Layer {
	id: string;
	type: 
		string
		| 'FloatingBox' 
		| 'Button' 
		| 'TextField' 
		| 'TextFieldV2' 
		| 'Panel' 
		| 'DropList';
	props: Record<string, any>;
	children?: Array<Layer>;
}

interface Layers extends Array<Layer> {};

interface Canvas {
	width: number;
	height: number;
}

interface ExportLayers {
	canvas: Canvas,
	layers: Layers,
}

interface LayoutSchema {
	id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  parent?: string | null;
}

interface LayoutSchemas extends Array<LayoutSchema> {}

type ControllerInputs = {
  x: number;
  y: number;
  width: number;
  height: number;
  spacing: number;
}

interface Box {
	id: string;
	element: JSX.Element;
}

export type {
	LayoutSchema,
	LayoutSchemas,
	ControllerInputs,

	Layer,
	Layers,
	Canvas,
	ExportLayers,
	Box,
}