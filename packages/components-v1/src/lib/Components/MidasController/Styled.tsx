import React from 'react';
import { styled } from '@mui/material/styles';
import MoaStyledComponent from '../../Style/MoaStyled';

export type StyledProps = {
  /**
   * current element id
   * @defaultValue ""
   * @optional
   * @type string
   */
  id?: React.HtmlHTMLAttributes<HTMLDivElement>["id"];
  /**
   * set a favicon ico.
   */
  icoSrc?: string;
  /**
   * set a title.
   */
  title?: string | undefined;
};

const StyledComponent = styled((props: StyledProps) => {
	const {
		id,
		icoSrc,
		title,
	} = props;

	const [opacityValue, setOpacityValue] = React.useState(1);

	return (
		<div style={{ display: 'flex', width: '100%' }}>
			<span style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', height: '2rem', zIndex: 1000 }}>
				<div style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#21272A', paddingTop: '0.5rem', paddingBottom: '0.5rem', width: '100%', fontFamily: 'Pretendard', color: '#BDC2C8', }} onMouseDown={(event: any) => {
					// @ts-ignore
					if (!window.chrome.webview) return;
					// @ts-ignore
					if (event.button === 0 || event.button === 1) window.chrome.webview.postMessage('REQ_WND_MOVE')}
				}>
					<div style={{ display: 'flex', paddingLeft: '20px', alignItems: 'center' }}>
						<img src={icoSrc || 'https://raw.githubusercontent.com/midasit-dev/moaui-fixed-repo/main/ico/favicon.ico'} width="12px" alt=" " />
					</div>
					<span style={{ paddingLeft: '0.75rem', userSelect: 'none', fontSize: '0.75rem' }}>
						{title}
					</span>
				</div>
				<div 
					id={id}
					style={{ 
						width: '3rem', 
						userSelect: 'none', 
						display: 'flex', 
						justifyContent: 'center', 
						alignItems: 'center', 
						backgroundColor: '#21272A', 
						color: '#BDC2C8', 
						transition: 'opacity 0.3s',
						opacity: opacityValue,
						cursor: 'pointer',
					}} 
					onMouseOver={() => setOpacityValue(0.8)}
					onMouseOut={() => setOpacityValue(1)}
					onMouseDown={() => setOpacityValue(0.6)}
					onMouseUp={() => setOpacityValue(1)}
					onClick={() => {
						// @ts-ignore
						if (!window.chrome.webview) return;
						// @ts-ignore
						window.chrome.webview.postMessage('REQ_EXIT');
					}}
				>
					<svg width="1rem" viewBox="0 0 24 24">
						<path fill="#BDC2C8" d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
						</path>
					</svg>
				</div>									
			</span>
		</div>
	)
}) (() => ({}))


const ThemedComponent = (props: StyledProps) => (
	<MoaStyledComponent>
		<StyledComponent {...props} />
	</MoaStyledComponent>
);
export default ThemedComponent;