export type ImportFile = {
  id: string;
  fileName: string;
  type: "PURCHASE" | "SALE";
  uploadedAt: string;
  status: "ACTIVE" | "DELETED";
  hasDependentSales?: boolean;
};


export async function fetchImports(): Promise<ImportFile[]> {
  const res = await fetch("http://localhost:4000/api/imports");
  if (!res.ok) throw new Error("Failed to fetch imports");
  return res.json();
}
