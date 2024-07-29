// import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  // const [time, setTime] = React.useState(3);

  // React.useEffect(() => {
  //   const tick = (sec) => setTimeout(() => window.location.href = "https://feature-storybook-from-dev--6556d17f924e868b000ddaf5.chromatic.com/", sec * 1000);
  //   const changeTime = (sec) => setInterval(() => setTime(--sec), 1000);
  //   tick(time);
  //   changeTime(time);
  // }, [time]);

  // return (
  //   <>
  //     <header>
  //       <div className="header-div">Redirect to Chromatic ...</div>
  //       <div className="header-dot-div">{time}</div>
  //     </header>

  //     <main>
  //       <section>
  //         <div className="main-sec1-div">https://feature-storybook-from-dev--6556d17f924e868b000ddaf5.chromatic.com/</div>
  //       </section>
  //     </main>
  //   </>
  // );

	React.useEffect(() => {
		window.location.href = "https://feature-storybook-from-dev--6556d17f924e868b000ddaf5.chromatic.com";
	}, []);

	return (
		<>
			redirecting ... https://feature-storybook-from-dev--6556d17f924e868b000ddaf5.chromatic.com
		</>
	);
}

function Entry() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  )
}

// "index.html"의 <div>중 id="root"를 찾아옵니다.
const root = ReactDOM.createRoot(document.getElementById('root'));
// id="root"를 가진 div에 아래 html 코드를 렌더링 해줍니다.
root.render(<Entry />);