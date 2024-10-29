import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';
import {Button} from "../components/Button";
import { useNavigate } from 'react-router-dom';
import { InputBox } from '../components/InputBox';

export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);
    const [loading,setLoading] = useState(false);
    const [purpose,setPurpose] =useState("")
    
    const navigate = useNavigate();


    const initiateTransfer = async () => {
        setLoading(true);  // Start the loading state
    
        try {
            // Initiating the transfer
            const response = await axios.post('http://localhost:3000/api/v1/account/transfer', {
                amount,
                to: id
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            });
    
            // If the transfer was successful, store the transaction
            if (response.status === 200) {
                try {
                    await axios.post('http://localhost:3000/api/v1/transaction/storeTransaction', {
                        to: id,
                        
                        amount,
                        purpose  // Assuming `purpose` is defined in your component state or props
                    }, {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token')
                        }
                    });
                    console.log('Transaction stored successfully');
                } catch (err) {
                    console.error('Storing transaction failed', err);
                }
            }
    
            // Once everything is successful, stop loading and navigate to the success page
            setLoading(false);
            navigate('/success');
        } catch (err) {
            console.error('Transfer failed', err);
    
            // Stop loading and navigate to the home page in case of failure
            setLoading(false);
            navigate('/');
        }
    };
    



    return <div className="flex justify-center h-screen bg-gray-100">
        <div className="h-full flex flex-col justify-center">
            <div
                className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg"
            >
                <div className="flex flex-col space-y-1.5 p-6">
                <h2 className="text-3xl font-bold text-center">Send Money</h2>
                </div>
                <div className="p-6">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
                   
                    </div>
                    <h3 className="text-2xl font-semibold">{name}</h3>
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                    <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        for="amount"
                    >
                        Amount (in Rs)
                    </label>
                    <input
                        onChange={(e) => {
                            setAmount(e.target.value);
                        }}
                        type="number"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        id="amount"
                        placeholder="Enter amount"
                    />
                    </div>
                    <InputBox onChange={(e)=>{

                        setPurpose(e.target.value);

                    }} label={purpose} placeholder={'what is the purpose?'} />

                    {loading?( <div className="flex justify-center mt-4">
                                    {/* Loader (you can replace with a spinner or any loader component) */}
                                    <div className="loader border-t-4 border-blue-500 border-solid rounded-full w-6 h-6 animate-spin"></div>
                                </div>):(<Button onClick={initiateTransfer }
                    
                    label ={'Initiate Transfer'}
                    
                    className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"/>)}
                  
                      
                   
                </div>
                </div>
        </div>
      </div>
    </div>
}