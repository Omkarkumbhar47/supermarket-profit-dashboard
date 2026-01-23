import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { SalesPreview } from "@/lib/preview";

type SalesTableProps = {
  data: SalesPreview[];
};

export function SalesTable({ data }: SalesTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead data-testid="sales-item-code">Item Code</TableHead>
          <TableHead data-testid="sales-quantity-sold">Quantity Sold</TableHead>
          <TableHead data-testid="sales-selling-price">Selling Price</TableHead>
          <TableHead data-testid="sales-date">Date</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            <TableCell>{row.itemCode}</TableCell>
            <TableCell>{row.quantitySold}</TableCell>
            <TableCell>₹{row.sellingPrice}</TableCell>
            <TableCell>{row.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
