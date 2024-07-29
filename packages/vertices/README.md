<!-- markdownlint-disable-next-line -->
<h1 align="center">moaui-vertices</h1>

<p align="center">
  The Vertice Library extracts vertices based on size information. The coordinate system used starts from the origin.
</p>

<p align="center">
	The final return value, `Vertices`, is a two-dimensional array. The core concept is an array of arrays of polygon coordinate arrays. 
</p>

## Concept

Consider the following example:

```typescript
Vertices = [
    [
        { x: -1, y: 1 },
        { x: 1, y: 1 },
        { x: 1, y: -1 },
        { x: -1, y: -1 }
    ],
    [
        { x: -0.5, y: 0.5 },
        { x: -0.5, y: -0.5 },
        { x: 0.5, y: -0.5 },
        { x: 0.5, y: 0.5 }
    ]
]
```

- `Vertices[0]` contains the coordinates of a polygon defined in a counter-clockwise direction, representing a solid shape.  
- `Vertices[1]` contains the coordinates of a polygon defined in a clockwise direction, representing a hollow shape.

## Types

- For the type definitions used in the toVertices function, please refer to [types/props.ts](./types/props.ts).

# Usage

When using this coordinate information, remember the following:

- The coordinate system is based on the browser window, with the top-left corner as the origin.
- Each vertex's starting point is the bottom-left corner of the shape.
- Vertices is a two-dimensional array where each sub-array represents a polygon.

## Installation

To install the Vertice Library, you can use npm:

```typescript
$ (npm | pnpm | yarn) (i | add) @midasit-dev/moaui-vertices
```

# Example Use Case

Here is an example use case demonstrating how to utilize the Vertice Library:

```typescript
//test.ts

import { toVertices, Vertex2D, ConvertProps } from "@midasit-dev/moaui-vertices";

/**
 * .e.g 2D Array.
 * [
 * 	[
 * 		{ x: -50, y:  50 },
 * 		{ x:  50, y:  50 },
 * 		{ x:  50, y: -50 },
 * 		{ x: -50, y: 50 },
 * 	]
 * ]
 */
const verticesSolidRectangle: Vertex2D[][] | Error = toVertices({
	type: 'SolidRectangle',
	properties: {
		b: 100,
		h: 100
	}
} as ConvertProps);

if (verticesSolidRectangle instanceof Error) {
	// error handling
}
```

# Contributing

We welcome contributions to improve this library. Please feel free to submit a pull request or open an issue.

# License

This project is licensed under the MIT License.

By following this template,  
you'll have a well-structured README.md that provides clear instructions and explanations about the Vertice Library.
