import { NextResponse } from "next/server";
import PDF from "@cyber2024/pdf-parse-fixed";
import { createOrReadVectorStoreIndex } from "@/lib/vector-store";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    console.log("formData ", formData);
    const file = formData.get("file") as File;
    const fileContent = await file.arrayBuffer();

    const parsedPdf = await PDF(Buffer.from(fileContent));

    await createOrReadVectorStoreIndex(parsedPdf.text);

    return NextResponse.json(
      {
        message: "File uploaded",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
