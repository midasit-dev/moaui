import { ResponsiveLine } from "@nivo/line";
import { ResponsiveScatterPlot } from "@nivo/scatterplot";

export { ChartLine, ChartScatter };

const customTooltip = ({ point }) => {
  return (
    <div
      style={{
        background: "white",
        padding: "9px 12px",
        border: "1px solid #ccc",
        color: "#000",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: 16,
          height: 16,
          backgroundColor: point.serieColor,
					marginRight: 12,
        }}
      />
      <strong>
        x: {point.data.xFormatted}, y: {point.data.yFormatted}
      </strong>
    </div>
  );
};

function ChartLine(data, chartScale) {
  return(
    <ResponsiveLine
			tooltip={customTooltip}
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
			tooltip={customTooltip}
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