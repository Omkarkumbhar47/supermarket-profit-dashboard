import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UploadCloud } from "lucide-react";
import { uploadFile } from "@/lib/upload";
import { toast } from "sonner";

type Props = {
  title: string;
  description: string;
  type: "purchase" | "sale";
  onSuccess: () => void;
};

export function FileUploadCard({ title, description, type, onSuccess }: Props) {
  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const toastId = toast.loading("Uploading Excel file...");

    try {
      await uploadFile(type, file);

      toast.success("Upload successful", {
        id: toastId,
        description:
          type === "purchase"
            ? "Purchase data imported successfully"
            : "Sale data imported successfully",
      });

      onSuccess();
    } catch (err: any) {
      toast.error("Upload failed", {
        id: toastId,
        description: err.message,
      });
    } finally {
      // allow re-uploading same file
      e.target.value = "";
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{description}</p>

        <Button variant="outline" asChild>
          <label className="cursor-pointer w-full flex items-center justify-center">
            <UploadCloud className="mr-2 h-4 w-4" />
            Upload Excel File
            <input
              type="file"
              accept=".xlsx"
              hidden
              data-testid={`upload-${type}`}
              onChange={handleFile}
            />
          </label>
        </Button>
      </CardContent>
    </Card>
  );
}
