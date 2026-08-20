"use client";

import { useState, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema, RegistrationInput } from "@/lib/validation";
import { Member } from "@/types";
import MemberProfileCard from "@/components/MemberProfileCard";
import { Upload, CheckCircle2, UserPlus, Image as ImageIcon } from "lucide-react";

export default function RegistrationForm() {
  const [createdMember, setCreatedMember] = useState<Member | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [photoBase64, setPhotoBase64] = useState<string | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegistrationInput>({ resolver: zodResolver(registrationSchema) });

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setServerError("Image size must be less than 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPhotoBase64(base64);
        setPhotoPreview(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  async function onSubmit(data: RegistrationInput) {
    setServerError(null);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          photo: photoBase64 || undefined,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setServerError(result.error || "Unable to submit registration. Please try again.");
        return;
      }

      setCreatedMember(result.member);
      reset();
      setPhotoBase64(null);
      setPhotoPreview(null);
    } catch (err: any) {
      setServerError("Network error. Unable to reach registration servers.");
    }
  }

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8">
      {createdMember ? (
        <div className="space-y-6">
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/40 p-5 text-center backdrop-blur-xl">
            <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-400" />
            <h2 className="mt-2 text-xl font-bold text-white sm:text-2xl">
              Registration Successful!
            </h2>
            <p className="mt-1 text-sm text-emerald-200">
              Your profile has been generated and saved to the central registry. Your unique Service Number and QR Code are ready below.
            </p>
            <button
              onClick={() => setCreatedMember(null)}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-500/20 px-4 py-2 text-xs font-bold text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 transition-colors"
            >
              <UserPlus size={14} /> Register Another Recruit
            </button>
          </div>

          <MemberProfileCard member={createdMember} />
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto w-full max-w-4xl rounded-2xl border border-cyan-300/20 bg-slate-950/60 p-4 shadow-command backdrop-blur-xl sm:p-6 lg:p-8"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="label" htmlFor="reg-name">Personal Name</label>
              <input id="reg-name" className="input-field" placeholder="Full Name" {...register("name")} />
              {errors.name && <p className="mt-2 text-xs text-red-300">{errors.name.message}</p>}
            </div>

            <div>
              <label className="label" htmlFor="reg-email">Signal Link (Email)</label>
              <input id="reg-email" className="input-field" placeholder="Email Address" {...register("email")} />
              {errors.email && <p className="mt-2 text-xs text-red-300">{errors.email.message}</p>}
            </div>

            <div>
              <label className="label" htmlFor="reg-phone">Phone Number</label>
              <input id="reg-phone" className="input-field" placeholder="Phone Number" {...register("phone")} />
              {errors.phone && <p className="mt-2 text-xs text-red-300">{errors.phone.message}</p>}
            </div>

            <div>
              <label className="label" htmlFor="reg-age">Age</label>
              <input id="reg-age" className="input-field" placeholder="Age" {...register("age")} />
              {errors.age && <p className="mt-2 text-xs text-red-300">{errors.age.message}</p>}
            </div>
          </div>

          {/* Profile Image Upload Field */}
          <div className="mt-5">
            <label className="label">Profile Passport / Photo (Optional)</label>
            <div className="mt-1 flex items-center gap-4">
              <label
                htmlFor="photo-upload"
                className="flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-cyan-400/40 bg-slate-900/80 px-4 py-3 text-xs font-semibold text-cyan-300 hover:border-cyan-400 hover:bg-slate-900 transition-colors"
              >
                <Upload size={16} /> Choose Image File
              </label>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />

              {photoPreview ? (
                <div className="flex items-center gap-2">
                  <img
                    src={photoPreview}
                    alt="Passport Preview"
                    className="h-10 w-10 rounded-lg object-cover border border-cyan-400/50"
                  />
                  <span className="text-xs text-emerald-400 font-medium">Photo attached</span>
                </div>
              ) : (
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <ImageIcon size={14} /> JPG, PNG or WEBP (Max 5MB)
                </span>
              )}
            </div>
          </div>

          <div className="mt-5">
            <label className="label" htmlFor="reg-message">Motivation Protocol</label>
            <textarea
              id="reg-message"
              className="input-field min-h-32 resize-y"
              placeholder="Why do you wish to join the Army of Salvation?"
              {...register("message")}
            />
            {errors.message && <p className="mt-2 text-xs text-red-300">{errors.message.message}</p>}
          </div>

          <button
            disabled={isSubmitting}
            type="submit"
            className="command-btn mt-6 w-full disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Generating Dossier & QR Code..." : "Establish Connection & Register"}
          </button>

          {serverError && (
            <p className="mt-4 rounded-xl border border-red-400/25 bg-red-400/10 p-3 text-center text-sm text-red-200">
              {serverError}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
