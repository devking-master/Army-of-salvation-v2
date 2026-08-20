"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { serviceNumberLookupSchema, ServiceNumberLookupInput } from "@/lib/validation";
import { Member } from "@/types";
import MemberProfileCard from "@/components/MemberProfileCard";
import { Search, ShieldAlert, ArrowLeft } from "lucide-react";

export default function ServiceNumberLookup() {
  const [member, setMember] = useState<Member | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ServiceNumberLookupInput>({
    resolver: zodResolver(serviceNumberLookupSchema),
  });

  async function onSubmit(data: ServiceNumberLookupInput) {
    setErrorMsg(null);
    setMember(null);

    try {
      const response = await fetch(`/api/members/${encodeURIComponent(data.serviceNumber.trim())}`);
      const result = await response.json();

      if (!response.ok || !result.success) {
        setErrorMsg(result.error || "No member found matching this Service Number.");
        return;
      }

      setMember(result.member);
    } catch (err: any) {
      setErrorMsg("Failed to connect to network. Please check your signal and try again.");
    }
  }

  return (
    <div className="mx-auto w-full max-w-4xl">
      {member ? (
        <div className="space-y-6">
          <div className="flex justify-start">
            <button
              onClick={() => setMember(null)}
              className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-slate-900/80 px-4 py-2 text-xs font-semibold text-cyan-400 hover:bg-cyan-950 transition-colors"
            >
              <ArrowLeft size={14} /> Search Another Service Number
            </button>
          </div>
          <MemberProfileCard member={member} />
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto w-full max-w-2xl rounded-2xl border border-cyan-400/20 bg-slate-950/70 p-6 shadow-command backdrop-blur-xl sm:p-8"
        >
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-400">
              <Search className="h-6 w-6" />
            </div>
            <h2 className="mt-4 text-xl font-bold text-white sm:text-2xl">
              Existing Member Profile Lookup
            </h2>
            <p className="mt-1 text-xs text-slate-400 sm:text-sm">
              Enter your assigned Service Number (e.g., <code className="text-cyan-300 font-mono">AOS-2026-1234</code>) to view your official dossier & QR code.
            </p>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <label className="label" htmlFor="lookup-service-number">
                Service Number
              </label>
              <div className="relative mt-1">
                <input
                  id="lookup-service-number"
                  className="input-field font-mono uppercase tracking-wider pl-4"
                  placeholder="e.g. AOS-2026-1234"
                  {...register("serviceNumber")}
                />
              </div>
              {errors.serviceNumber && (
                <p className="mt-2 text-xs text-red-400">{errors.serviceNumber.message}</p>
              )}
            </div>

            <button
              disabled={isSubmitting}
              type="submit"
              className="command-btn w-full disabled:cursor-not-allowed disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                "Searching Central Registry..."
              ) : (
                <>
                  <Search size={16} /> Locate Member Profile
                </>
              )}
            </button>
          </div>

          {errorMsg && (
            <div className="mt-5 flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-950/40 p-4 text-xs text-red-300 sm:text-sm">
              <ShieldAlert className="h-5 w-5 shrink-0 text-red-400" />
              <div>
                <p className="font-semibold text-red-200">Record Not Found</p>
                <p className="mt-0.5">{errorMsg}</p>
              </div>
            </div>
          )}
        </form>
      )}
    </div>
  );
}
