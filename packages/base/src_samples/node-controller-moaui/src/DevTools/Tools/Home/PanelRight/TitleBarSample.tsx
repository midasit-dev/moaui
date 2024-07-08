interface ToolProps {
	title: string;
}

const Tool = (props: ToolProps) => {
	const { title } = props;

	return (
		<div style={{ display: 'flex', width: '100%' }}>
			<span style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', height: '2rem', zIndex: 1000 }}>
				<div style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#21272A', paddingTop: '0.5rem', paddingBottom: '0.5rem', width: '100%', fontFamily: 'Pretendard', color: '#BDC2C8', borderRadius: '4px 0 0 0', }} onMouseDown={(event: any) => {
					// @ts-ignore
					if (!window.chrome.webview) return;
					// @ts-ignore
					if (event.button === 0 || event.button === 1) window.chrome.webview.postMessage('REQ_WND_MOVE')}
				}>
					<div style={{ display: 'flex', paddingLeft: '20px', alignItems: 'center' }}>
						<img src={`${process.env.PUBLIC_URL}/favicon.ico`} width="12px" alt="midas-control-icon" />
					</div>
					<span style={{ paddingLeft: '0.75rem', userSelect: 'none', fontSize: '0.75rem' }}>
						{title}
					</span>
				</div>
				<div style={{ width: '3rem', userSelect: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#21272A', color: '#BDC2C8', borderRadius: '0 4px 0 0', }} onClick={() => {
					// @ts-ignore
					if (!window.chrome.webview) return;
					// @ts-ignore
					window.chrome.webview.postMessage('REQ_EXIT');
				}}>
					<svg width="1rem" viewBox="0 0 24 24">
						<path fill="#BDC2C8" d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
						</path>
					</svg>										
				</div>									
			</span>
		</div>
	)
}

export default Tool;