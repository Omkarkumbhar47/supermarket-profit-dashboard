import * as xlsx from "xlsx";

export function parseExcel(buffer: Buffer): any[] {
  const workbook = xlsx.read(buffer, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  return xlsx.utils.sheet_to_json(sheet, {
    defval: null,
    raw: false,
  });
}
