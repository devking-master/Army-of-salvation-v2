import { z } from "zod";

export const registrationSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(7, "Phone number is required"),
  age: z.string().min(1, "Age is required"),
  message: z.string().min(10, "Tell us why you want to join"),
  photo: z.string().optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  message: z.string().min(10, "Message is too short"),
});

export const serviceNumberLookupSchema = z.object({
  serviceNumber: z
    .string()
    .min(3, "Please enter a valid Service Number (e.g. AOS-2026-1234)"),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type ServiceNumberLookupInput = z.infer<typeof serviceNumberLookupSchema>;
