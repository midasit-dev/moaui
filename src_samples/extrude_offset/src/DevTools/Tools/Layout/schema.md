# Layout JSON Concept

## 구조
- canvas
	- layers의 기반이 되는 컴포넌트 (Panel)
- layers
	- 리사이징과 위치 이동이 가능한 Layer의 배열
- layer
	- 개별 Component 레벨
	- id, type, props, children으로 구성됨.
		- id: 식별을 위한 고유값
		- type: Component 타입
		- props: Component에 Optional하게 넣을 수 있는 Properties
		- children: Component의 하위 Components (Layer[])
	- id 컨셉
		- {count}-{component type}-{create uuid}-{save uuid}

## Example
```json
{
  "canvas": {
    "width": 384,
    "height": 560
  },
  "layers": [
    {
      "id": "1-FloatingBox-e4ee1b49-4e5a31f4",
      "type": "FloatingBox",
      "props": {
        "x": 16,
        "y": 16,
        "width": 352,
        "height": 528,
        "guideBoxProps": {
          "width": "inherit",
          "height": "inherit"
        }
      },
      "children": [
        {
          "id": "1-Panel-0415d128-4e5a31f4",
          "type": "Panel",
          "props": {
            "variant": "shadow2",
            "width": "inherit",
            "height": "inherit",
            "flexItem": false,
            "backgroundColor": "#fff",
            "borderRadius": "5px",
            "border": "none",
            "relative": false
          },
          "children": []
        }
      ],
      "parent": null
    },
	...
  ]
  ...
}
```