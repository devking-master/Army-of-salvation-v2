"use client";

import { useState } from "react";
import { Member } from "@/types";
import { BadgeCheck, Phone, Shield, Copy, Check, Download, QrCode } from "lucide-react";

export default function MemberProfileCard({ member }: { member: Member }) {
  const [copied, setCopied] = useState(false);

  const profileUrl = typeof window !== "undefined"
    ? `${window.location.origin}/members/${member.serviceNumber || member.id}`
    : `/members/${member.serviceNumber || member.id}`;

  const copyServiceNumber = () => {
    if (member.serviceNumber) {
      navigator.clipboard.writeText(member.serviceNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl rounded-3xl border border-cyan-400/30 bg-gradient-to-br from-slate-950 via-slate-900 to-black p-5 shadow-2xl backdrop-blur-xl sm:p-8">
      {/* Header Banner */}
      <div className="mb-6 flex flex-wrap items-center justify-between border-b border-cyan-500/20 pb-4">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-cyan-400" />
          <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-400 sm:text-sm">
            Army of Salvation • Official Dossier
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/30">
            ● {member.status || "Active Recruit"}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        {/* Profile Avatar / Photo */}
        <div className="relative shrink-0 self-center md:self-start">
          {member.photoUrl ? (
            <img
              src={member.photoUrl}
              alt={member.name}
              className="h-36 w-36 rounded-2xl border-2 border-cyan-400/40 object-cover shadow-lg sm:h-44 sm:w-44"
            />
          ) : (
            <div className="grid h-36 w-36 shrink-0 place-items-center rounded-2xl border-2 border-cyan-400/30 bg-cyan-950/40 text-5xl font-black text-cyan-400 shadow-lg sm:h-44 sm:w-44 sm:text-6xl">
              {member.name ? member.name.charAt(0).toUpperCase() : "A"}
            </div>
          )}
        </div>

        {/* Member Details */}
        <div className="min-w-0 flex-1 text-center md:text-left">
          {/* Unique Service Number Badge */}
          <div className="inline-flex flex-wrap items-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-950/60 px-3 py-1.5 text-xs font-mono text-cyan-300">
            <span>SERVICE NO:</span>
            <span className="font-bold text-white tracking-wider">{member.serviceNumber || member.id}</span>
            <button
              onClick={copyServiceNumber}
              className="ml-1 p-1 hover:text-cyan-200 transition-colors"
              title="Copy Service Number"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 text-cyan-400" />}
            </button>
          </div>

          <h1 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl break-words">
            {member.name}
          </h1>
          <p className="mt-1 text-sm font-medium text-cyan-400/90 sm:text-base">
            {member.rank || "Recruit"} • {member.unit || "1st Salvation Battalion"}
          </p>

          <div className="mt-6 grid gap-3 text-left text-xs sm:text-sm text-slate-300 sm:grid-cols-2">
            <div className="rounded-lg bg-slate-900/60 p-2.5 border border-slate-800">
              <span className="block text-slate-400 text-[10px] uppercase tracking-wider font-semibold">Department</span>
              <span className="font-semibold text-white">{member.department || "General Operations"}</span>
            </div>
            <div className="rounded-lg bg-slate-900/60 p-2.5 border border-slate-800">
              <span className="block text-slate-400 text-[10px] uppercase tracking-wider font-semibold">Contact Signal</span>
              <span className="font-semibold text-white flex items-center gap-1.5 mt-0.5">
                <Phone size={14} className="text-cyan-400" /> {member.phone}
              </span>
            </div>
            {member.email && (
              <div className="rounded-lg bg-slate-900/60 p-2.5 border border-slate-800">
                <span className="block text-slate-400 text-[10px] uppercase tracking-wider font-semibold">Email Link</span>
                <span className="font-semibold text-white truncate block">{member.email}</span>
              </div>
            )}
            <div className="rounded-lg bg-slate-900/60 p-2.5 border border-slate-800">
              <span className="block text-slate-400 text-[10px] uppercase tracking-wider font-semibold">Emergency Dispatch</span>
              <span className="font-semibold text-white">{member.emergencyContact || "Command HQ"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Section */}
      <div className="mt-8 rounded-2xl border border-cyan-400/25 bg-slate-950/80 p-5 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="flex items-center justify-center sm:justify-start gap-2 text-sm font-black uppercase text-white tracking-wider">
              <BadgeCheck className="text-cyan-400" /> Unique Profile QR Code
            </p>
            <p className="mt-1 text-xs text-slate-400 max-w-sm">
              Scan this digital barcode to instantly verify credentials or view this profile on mobile.
            </p>
            <code className="mt-3 block overflow-x-auto rounded-lg bg-black/60 p-2.5 text-[11px] font-mono text-cyan-400 border border-cyan-900/50">
              {profileUrl}
            </code>
          </div>

          {member.qrCodeUrl && (
            <div className="flex flex-col items-center shrink-0">
              <div className="p-2 bg-slate-900 border border-cyan-500/30 rounded-xl shadow-lg">
                <img
                  src={member.qrCodeUrl}
                  alt="Member Profile QR Code"
                  className="h-28 w-28 rounded-lg object-contain"
                />
              </div>
              <a
                href={member.qrCodeUrl}
                download={`${member.serviceNumber || "member"}-qrcode.png`}
                className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-400 hover:text-cyan-200 transition-colors"
              >
                <Download size={12} /> Save QR Code
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
