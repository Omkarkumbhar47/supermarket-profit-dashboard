import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

type SummaryCardProps = {
  title: string;
  value: string;
  icon?: ReactNode;
};

export function SummaryCard({ title, value, icon }: SummaryCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardContent>
    </Card>
  );
}
