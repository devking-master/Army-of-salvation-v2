"use client";

import { useState } from "react";
import RegistrationForm from "@/components/RegistrationForm";
import ServiceNumberLookup from "@/components/ServiceNumberLookup";
import { UserPlus, Search } from "lucide-react";

export default function JoinPageTabs() {
  const [activeTab, setActiveTab] = useState<"register" | "lookup">("register");

  return (
    <div className="space-y-8">
      {/* Navigation Tabs */}
      <div className="flex justify-center">
        <div className="inline-flex rounded-2xl border border-cyan-400/20 bg-slate-950/80 p-1.5 backdrop-blur-xl">
          <button
            onClick={() => setActiveTab("register")}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition-all sm:text-sm ${
              activeTab === "register"
                ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <UserPlus size={16} /> New Recruit Registration
          </button>
          <button
            onClick={() => setActiveTab("lookup")}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition-all sm:text-sm ${
              activeTab === "lookup"
                ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Search size={16} /> Existing Member Profile
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      {activeTab === "register" ? <RegistrationForm /> : <ServiceNumberLookup />}
    </div>
  );
}
