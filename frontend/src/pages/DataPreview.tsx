import { useEffect, useState } from "react";
import { PurchaseTable } from "@/components/tables/PurchaseTable";
import { SalesTable } from "@/components/tables/SalesTable";
import { fetchPurchasePreview, fetchSalesPreview } from "@/lib/preview";
import type { PurchasePreview, SalesPreview } from "@/lib/preview";

export function DataPreview() {
  const [purchases, setPurchases] = useState<PurchasePreview[]>([]);
  const [sales, setSales] = useState<SalesPreview[]>([]);

  useEffect(() => {
    fetchPurchasePreview().then(setPurchases);
    fetchSalesPreview().then(setSales);
  }, []);

  return (
    <div className="space-y-10">
      <h1 className="text-2xl font-semibold">Data Preview</h1>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Purchase Data</h2>
        <PurchaseTable data={purchases} />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Sales Data</h2>
        <SalesTable data={sales} />
      </div>
    </div>
  );
}
