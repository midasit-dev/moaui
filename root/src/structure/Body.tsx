interface BodyProp {

}
Body.defaultProps = {

}
function Body(props: BodyProp): JSX.Element {
	return (
		<div className="flex justify-center">
			<div className="flex flex-wrap gap-4">
				<div className="flex bg-moa-blue-100 min-w-[100vw] xl:min-w-moa-menu h-80"></div>
				<div className="flex bg-moa-mono-100 min-w-[100vw] xl:min-w-moa-content h-80"></div>
			</div>
		</div>
	);
}

export default Body;