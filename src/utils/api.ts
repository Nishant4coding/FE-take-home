import { DataType, DataRecord } from "../types";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export async function fetchData(type: DataType): Promise<DataRecord[]> {
  const response = await fetch(`${API_BASE_URL}/${type}`);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
}

export function downloadDataAsCSV(data: DataRecord[], filename: string) {
  const headers = Object.keys(data[0]).join(",");
  const rows = data.map((row) =>
    Object.values(row)
      .map((value) => `"${value}"`)
      .join(",")
  );

  const csvContent = [headers, ...rows].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
