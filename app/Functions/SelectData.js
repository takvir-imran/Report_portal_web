'use server'

export async function SelectData(prevState, formData) {
    const startDate = formData.get('StartDate');
    const endDate = formData.get('EndDate');
    const dataType = formData.get('DataTable');
    const store = formData.get('Store');

    const payload = { startDate, endDate, dataType, store };

    console.log("SERVER RECEIVED:", payload);

    return {
        success: true,
        data: payload,
    };
}
