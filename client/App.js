import Home from './components/Home.jsx';
import Todo from './components/Todo.jsx';
import MCE from './components/MCE.jsx';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './css/App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={Home}></Route>
          <Route path='/todo' Component={Todo}></Route>
          <Route path='/text' Component={MCE}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
