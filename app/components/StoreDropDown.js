'use client'
import Dropdown from "./Dropdown";
import {useState, useEffect} from "react";

export default function StoreDropDown({name}){
    const [stores, setStores] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        const fetchData = async () =>{
            try{
                const response = await fetch('http://10.26.0.99/stores/', {cache: "no-store"});
                if(!response.ok){
                    throw new Error("Failed to fetch data");
                }
                const result = await response.json();
                const storeNames  = result.map(store => store.code)
                console.log(storeNames);
                setStores(storeNames)
            }
            catch(err){
                setError(err.message)
            }
            finally{
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <p>Loading stores...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;
    

    return <Dropdown name={name} DropList={stores} DropDefault="Select Store"/>;
}