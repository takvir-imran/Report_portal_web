'use client';

export default function DownloadBtn({
    btnName,
    type = 'button',
    startDate,
    endDate,
    store
    }) 
    {

    const handleDownload = async () => {
    if (!startDate || !endDate) {
      alert('Start date and end date are required');
      return;
    }

    const response = await fetch(
      `http://10.26.0.99/download?sDate=${startDate}&eDate=${endDate}&dpc=${store}`
    );

    if (!response.ok) {
      alert('Failed to download file');
      return;
    }

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;

    // ✅ FIX: define filename properly
    link.download = `report_${startDate}_${endDate}.xlsx`;

    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      <button
        type={type}
        onClick={handleDownload}
        className="px-3 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
      >
        {btnName}
      </button>
    </div>
  );
}
