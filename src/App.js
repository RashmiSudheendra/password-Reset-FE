import './App.css';
import {Routes, Route} from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
import CreateAccount from './components/CreateAccount';
import Email from './components/Email';
import NewPassword from './components/NewPassword';
import Login from './components/Login';
import LoggedInPage from './components/LoggedInPage';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path= "/createAccount" element={<CreateAccount/>}/>
          <Route path= "/loggedInPage" element={<LoggedInPage/>}/>
          <Route path= "/login" element={<Login/>}/>
          <Route path= "/email" element={<Email/>}/>
          <Route path= "/newPassword" element={<NewPassword/>}/>
          <Route path='*' element={<Login/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
