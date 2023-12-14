import Auth from './components/Auth.jsx';
import Todo from './components/Todo.jsx';
import MCE from './components/MCE.jsx';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './css/App.css';
import ForgotPassword from './components/ForgotPassword.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/auth' Component={Auth}></Route>
          <Route path='/forgot-password' Component={ForgotPassword}></Route>
          <Route path='/dashboard' Component={Todo}></Route>
          <Route path='/text' Component={MCE}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
