import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import MemberModel from "@/models/Member";

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json({
        success: false,
        error: "Database connection unavailable.",
        members: [],
      });
    }

    const fetched = await MemberModel.find({}).sort({ createdAt: -1 }).lean();
    const members = fetched.map((m: any) => ({
      id: m._id.toString(),
      serviceNumber: m.serviceNumber,
      name: m.name,
      email: m.email,
      phone: m.phone,
      age: m.age,
      rank: m.rank || "Recruit",
      unit: m.unit || "1st Salvation Battalion",
      department: m.department || "General Operations",
      emergencyContact: m.emergencyContact || "Command HQ",
      status: m.status || "Active",
      photoUrl: m.photoUrl,
      qrCodeUrl: m.qrCodeUrl,
      createdAt: m.createdAt,
    }));

    return NextResponse.json({
      success: true,
      members,
    });
  } catch (error: any) {
    console.error("Error in members API endpoint:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch members", members: [] },
      { status: 500 }
    );
  }
}
