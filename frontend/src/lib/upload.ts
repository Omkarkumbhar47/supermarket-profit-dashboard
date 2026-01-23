export async function uploadFile(
  endpoint: "purchase" | "sales",
  file: File
) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(
    `http://localhost:4000/api/upload/${endpoint}`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.error || data.message || "Upload failed"
    );
  }

  return data;
}
