import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users";
import { Logout } from "./LandingPage";
import { Button } from "../components/Button";
import { useRecoilValue } from "recoil";
import { userAtom } from "../store/userAtom";
import {useNavigate} from "react-router-dom";
import { balanceAtom } from "../store/balanceAtom";
//import Link from 'react/Link';

export const Dashboard = () => {
    const user = useRecoilValue(userAtom);
    const balance = useRecoilValue(balanceAtom);
    console.log("user",user)
    const navigate = useNavigate();
  

  
    return <div>
        <Appbar label={user.username} />
        <div className="m-8">
            <Balance value={balance} />
            <Users />
            <a href="/transactions" className="pt-4"> See All Transactions</a>
            <div className="pt-4">
            <Button onClick={()=>{
                localStorage.removeItem('token')
                navigate('/signin');
            }} label={'Logout'} />
            </div>
        </div>
    </div>
}