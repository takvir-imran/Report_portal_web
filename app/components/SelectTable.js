export default function SelectTable() {
  return (
    <div className="flex flex-col items-start space-y-2 p-6">
      <label htmlFor="reportType" className="text-gray-700 font-medium"></label>

      <select
        id="reportType"
        name="reportType"
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Report type</option>
        <option value="sales">Sales Report</option>
        <option value="inventory">Inventory Report</option>
        <option value="finance">Finance Report</option>
      </select>
    </div>
  );
}
