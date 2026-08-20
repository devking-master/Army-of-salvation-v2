"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactInput } from "@/lib/validation";

export default function ContactForm() {
  const [ok, setOk] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORM_ACCESS_KEY;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(data: ContactInput) {
    setOk(false);
    setServerError(null);

    if (!accessKey) {
      setServerError("Web3Forms access key is missing.");
      return;
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: "New contact message from Army of Salvation",
        name: data.name,
        email: data.email,
        message: data.message,
      }),
    });

    const result = await response.json();

    if (!response.ok || result.success === false) {
      setServerError(result.message || "Unable to send message. Please try again.");
      return;
    }

    setOk(true);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="command-card w-full">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="label" htmlFor="contact-name">Name</label>
          <input id="contact-name" className="input-field" {...register("name")} />
          {errors.name && <p className="mt-2 text-xs text-red-300">{errors.name.message}</p>}
        </div>
        <div>
          <label className="label" htmlFor="contact-email">Email</label>
          <input id="contact-email" className="input-field" {...register("email")} />
          {errors.email && <p className="mt-2 text-xs text-red-300">{errors.email.message}</p>}
        </div>
      </div>
      <div className="mt-5">
        <label className="label" htmlFor="contact-message">Message</label>
        <textarea id="contact-message" className="input-field min-h-36 resize-y" {...register("message")} />
        {errors.message && <p className="mt-2 text-xs text-red-300">{errors.message.message}</p>}
      </div>
      <button disabled={isSubmitting} className="command-btn mt-5 disabled:cursor-not-allowed disabled:opacity-70">
        {isSubmitting ? "Sending..." : "Send Signal"}
      </button>
      {serverError && <p className="mt-4 text-sm text-red-300">{serverError}</p>}
      {ok && <p className="mt-4 text-sm text-emerald-300">Signal delivered successfully.</p>}
    </form>
  );
}
