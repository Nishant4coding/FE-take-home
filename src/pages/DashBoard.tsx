import { Database, Download, Home } from "lucide-react";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { DataSelector } from "../components/DataSelector";
import { Pagination } from "../components/Pagination";
import { LoadingSpinner } from "../components/Spinner";
import { Table } from "../components/Table";
import { COLUMNS, ITEMS_PER_PAGE } from "../constants/table";
import { DataRecord, DataType, Column, Post, Comment } from "../types";
import { downloadDataAsCSV, fetchData } from "../utils/api";
import { DropDown } from "../components/DropDown";

const postColumns: Column[] = [
  { key: "userId", header: "User ID" },
  { key: "id", header: "ID" },
  { key: "title", header: "Title" },
  { key: "body", header: "Body" },
];

const commentColumns: Column[] = [
  { key: "postId", header: "Post ID" },
  { key: "id", header: "ID" },
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  { key: "body", header: "Body" },
];

export default function Dashboard() {
  const fieldSets = {
    posts: postColumns,
    comments: commentColumns,
  };

  const [selectedFields, setSelectedFields] = useState<string[]>(
    fieldSets.posts.map((col) => col.key)
  );
  const [dataType, setDataType] = useState<DataType>("posts");
  const [data, setData] = useState<DataRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const navigator = useNavigate();

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

  const filteredColumns = fieldSets[dataType].filter((col) =>
    selectedFields.includes(col.key)
  );

  const handleDownload = () => {
    downloadDataAsCSV(data, `${dataType}.csv`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 py-10 px-0">
      <div className="mx-auto lg:px-6 px-2">
        <div className="bg-white rounded-2xl shadow-2xl lg:p-8 p-2 space-y-6">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center border-b pb-6 gap-4 lg:gap-0 px-2 lg:px-0">
            <button
              onClick={() => navigator("/")}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition"
            >
              <Home className="w-6 h-6" />
              <span className="font-medium text-lg">Home</span>
            </button>

            <div className="flex lg:flex-row flex-col items-center space-x-3">
              <Database className="w-10 h-10 text-blue-500" />
              <h1 className="lg:text-4xl text-3xl text-center lg:text-left font-extrabold text-gray-800">
                Data Explorer Dashboard
              </h1>
            </div>
            <DataSelector value={dataType} onChange={setDataType} />
          </div>
          <div className="bg-gray-50 rounded-xl lg:p-6 p-2">
            <div className="flex flex-col lg:flex-row justify-between w-full items-center">
              <div className="text-gray-600 text-lg text-center lg:text-left">
                Viewing <strong className="text-blue-600">{dataType}</strong>{" "}
                data • <span className="font-semibold">{data.length}</span>{" "}
                total records
              </div>
              <DropDown
                fields={fieldSets[dataType]}
                selectedFields={selectedFields}
                setSelectedFields={setSelectedFields}
              />
            </div>

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
                  columns={filteredColumns}
                  currentPage={currentPage}
                  itemsPerPage={ITEMS_PER_PAGE}
                />

                <div className="mt-6 flex flex-col lg:flex-row lg:justify-between items-center gap-6">
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-3 px-6 py-3 bg-blue-600 text-white font-semibold lg:text-lg text-sm rounded-lg hover:bg-blue-700 shadow-lg transform hover:scale-105 transition"
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
