import { ReactComponent as CircularProgressIcon } from './CircularProgress.svg';
import { useState, useEffect } from 'react';

export default function ColorfulCircularProgress ({ size= 100, speed= 2, sx= {} }) {
	const [rotation, setRotation] = useState(0);

  useEffect(() => {
    setRotation(360);
    const interval = setInterval(() => {
      setRotation((prevRotation) => prevRotation + 360);
    }, speed * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const rotatingStyle = {
    width: `${size}`,
    height: `${size}`,
    transform: `rotate(${rotation}deg)`,
    transition: `transform ${speed}s linear`,
    ...sx
  };
	
	return (<CircularProgressIcon style={rotatingStyle} />);
}