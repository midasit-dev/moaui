# Section Library

## Getting Started

```cli
$ (npm | pnpm | yarn) (i | add) @midasit-dev/moaui-lab
```

## Development Status

Currently, the section development is based on 2D. Future updates will include sections provided according to Civil NX standards.

## Concept

The foundational library used is **p5.js**. Each section component includes common properties that conform to the **Canvas interface** and **Shape interface**. You can find detailed information about these interfaces in [2D/types](./2D/types.ts).

- **Canvas**: Specifies the drawing area options.
- **Shape**: Contains data related to the starting point and style of the actual drawing.
- **Dimensions and Measurements**: By specifying the dimensions and measurements, you can draw the desired section components.

## Basic Interfaces

**Canvas**

```typescript
/**
 * Canvas is a type that is used to define the properties of a shape.
 * @var padding is the padding of the canvas. (default: 0, 1 -> 8px)
 * @var background is the background color of the canvas.
 * @var dimension is the dimension of the canvas.
 */
export interface Canvas {
    background?: string | null;
    dimension?: CanvasDimension2D;
}
```

**Shape**

```typescript
/**
 * Shape is a type that is used to define the properties of a shape.
 * @var startCoords is the starting coordinates of the shape.
 * @var fill is the fill color of the shape. (background color)
 * @var stroke is the stroke color of the shape.
 * @var strokeWeight is the stroke weight of the shape.
 */
export interface Shape {
    startCoords?: StartCoordinate2D;
    fill?: string;
    stroke?: string;
    strokeWeight?: number;
}
```

**DimensionLine**

```typescript
/**
 * DimensionLine is a type that is used to define the properties of a shape.
 * @var offset is the offset of the dimension line.
 * @var lineExtension is the line extension of the dimension line.
 * @var lineExtensionAngle is the line extension angle of the dimension line.
 * @var lineColor is the line color of the dimension line.
 * @var lineWeight is the line weight of the dimension line.
 * @var text is the text of the dimension line.
 * @var textColor is the text color of the dimension line.
 * @var textSize is the text size of the dimension line.
 * @var textOffset is the text offset of the dimension line.
 */
export interface DimensionLine {
    offset?: number;
    lineExtension?: number;
    lineExtensionAngle?: number;
    lineColor?: string;
    lineWeight?: number;
    text?: string | null;
    textColor?: string;
    textSize?: number;
    textOffset?: number;
}
```

## Available Sections
- Solid Rectange
- H Section

## Examples

**Solid Rectangle**
```tsx
import { SolidRectangle } from '@midasit-dev/moaui-lab/Section/2D';

const Sample = () => {
	return (
    <SolidRectangle
      canvas={{
        background: "#e7e8e9",
        dimension: [300, 300],
      }}
      shape={{
        startCoords: [100, 100],
        fill: "white",
        stroke: "black",
        strokeWeight: 1,
      }}
      dimensionLine={{
        b: {
          offset: 20,
          lineExtension: 5,
          lineExtensionAngle: 5,
          lineColor: "blue",
          lineWeight: 1,
          text: null,
          textColor: "red",
          textSize: 14,
          textOffset: 15,
        },
        h: {
          offset: 20,
          lineExtension: 5,
          lineExtensionAngle: 5,
          lineColor: "black",
          lineWeight: 1,
          text: null,
          textColor: "black",
          textSize: 14,
          textOffset: 15,
        },
      }}
      b={100}
      h={100}
    />
  );
};

export default Sample;
```

**H Section**
```tsx
import { HSection } from '@midasit-dev/moaui-lab/Section/2D';

const Sample = () => {
	return (
    <HSection
      canvas={{
        background: "#e7e8e9",
        dimension: [400, 400],
      }}
      shape={{
        startCoords: [100, 100],
        fill: "white",
        stroke: "black",
        strokeWeight: 1,
      }}
			dimensionLine={{
				h: {},
				tw: {},
				b1: {},
				tf1: {},
				b2: {},
				tf2: {},
				r1: {},
				r2: {},
			}}
      h={200}
			tw={30}
			b1={200}
			tf1={50}
			b2={200}
			tf2={20}
			r1={20}
			r2={20}
    />
  );
};

export default Sample;
```