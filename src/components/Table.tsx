import React from "react";
import { Column, DataRecord } from "../types";

interface TableProps {
  data: DataRecord[];
  columns: Column[];
  currentPage: number;
  itemsPerPage: number;
}

export function Table({
  data,
  columns,
  currentPage,
  itemsPerPage,
}: TableProps) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const truncateText = (value: unknown, maxLength: number): string => {
    if (typeof value !== "string") return String(value);
    return value.length > maxLength ? value.slice(0, maxLength) + "..." : value;
  };

  const renderCell = (item: DataRecord, column: Column) => {
    const value: unknown = item[column.key as keyof DataRecord] || "";

    switch (column.key) {
      case "email":
        return (
          <a
            href={`mailto:${value}`}
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            {truncateText(value, 60)}
          </a>
        );
      case "body":
        return <p className="text-gray-600">{truncateText(value, 100)}</p>;
      case "title":
        return (
          <p className="font-medium text-gray-900">{truncateText(value, 90)}</p>
        );
      default:
        return (
          <span className="text-gray-900"> {truncateText(value, 60)}</span>
        );
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="group px-6 py-3 text-left">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-600">
                      {column.header}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {currentData.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-blue-50 transition-colors duration-150"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="lg:px-6 px-2 lg:py-4 py-2 text-sm text-center lg:text-left"
                  >
                    {renderCell(item, column)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
