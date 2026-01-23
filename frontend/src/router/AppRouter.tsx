import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Dashboard } from "@/pages/Dashboard";
import { Upload } from "@/pages/Upload";
import { DataPreview } from "@/pages/DataPreview";
import { Toaster, toast } from "sonner";

export function AppRouter() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/preview" element={<DataPreview />} />
        </Routes>
        <Toaster richColors position="top-right" />
      </AppLayout>
    </BrowserRouter>
  );
}
