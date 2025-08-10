import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb"

export async function GET() {
  try {
    await dbConnect();
    return NextResponse.json({ message: "Database connected!" });
  } catch (error) {
    return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
  }
}
