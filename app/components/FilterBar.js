
import ButtonComponent from "./ButtonComponet";
import DataTable from "./DataTable";
import DateField from "./DateField";
import { useState } from "react";
import Dropdown from "./Dropdown";
import StoreDropDown from "./StoreDropDown";
import { SelectData } from "../Functions/SelectData";


export default function FilterBar({action}){

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const list = ['MIS', 'Sales', 'Order', 'Cancel'];

    return (
        <form action={action} className="flex bg-gray-100 h-24 items-center conetent-baseline px-16 gap-4">
            <DateField name="StartDate" fieldObj="Start Date" date={startDate} onChange={setStartDate}/>
            <DateField name="EndDate" fieldObj="End Date" date={endDate} onChange={setEndDate}/>
            <Dropdown name="DataTable" DropList={list} DropDefault="Select Data"/>
            <StoreDropDown name="Store" />
            <ButtonComponent name="Search" btnName='Search' type="submit"/>
        </form>
        
    );
}