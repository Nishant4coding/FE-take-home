import React from "react";
import { DataType } from "../types";
import { FileText, MessageSquare } from "lucide-react";

interface DataSelectorProps {
  value: DataType;
  onChange: (value: DataType) => void;
}

export function DataSelector({ value, onChange }: DataSelectorProps) {
  return (
    <div className="flex space-x-2">
      <button
        onClick={() => onChange("posts")}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
          value === "posts"
            ? "bg-blue-500 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        <FileText className="w-4 h-4" />
        <span>Posts</span>
      </button>
      <button
        onClick={() => onChange("comments")}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
          value === "comments"
            ? "bg-blue-500 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        <MessageSquare className="w-4 h-4" />
        <span>Comments</span>
      </button>
    </div>
  );
}
