import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";

export const SuccessPage =()=>{

    const navigate = useNavigate();

    const onClickhandler=()=>{
        
        navigate('/')
    }

    return <div className="h-screen flex bg-gray-100 flex justify-center">
        <div className="h-full flex flex-col justify-center">
            <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
               
                <div class="flex flex-col space-y-1.5 p-6">
                <h2 class="text-3xl font-bold text-center"> Your transfer was successful!!</h2>
                </div>
                <div class="flex flex-col space-y-1.5 p-6">
               <Button onClick={onClickhandler} label={'Go back to dashboard'} />
                </div>
           
            </div>
       
        </div>
       
    </div>
}