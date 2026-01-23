import { useEffect, useState } from "react";
import { FileUploadCard } from "@/components/upload/FileUploadCard";
import { ImportTable } from "@/components/upload/ImportTable";
import { fetchImports } from "@/lib/imports";
import type { ImportFile } from "@/lib/imports";

export function Upload() {
  const [imports, setImports] = useState<ImportFile[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadImports() {
    try {
      const data = await fetchImports();
      setImports(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadImports();
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Upload Files</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <FileUploadCard
          title="Upload Purchase File"
          description="Upload Excel file containing purchase data."
          type="purchase"
          onSuccess={loadImports}   // 🔥 refresh after upload
        />

        <FileUploadCard
          title="Upload Sales File"
          description="Upload Excel file containing sales data."
          type="sale"
          onSuccess={loadImports}
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Uploaded Files</h2>

        {loading ? (
          <p className="text-sm text-muted-foreground">Loading imports...</p>
        ) : (
          <ImportTable data={imports} />
        )}
      </div>
    </div>
  );
}
