import {BrowserRouter, Route,
  Routes,} from 'react-router-dom';
import {Signin} from "./Pages/Signin.jsx";
import {Signup} from "./Pages/Signup.jsx";
import {SendMoney} from "./Pages/SendMoney.jsx";
import {Dashboard} from "./Pages/Dashboard.jsx";
import {LandingPage} from "./Pages/LandingPage.jsx";
import {SuccessPage} from "./Pages/Success.jsx";
import { Transactions } from './Pages/Transactions.jsx';






function App() {


  return(
  <>
  
  <BrowserRouter>
  <Routes>
    <Route path="/signup" element={<Signup />} />
    <Route path="/" element={<LandingPage />} />
    <Route path="/signin" element={<Signin />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/send" element= {<SendMoney />} />
    <Route path="/success" element= {<SuccessPage />} />
    <Route path="/transactions" element= {<Transactions />} />
  </Routes>

   
  </BrowserRouter>
 
  </>
  



)
 
  
}

export default App
