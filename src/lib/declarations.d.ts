declare module '*?raw';

// 이미지 모듈에 대한 타입 선언
declare module '*.ico' {
  const src: string;
  export default src;
}