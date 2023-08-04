import React from 'react';
import './App.css';
import Button from "./lib/button/index";
import IconButton from "./lib/IconButton/index";
import QuizIcon from '@mui/icons-material/Quiz';
function App() {
  function hanlderButtonClick(){
    console.log("Button click test");
  }

  function hanlderIconButtonClick(){
    console.log("Icon Button click test");
  }
  return (
    <div className="App">
				<Button onClick={hanlderButtonClick}>
          Button Text
        </Button>
        <br/>
        <IconButton onClick={hanlderIconButtonClick}>
          <QuizIcon/>IconButton Text
        </IconButton>
    </div>
  );
}

export default App;
