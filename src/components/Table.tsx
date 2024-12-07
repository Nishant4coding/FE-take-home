import React from "react";
import { Column, DataRecord, Post, Comment } from "../types";

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

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const renderCell = (value: any, columnKey: keyof (Post & Comment)) => {
    if (columnKey === "email") {
      return (
        <a
          href={`mailto:${value}`}
          className="text-blue-600 hover:text-blue-800 hover:underline"
        >
          {value}
        </a>
      );
    }
    if (columnKey === "body") {
      return <p className="text-gray-600">{truncateText(value, 100)}</p>;
    }
    if (columnKey === "title") {
      return (
        <p className="font-medium text-gray-900">{truncateText(value, 60)}</p>
      );
    }
    return <span className="text-gray-900">{value}</span>;
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key as string}
                  className="group px-6 py-3 text-left"
                >
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
                {columns.map((column) => {
                  const value = item[column.key as keyof DataRecord];
                  return (
                    <td
                      key={column.key as string}
                      className="px-6 py-4 text-sm"
                    >
                      {renderCell(value, column.key)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
