# Section Library

welcome section library.

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
- **Dimensions and Measurements**: By specifying the dimensions and measurements, you can draw the desired section components.

## Basic Interfaces

For Information about **Canvas**, **Shape** and **DimensionLine**, refer to [2D/types/base.ts](./2D/types/base.ts).

## Properties By Section

The currently available sections are listed below.
- Solid Rectange
- H Section

To find information about Properties, [2D/types/props.ts](./2D/types/props.ts).

## Examples

- [**Solid Rectangle**](./2D/SolidRectangle/sample.tsx)
- [**H Section**](./2D/HSection/sample.tsx)

