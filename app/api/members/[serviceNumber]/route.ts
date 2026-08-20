import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import MemberModel from "@/models/Member";

export async function GET(
  req: NextRequest,
  { params }: { params: { serviceNumber: string } }
) {
  try {
    const { serviceNumber } = params;

    if (!serviceNumber) {
      return NextResponse.json(
        { success: false, error: "Service number is required" },
        { status: 400 }
      );
    }

    try {
      const conn = await connectToDatabase();
      if (conn) {
        // Search by exact or case-insensitive serviceNumber match
        const member = await MemberModel.findOne({
          serviceNumber: { $regex: new RegExp(`^${serviceNumber}$`, "i") },
        });

        if (member) {
          return NextResponse.json({
            success: true,
            member: {
              id: member._id.toString(),
              serviceNumber: member.serviceNumber,
              name: member.name,
              email: member.email,
              phone: member.phone,
              age: member.age,
              rank: member.rank,
              unit: member.unit,
              department: member.department,
              emergencyContact: member.emergencyContact,
              status: member.status,
              message: member.message,
              photoUrl: member.photoUrl,
              qrCodeUrl: member.qrCodeUrl,
              createdAt: member.createdAt,
            },
          });
        }
      }
    } catch (dbErr) {
      console.warn("MongoDB connection warning during member lookup:", dbErr);
    }

    return NextResponse.json(
      { success: false, error: "Member profile not found with the given Service Number." },
      { status: 404 }
    );
  } catch (error: any) {
    console.error("Error fetching member by service number:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
