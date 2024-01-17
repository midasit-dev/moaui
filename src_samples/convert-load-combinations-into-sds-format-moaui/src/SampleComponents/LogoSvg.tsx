import React from 'react';

const imgStyle: any = {
	display: 'block',
	width: '350px',
	height: '150px',
}

const LogoSvg = () => {
	return (
		<img style={imgStyle} src="./SVG/m_circle.svg" alt="Midas IT" />
	)
}

export default LogoSvg;