
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { userAtom } from "../store/userAtom";
import { useRecoilState } from "recoil";
import { Button } from "../components/Button";
import { balanceAtom } from "../store/balanceAtom";


export const LandingPage = () => {
  const navigate = useNavigate();
  const [User2, setUser] = useRecoilState(userAtom); // Define user state
  const [loading, setLoading] = useState(true);
  const [balance,setBalance] = useRecoilState(balanceAtom);
 

//   const token1 = localStorage.getItem('token');
//   console.log('token',token1);

 

  useEffect(() => {
    const fetchUser = async () => {
      try {
      
        const response = await axios.post("http://localhost:3000/api/v1/user/me", {token:localStorage.getItem("token")}, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"), // Send the token in the Authorization header
            }});
        if (response.status === 200) {
          const userData = response.data.user[0];
         
          setUser(userData);
          console.log("userId",userData._id);
          console.log("user",userData);
    
          const account = await axios.get(`http://localhost:3000/api/v1/account/balance`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token") 
            
        }});
        const balanceData = account.data.balance;
        console.log("balance",balanceData);
        setBalance(balanceData)


            // Update user state
          console.log("user2", User2);
            navigate('/dashboard')
        } else {
            console.log("user not found")
          navigate('/signin'); // Navigate to signin if status isn't 200
        }
      } catch (error) {
        console.error("Error fetching user data", error);
        navigate('/signin');  // Handle any errors by navigating to signin
      } finally {
        setLoading(false);  // Ensure loading state is set to false after request
      }
    };

    fetchUser(); // Call the async function
  }, [setUser,setBalance,navigate]);

  if (loading) return <div>Loading...</div>; // Show loading while fetching data

  if (User2) {
    return (
      <>
        Welcome Back {User2.username}
        <Button onClick={Logout} label={'Logout'} />
      </>
    );
  } else {
    return null;  // Return null while navigating to avoid rendering unwanted content
  }
};

export function Logout() {
    localStorage.removeItem('token');
    
}
