import { 
	Panel,
	FloatingBox,
	type FloatingBoxProps,
} from "@midasit-dev/moaui-components-v1";/**${comma}*/

const floatingBoxProperties: FloatingBoxProps = {
	className: "virtual-layer",
	x: 32,
	y: 32,
	width: 150,
	height: 150,
	show: true,
	fill: '1',
}/**${comma}*/

const ComponentsFloatingBoxClassName = () => {
	return (
		<Panel
			variant="shadow2"
			width={300}
			height={300}
			relative
		>
			<FloatingBox {...floatingBoxProperties}/>
			{/* Your component content */}
      <style>{`
        .virtual-layer {
          overflow: hidden;
          animation: pulsate 6s linear infinite;
        }

        @keyframes pulsate {
          50% {
            box-shadow:
              inset 0 0 50px #fff,
              inset -50px 0 80px #f0f,
              inset 50px 0 80px #0ff,
              inset -50px 0 300px #f0f,
              inset 50px 0 300px #0ff;
          }
        }
      `}</style>
		</Panel>
	);		
}/**${comma}*/

export default ComponentsFloatingBoxClassName;