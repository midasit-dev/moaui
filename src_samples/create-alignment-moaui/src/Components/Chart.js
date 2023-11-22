import { ResponsiveLine } from "@nivo/line";
import { ResponsiveScatterPlot } from "@nivo/scatterplot";

export {ChartLine, ChartScatter}

function ChartLine(data, chartScale) {
  return(
    <ResponsiveLine
      data={data}
      theme={{ fontSize: "11px", axis: { legend: { text: { fontSize: "11px", fontWeight:"bold" } } } }}
      margin={{ top: 30, right: 30, bottom: 60, left: 60 }}
      xScale={{
        type: 'linear',
        max: chartScale[0],
        min: chartScale[1],
      }}
      xFormat=">-.2f"
      yScale={{
        type: 'linear',
        max: chartScale[2],
        min: chartScale[3],
        stacked: false,
        reverse: false
      }}
      yFormat=">-.2f"
      curve="linear"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -30,
        legend: 'X',
        legendPosition: 'middle',
        legendOffset: 40
      }}
      axisLeft={{
        orient: 'right',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -30,
        legend: 'Y',
        legendPosition: 'middle',
        legendOffset: -40
      }}
      colors={{ scheme: "set1" }}
      enablePoints={false}
      useMesh={true}
      legends={[]}
    />
  )
}

function ChartScatter(data, chartScale) {
  return(
    <ResponsiveScatterPlot
      data={data}
      theme={{ fontSize: "11px", axis: { legend: { text: { fontSize: "11px", fontWeight:"bold" } } } }}
      margin={{ top: 30, right: 30, bottom: 60, left: 60 }}
      xScale={{
        type: 'linear',
        max: chartScale[0],
        min: chartScale[1],
      }}
      xFormat=">-.2f"
      yScale={{
        type: 'linear',
        max: chartScale[2],
        min: chartScale[3],
      }}
      yFormat=">-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -30,
        legend: 'X',
        legendPosition: 'middle',
        legendOffset: 40
      }}
      axisLeft={{
        orient: 'right',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -30,
        legend: 'Y',
        legendPosition: 'middle',
        legendOffset: -40
      }}
      colors={{ scheme: "set1" }}
      nodeSize={4}
      legends={[]}
    />
  )
}