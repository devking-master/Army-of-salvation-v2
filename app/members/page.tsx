"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import { Member } from "@/types";
import { Search, Shield, ArrowRight, UserCheck, QrCode } from "lucide-react";

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [rankFilter, setRankFilter] = useState("all");

  useEffect(() => {
    async function fetchMembers() {
      try {
        const response = await fetch("/api/members");
        const data = await response.json();
        if (data.success && Array.isArray(data.members)) {
          setMembers(data.members);
        }
      } catch (err) {
        console.error("Failed to load members roster:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMembers();
  }, []);

  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.serviceNumber && m.serviceNumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (m.unit && m.unit.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (m.department && m.department.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesRank =
      rankFilter === "all" || (m.rank && m.rank.toLowerCase() === rankFilter.toLowerCase());

    return matchesSearch && matchesRank;
  });

  const uniqueRanks = Array.from(
    new Set(members.map((m) => m.rank).filter(Boolean))
  );

  return (
    <section className="section-pad min-h-screen bg-night bg-grid bg-[size:42px_42px] pt-28 sm:pt-32">
      <div className="container-pad space-y-8">
        <SectionHeader
          title="Personnel Directory & Roster"
          subtitle="Explore official member dossiers, active recruits, squad leaders, and QR digital credentials."
        />

        {/* Search & Filter Controls */}
        <div className="mx-auto flex flex-col gap-4 max-w-4xl sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-400" />
            <input
              type="text"
              placeholder="Search member by name, service number, unit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setRankFilter("all")}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all shrink-0 ${
                rankFilter === "all"
                  ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20"
                  : "border border-cyan-400/20 bg-slate-950/80 text-slate-300 hover:text-white"
              }`}
            >
              All Personnel
            </button>
            {uniqueRanks.map((rank) => (
              <button
                key={rank}
                onClick={() => setRankFilter(rank)}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all shrink-0 ${
                  rankFilter.toLowerCase() === rank.toLowerCase()
                    ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20"
                    : "border border-cyan-400/20 bg-slate-950/80 text-slate-300 hover:text-white"
                }`}
              >
                {rank}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="h-56 animate-pulse rounded-2xl border border-cyan-400/10 bg-slate-950/50 p-6"
              />
            ))}
          </div>
        ) : filteredMembers.length === 0 ? (
          <div className="mx-auto max-w-md rounded-2xl border border-cyan-400/20 bg-slate-950/60 p-8 text-center backdrop-blur-xl">
            <Shield className="mx-auto h-12 w-12 text-slate-500" />
            <h3 className="mt-4 text-lg font-bold text-white">No Members Found</h3>
            <p className="mt-1 text-xs text-slate-400">
              No personnel match your search query "{searchQuery}". Try searching by Service Number or Full Name.
            </p>
          </div>
        ) : (
          /* Members Grid */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredMembers.map((m) => (
              <div
                key={m.serviceNumber || m.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-cyan-400/20 bg-gradient-to-b from-slate-950 to-slate-900/90 p-5 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/50 hover:shadow-cyan-500/10"
              >
                <div className="space-y-4">
                  {/* Top Bar: Service Number + Status */}
                  <div className="flex items-center justify-between border-b border-cyan-500/10 pb-3">
                    <span className="font-mono text-xs font-semibold text-cyan-300">
                      {m.serviceNumber || m.id}
                    </span>
                    <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400 border border-emerald-500/30">
                      {m.status || "Active"}
                    </span>
                  </div>

                  {/* Profile Header */}
                  <div className="flex items-center gap-4">
                    {m.photoUrl ? (
                      <img
                        src={m.photoUrl}
                        alt={m.name}
                        className="h-16 w-16 rounded-xl border border-cyan-400/30 object-cover"
                      />
                    ) : (
                      <div className="grid h-16 w-16 shrink-0 place-items-center rounded-xl border border-cyan-400/30 bg-cyan-950/60 text-2xl font-black text-cyan-400">
                        {m.name.charAt(0).toUpperCase()}
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <h2 className="truncate text-base font-bold text-white group-hover:text-cyan-200 transition-colors">
                        {m.name}
                      </h2>
                      <p className="text-xs text-cyan-400 font-medium mt-0.5">
                        {m.rank || "Recruit"}
                      </p>
                      <p className="truncate text-[11px] text-slate-400 mt-0.5">
                        {m.unit || "1st Salvation Battalion"}
                      </p>
                    </div>
                  </div>

                  {/* Department & Emergency Details */}
                  <div className="rounded-xl bg-black/40 p-3 text-xs space-y-1 text-slate-300 border border-slate-800">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Department:</span>
                      <span className="font-medium text-white">{m.department || "General"}</span>
                    </div>
                    {m.phone && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">Signal:</span>
                        <span className="font-medium text-cyan-300">{m.phone}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* View Profile Action Link */}
                <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <QrCode size={12} className="text-cyan-400" /> Dynamic Barcode
                  </span>
                  <Link
                    href={`/members/${m.serviceNumber || m.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-200 transition-colors group-hover:translate-x-1 duration-200"
                  >
                    View Dossier <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Join Prompt Banner */}
        <div className="mt-12 rounded-3xl border border-cyan-400/30 bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950 p-6 text-center shadow-2xl sm:p-8">
          <UserCheck className="mx-auto h-10 w-10 text-cyan-400" />
          <h3 className="mt-3 text-xl font-extrabold text-white sm:text-2xl">
            Want to join the Army of Salvation Roster?
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-xs text-slate-300 sm:text-sm">
            Register your recruitment details now to receive your official Service Number and unique QR profile badge.
          </p>
          <Link
            href="/join"
            className="command-btn mt-5 inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold uppercase tracking-wider"
          >
            Register Now & Get QR Code <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
