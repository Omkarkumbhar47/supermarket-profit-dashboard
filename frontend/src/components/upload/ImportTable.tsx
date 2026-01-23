import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { ImportFile } from "@/lib/imports";

type ImportTableProps = {
  data: ImportFile[];
};

export function ImportTable({ data }: ImportTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>File Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Uploaded At</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((file) => (
          <TableRow key={file.id}>
            <TableCell>{file.fileName}</TableCell>
            <TableCell>
              <Badge
                data-testid={`import-type-${file.id}`}
                variant={file.type === "PURCHASE" ? "default" : "secondary"}
              >
                {file.type}
              </Badge>
            </TableCell>
            <TableCell>{file.uploadedAt}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
