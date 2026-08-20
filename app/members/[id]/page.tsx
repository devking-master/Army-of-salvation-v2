import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MemberProfileCard from "@/components/MemberProfileCard";
import SectionHeader from "@/components/SectionHeader";
import { connectToDatabase } from "@/lib/db";
import MemberModel from "@/models/Member";

export const dynamic = "force-dynamic";

async function getMemberData(id: string) {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const member = await MemberModel.findOne({
        $or: [
          { serviceNumber: { $regex: new RegExp(`^${id}$`, "i") } },
          { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null },
        ],
      });

      if (member) {
        return {
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
        };
      }
    }
  } catch (err) {
    console.warn("Error looking up member from DB:", err);
  }

  return null;
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const member = await getMemberData(params.id);
  return {
    title: member ? `${member.name} (${member.serviceNumber})` : "Member Dossier",
    description: "Official Army of Salvation digital member profile",
  };
}

export default async function MemberPage({
  params,
}: {
  params: { id: string };
}) {
  const member = await getMemberData(params.id);

  if (!member) {
    notFound();
  }

  return (
    <section className="section-pad min-h-screen bg-night bg-grid bg-[size:42px_42px] pt-28 sm:pt-32">
      <div className="container-pad">
        <SectionHeader
          title="Member Digital File"
          subtitle="Official authenticated identity file and verified QR digital barcode."
        />
        <MemberProfileCard member={member} />
      </div>
    </section>
  );
}
