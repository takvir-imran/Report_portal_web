import { useState, useEffect } from "react"

export default function CountView({table ,startDate, endDate, store}){
    const [count, setCount] = useState(0);
    const [error, setError] = useState(null);

    useEffect(()=>{
        if(!startDate || !endDate)
            return;
        const fetchData = async () => {
            try{
                const response = await fetch(`http://10.26.0.99/${table}/count/?sDate=${startDate}&eDate=${endDate}&dpc=${store}`, { cache: "no-store" });
                console.log("Hello"+ response);
                if(!response.ok){
                    throw new Error("Failed to fetch data");
                }
                const result = await response.json();
                console.log(result);
                setCount(result);  
            }
            catch(err){
                setError(err.message)
            }
        }
        fetchData();
    });

    return <p>Total <strong>{count}</strong> data found </p>
}