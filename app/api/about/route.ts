import { NextResponse } from "next/server";
import aboutData from "./about.json";
export async function GET() {
  try {
    return NextResponse.json({
      status: 200,
      aboutTitle: aboutData.aboutTitle,
      aboutDescription: aboutData.aboutDescription,
      CustomerServiceAndSupport: aboutData.CustomerServiceAndSupport,
      aboutImage:aboutData.aboutImage
    });
  } catch (error) {
    console.error("Error fetching about data:", error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
