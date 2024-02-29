const App = () => <></>;
export default App;
// import React, { useState, useEffect, useRef } from 'react';
// import { ExperimentalThreeJS } from '@midasit-dev/moaui';

// const Random3DVisualization: React.FC = () => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [isDragging, setIsDragging] = useState<boolean>(false);
//   const [previousMousePosition, setPreviousMousePosition] = useState<{ x: number; y: number } | undefined>();

//   useEffect(() => {
//     const currentCanvas = canvasRef.current;
//     // 캔버스가 정의되지 않았다면 바로 종료
//     if (!currentCanvas) return;

//     // 씬, 카메라 및 렌더러를 설정
//     const scene = new ExperimentalThreeJS.Scene();
//     const camera = new ExperimentalThreeJS.PerspectiveCamera(
//       75,
//       currentCanvas.clientWidth / currentCanvas.clientHeight,
//       0.1,
//       1000
//     );
//     const renderer = new ExperimentalThreeJS.WebGLRenderer({
//       canvas: currentCanvas,
//     });
//     renderer.setSize(currentCanvas.clientWidth, currentCanvas.clientHeight);
    
//     // 영역 내 랜덤 점 개체를 생성
//     const points = [];
//     const colors: ExperimentalThreeJS.Color[] = [];
//     for (let i = 0; i < 10; i++) {
//       const x = Math.random() * 50 - 25;
//       const y = Math.random() * 50 - 25;
//       const z = Math.random() * 50 - 25;

//       points.push(new ExperimentalThreeJS.Vector3(x, y, z));
//       colors.push(new ExperimentalThreeJS.Color(Math.random(), Math.random(), Math.random()));
//     }

//     // 색상 배열을 BufferAttribute로 변환
//     const colorArray = colors.reduce((arr: any, color: any) => {
//       arr.push(color.r, color.g, color.b);
//       return arr;
//     }, []);
//     const geometry = new ExperimentalThreeJS.BufferGeometry().setFromPoints(points);
//     geometry.setAttribute('color', new ExperimentalThreeJS.BufferAttribute(new Float32Array(colorArray), 3));
    
//     // 포인트 클라우드 재료 설정 및 scene에 추가
//     const material = new ExperimentalThreeJS.PointsMaterial({ size: 0.5, vertexColors: true });
//     const pointCloud = new ExperimentalThreeJS.Points(geometry, material);
//     scene.add(pointCloud);
//     camera.position.z = 50;
    
//     // 마우스 드래그 이벤트 핸들러
//     const onMouseDown = (event: MouseEvent) => {
//       setIsDragging(true);
//       setPreviousMousePosition({ x: event.clientX, y: event.clientY });
//     };

//     const onMouseMove = (event: MouseEvent) => {
//       if (isDragging) {
//         const { x: previousX, y: previousY } = previousMousePosition || { x: 0, y: 0 };
//         const deltaMove = {
//           x: event.clientX - previousX,
//           y: event.clientY - previousY,
//         };

//         const rotateSpeed = 0.005;
//         pointCloud.rotation.y += deltaMove.x * rotateSpeed;
//         pointCloud.rotation.x += deltaMove.y * rotateSpeed;

//         setPreviousMousePosition({ x: event.clientX, y: event.clientY });
//       }
//     };

//     const onMouseUp = () => setIsDragging(false);
//     const onMouseLeave = () => setIsDragging(false);

//     // 이벤트 리스너 추가
//     currentCanvas.addEventListener('mousedown', onMouseDown);
//     currentCanvas.addEventListener('mousemove', onMouseMove);
//     currentCanvas.addEventListener('mouseup', onMouseUp);
//     currentCanvas.addEventListener('mouseleave', onMouseLeave);

//     // 렌더링 루프 시작
//     const animate = () => {
//       requestAnimationFrame(animate);
//       renderer.render(scene, camera);
//     };
//     animate();

//     // 클린업 함수
//     return () => {
//       currentCanvas.removeEventListener('mousedown', onMouseDown);
//       currentCanvas.removeEventListener('mousemove', onMouseMove);
//       currentCanvas.removeEventListener('mouseup', onMouseUp);
//       currentCanvas.removeEventListener('mouseleave', onMouseLeave);
//       renderer.dispose();
//     };
//   }, [isDragging, previousMousePosition]); // 의존성 배열

//   return <canvas ref={canvasRef} />;
// };

// export default Random3DVisualization;