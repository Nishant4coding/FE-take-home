import React, { useState, useEffect } from "react";
import { Download, Database } from "lucide-react";
import { DataSelector } from "./components/DataSelector";
import { Table } from "./components/Table";
import { Pagination } from "./components/Pagination";
import { LoadingSpinner } from "./components/Spinner";
import { fetchData, downloadData } from "./utils/api";
import { DataType, DataRecord } from "./types";
import { ITEMS_PER_PAGE, COLUMNS } from "./constants/table";
import { Toaster } from "react-hot-toast";

export default function App() {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-xl p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-gray-200 pb-6">
            <div className="flex items-center space-x-3">
              <Database className="w-8 h-8 text-blue-500" />
              <h1 className="text-3xl font-bold text-gray-900">
                Data Explorer
              </h1>
            </div>
            <DataSelector value={dataType} onChange={setDataType} />
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-2">
              Viewing {dataType} data • {data.length} total records
            </div>

            {error ? (
              <div className="bg-red-50 text-red-600 rounded-lg p-4 text-center">
                {error}
              </div>
            ) : loading ? (
              <LoadingSpinner />
            ) : (
              <>
                <Table
                  data={data}
                  columns={COLUMNS[dataType]}
                  currentPage={currentPage}
                  itemsPerPage={ITEMS_PER_PAGE}
                />

                <div className="mt-6 flex justify-between items-center">
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 shadow-sm hover:shadow-md"
                  >
                    <Download className="w-4 h-4" />
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
