import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import MemberModel from "@/models/Member";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { generateQRCodeDataUrl, generateServiceNumber } from "@/lib/qrcode";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, age, message, photo } = body;

    if (!name || !email || !phone || !age) {
      return NextResponse.json(
        { success: false, error: "Missing required registration fields" },
        { status: 400 }
      );
    }

    const serviceNumber = generateServiceNumber();
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const profileUrl = `${appUrl}/members/${serviceNumber}`;

    // Generate QR Code Data URL
    const qrCodeDataUrl = await generateQRCodeDataUrl(profileUrl);

    // Default photo URL to user provided photo (base64) if present
    let finalPhotoUrl = photo || "";

    // Attempt Cloudinary Upload for Photo if available
    if (photo && photo.startsWith("data:image")) {
      const uploadedPhoto = await uploadImageToCloudinary(photo, "army_of_salvation/avatars");
      if (uploadedPhoto) {
        finalPhotoUrl = uploadedPhoto;
      }
    }

    // Default QR Code URL to generated Data URL
    let finalQrCodeUrl = qrCodeDataUrl;
    if (qrCodeDataUrl) {
      const uploadedQr = await uploadImageToCloudinary(qrCodeDataUrl, "army_of_salvation/qrcodes");
      if (uploadedQr) {
        finalQrCodeUrl = uploadedQr;
      }
    }

    // Connect to MongoDB & Save Member
    let dbConnected = false;
    let savedMember = null;
    let dbErrorMessage = "";

    try {
      const conn = await connectToDatabase();
      if (conn) {
        dbConnected = true;
        
        // Ensure service number is unique
        let uniqueServiceNumber = serviceNumber;
        let exists = await MemberModel.findOne({ serviceNumber: uniqueServiceNumber });
        while (exists) {
          uniqueServiceNumber = generateServiceNumber();
          exists = await MemberModel.findOne({ serviceNumber: uniqueServiceNumber });
        }

        const newMember = new MemberModel({
          serviceNumber: uniqueServiceNumber,
          name,
          email,
          phone,
          age,
          message,
          photoUrl: finalPhotoUrl,
          qrCodeUrl: finalQrCodeUrl,
        });

        savedMember = await newMember.save();
        console.log("Successfully saved member to MongoDB:", savedMember.serviceNumber);
      } else {
        dbErrorMessage = "MongoDB connection string (MONGODB_URI) is missing or empty in .env file.";
      }
    } catch (dbErr: any) {
      console.error("MongoDB Save Error:", dbErr);
      dbErrorMessage = dbErr.message || "Failed to save record to MongoDB.";
    }

    // If MongoDB save failed, respond with error so user is notified immediately
    if (!savedMember) {
      return NextResponse.json(
        {
          success: false,
          error: `Database registration failed: ${dbErrorMessage || "Could not connect to database"}. Please check your MONGODB_URI in .env`,
        },
        { status: 500 }
      );
    }

    const memberData = {
      id: savedMember._id.toString(),
      serviceNumber: savedMember.serviceNumber,
      name: savedMember.name,
      email: savedMember.email,
      phone: savedMember.phone,
      age: savedMember.age,
      rank: savedMember.rank,
      unit: savedMember.unit,
      department: savedMember.department,
      emergencyContact: savedMember.emergencyContact,
      status: savedMember.status,
      message: savedMember.message,
      photoUrl: savedMember.photoUrl,
      qrCodeUrl: savedMember.qrCodeUrl,
      createdAt: savedMember.createdAt,
    };

    return NextResponse.json({
      success: true,
      dbSaved: dbConnected,
      member: memberData,
    });
  } catch (error: any) {
    console.error("Error in registration endpoint:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Server registration error" },
      { status: 500 }
    );
  }
}
