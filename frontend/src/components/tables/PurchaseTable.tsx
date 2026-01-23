import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { PurchasePreview } from "@/lib/preview";



type PurchaseTableProps = {
  data: PurchasePreview[];
};

export function PurchaseTable({ data }: PurchaseTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead  data-testid="purchase-item-code">Item Code</TableHead>
          <TableHead data-testid="purchase-item-name">Item Name</TableHead>
          <TableHead data-testid="purchase-quantity">Quantity</TableHead>
          <TableHead data-testid="purchase-buying-price">Buying Price</TableHead>
          <TableHead data-testid="purchase-date">Date</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            <TableCell>{row.itemCode}</TableCell>
            <TableCell>{row.itemName}</TableCell>
            <TableCell>{row.quantity}</TableCell>
            <TableCell>₹{row.buyingPrice}</TableCell>
            <TableCell>{row.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
