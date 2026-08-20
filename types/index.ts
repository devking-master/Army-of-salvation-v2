export type Activity = { title: string; description: string; icon: string };
export type EventItem = { id: string; title: string; date: string; location: string; description: string };
export type Leader = { name: string; role?: string; quote: string };
export type GalleryItem = { title: string; category: string; image: string };

export type Member = {
  id?: string;
  serviceNumber: string;
  name: string;
  email?: string;
  phone: string;
  age?: string;
  rank: string;
  unit: string;
  department: string;
  emergencyContact: string;
  status: string;
  message?: string;
  photoUrl?: string;
  qrCodeUrl?: string;
  createdAt?: string | Date;
};
