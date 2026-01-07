'use client'

import { useState } from "react";
import { useActionState } from "react";
import DataTable from "../components/DataTable";
import FilterBar from "../components/FilterBar";
import TopHeader from "../components/TopHeader";
import { SelectData } from "../Functions/SelectData";

export default function ReportPage(){
    const initialState = {
        success: false,
        data: null,
    }
    const [state, formAction] = useActionState(SelectData, initialState);

    return (
        <>
        <TopHeader />
        <FilterBar action={formAction} />
        {(state.success && state.data.dataType=="MIS") && <DataTable table="bdmis" startDate={state.data.startDate} endDate={state.data.endDate} store={state.data.store}/>}
        </>
    );
}