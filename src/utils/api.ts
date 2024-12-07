import { DataType, DataRecord } from "../types";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export async function fetchData(type: DataType): Promise<DataRecord[]> {
  const response = await fetch(`${API_BASE_URL}/${type}`);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
}

export function downloadData(data: DataRecord[], filename: string) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
