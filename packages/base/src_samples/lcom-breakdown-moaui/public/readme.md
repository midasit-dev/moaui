![](https://hubs.ly/Q02hxwP10)

# Alignment Generator
- Generate complex alignment including arc or clothoid/cubic parabola using Alignment Creator Plug-in.
## Details
### version 1.0.0
- Export as the same alignment, including nodes and elements
- Just add **Line Type**, **Length**, and **Radius** and set the **Segment** up for length of elements
- Alignment is able to draw in X-Y plane only
- The start point of Alignment is the global origin(0,0,0), and its direction is along the positive x-axis
- Total alignment length should be the same or larger than the total length of segments.
- The valid input value of alignment is as below.

    |Line|Length|Radius Start/End|
    |:------:|:------:|:------:|
    |Straight|L > 0|-|
    |Arc|L > 0|Rs ≠ 0|
    |Clothoid|L > 0|Rs ≠ 0 and Re ≠ 0, has same sign convention|
    |Cubic Parabola|L > 0|(Rs ≠ 0 and Re = 0) or (Rs = 0 and Re ≠ 0)|

- The valid input values of Segments are as below Segments.
	|Segment|Valid Input|
	|:------:|:------:|
	|Length|Real value > 0|
	|Nb|Integer > 0|
	|Structure Group Name|String less 90 char.|
	|Material ID|Integer, 1~999,999|
	|Section ID|Integer, 1~999,999|
	