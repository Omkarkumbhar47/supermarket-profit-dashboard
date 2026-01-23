import express from "express";
import cors from "cors";
import uploadRoutes from "./routes/upload.routes";
import salesRoutes from "./routes/sales.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import importRoutes from "./routes/import.routes";
import previewRoutes from "./routes/preview.routes";
export const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/upload", uploadRoutes);
app.use("/api/upload", salesRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/imports", importRoutes);
app.use("/api/preview", previewRoutes);

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});
