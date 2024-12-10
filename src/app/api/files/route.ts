import { NextResponse } from "next/server";
import PDF from "@cyber2024/pdf-parse-fixed";

export async function POST(request: Request) {
  const formData = await request.formData();
  console.log("formData ", formData);
  const file = formData.get("file") as File;
  const fileContent = await file.arrayBuffer();

  const parsedPdf = await PDF(Buffer.from(fileContent));
}
