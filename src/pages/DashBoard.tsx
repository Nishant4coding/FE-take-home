import { Database, Download } from "lucide-react";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { DataSelector } from "../components/DataSelector";
import { Pagination } from "../components/Pagination";
import { LoadingSpinner } from "../components/Spinner";
import { Table } from "../components/Table";
import { COLUMNS, ITEMS_PER_PAGE } from "../constants/table";
import { DataRecord, DataType } from "../types";
import { downloadData, fetchData } from "../utils/api";

export default function Dashboard() {
  const [dataType, setDataType] = useState<DataType>("posts");
  const [data, setData] = useState<DataRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);
        const newData = await fetchData(dataType);
        setData(newData);
        setCurrentPage(1);
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [dataType]);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const handleDownload = () => {
    downloadData(data, `${dataType}.json`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 py-10">
      <div className="mx-auto px-6 sm:px-8">
        <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center border-b pb-6 gap-4 lg:gap-0">
            <div className="flex lg:flex-row flex-col items-center space-x-3">
              <Database className="w-10 h-10 text-blue-500" />
              <h1 className="lg:text-4xl text-3xl text-center lg:text-left font-extrabold text-gray-800">
                Data Explorer Dashboard
              </h1>
            </div>
            <DataSelector value={dataType} onChange={setDataType} />
          </div>

          {/* Content Section */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="text-gray-600 text-lg mb-4">
              Viewing <strong className="text-blue-600">{dataType}</strong> data
              • <span className="font-semibold">{data.length}</span> total
              records
            </div>

            {/* Error or Loading State */}
            {error ? (
              <div className="bg-red-100 text-red-600 rounded-lg p-4 text-center">
                {error}
              </div>
            ) : loading ? (
              <LoadingSpinner />
            ) : (
              <>
                {/* Table */}
                <Table
                  data={data}
                  columns={COLUMNS[dataType]}
                  currentPage={currentPage}
                  itemsPerPage={ITEMS_PER_PAGE}
                />

                {/* Actions and Pagination */}
                <div className="mt-6 flex flex-col lg:flex-row lg:justify-between items-center gap-6">
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-3 px-6 py-3 bg-blue-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-700 shadow-lg transform hover:scale-105 transition"
                  >
                    <Download className="w-5 h-5" />
                    Download {dataType}
                  </button>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
