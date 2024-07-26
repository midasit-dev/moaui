# Section Library

welcome section library. [Demo Code](../../../test/section/README.md)

## Getting Started

```cli
$ (npm | pnpm | yarn) (i | add) @midasit-dev/moaui-lab
```

## Development Status

Currently, the section development is based on 2D. Future updates will include sections provided according to Civil NX standards.

## Concept

The foundational library used is **p5.js**. Each section component includes common properties that conform to the **Canvas interface** and **Shape interface**. You can find detailed information about these interfaces in [2D/types/base.ts](./2D/types/base.ts).

- **Canvas**: Specifies the drawing area options.
- **Shape**: Contains data related to the starting point and style of the actual drawing.
- **Reference Line**: By specifying the dimension lines and leader lines, you can draw the desired section components.

## Basic Interfaces

For Information about **Canvas**, **Shape** and **ReferLine**, refer to [2D/types/base.ts](./2D/types/base.ts).

## Properties By Section

The currently available sections are listed below.
- Solid Rectange
- H Section

To find information about Properties, [2D/types/props.ts](./2D/types/props.ts).

## Examples

about Solid Rectangle!

```typescript
import { SolidRectangle } from '@midasit-dev/moaui-lab/Section/2D';

export default function Component() {
	return (
    <SolidRectangle
      canvas={{
        background: "#e7e8e9",
        dimension: [300, 300],
      }}
      shape={{
        fill: "white",
        stroke: "black",
        strokeWeight: 1,
      }}
      referLine={{
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
```
