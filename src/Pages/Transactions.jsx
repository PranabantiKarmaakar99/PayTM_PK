import { useEffect,useState } from "react";
import axios from 'axios';
import { useRecoilValue } from "recoil";
import { userAtom } from "../store/userAtom";
import { balanceAtom } from "../store/balanceAtom";

export const Transactions = () =>{

    const [transactions, setTransactions] = useState([]);

    const user = useRecoilValue(userAtom);
    const balance = useRecoilValue(balanceAtom);

    console.log("user",user.username)
    console.log ("balance",balance)
  
    useEffect(() =>{

        const fetchTransactions = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/transaction/getTransactionById', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                });
                
                setTransactions(response.data.transaction); // Assuming response.data.transactions is an array
                console.log('response:',response.data);
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        };

        fetchTransactions();

    },[]);

    return (
        <div className="h-screen bg-gray-100 w-full flex justify-center">
          
            <div className="flex flex-col justify-center items-center">
            <div className="my-12 font-bold">Transaction by {user.username}</div>
                <div className="bg-white shadow-lg rounded-lg h-min w-max p-4">
                    {transactions.map((transaction) => (
                        <div key={transaction._id} className="flex flex-col border-b p-2">
                            <div><strong>From:</strong> {transaction.from}</div>
                            <div><strong>To:</strong> {transaction.to}</div>
                            <div><strong>Amount:</strong> ₹{transaction.amount}</div>
                            <div><strong>Purpose:</strong> {transaction.purpose}</div>
                            <div><strong>Date:</strong> {new Date(transaction.date).toLocaleDateString()}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};