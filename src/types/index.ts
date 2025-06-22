import { Role } from "@/generated/prisma";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
    } & DefaultSession["user"];
  }

  interface User {
    role: Role;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: Role;
  }
}

export interface User {
  id: string;
  name?: string | null;
  email: string;
  emailVerified?: Date | null;
  image?: string | null;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export interface Invitation {
  id: string;
  userId: string;
  slug: string;
  title: string;
  templateId: string;
  eventDate: Date;
  eventTime: string;
  location: string;
  googleMapsUrl?: string | null;
  description?: string | null;
  musicUrl?: string | null;
  loveStory?: LoveStoryEntry[] | null;
  digitalGift?: DigitalGift | null;
  galleryImages?: string[] | null;
  enableRsvp: boolean;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
  rsvps?: RSVP[];
  guestMessages?: GuestMessage[];
}

export interface RSVP {
  id: string;
  invitationId: string;
  guestName: string;
  attendance: boolean;
  numberOfGuests?: number | null;
  message?: string | null;
  createdAt: Date;
}

export interface GuestMessage {
  id: string;
  invitationId: string;
  senderName: string;
  message: string;
  createdAt: Date;
}

export interface LoveStoryEntry {
  id: string;
  date: string;
  title: string;
  description: string;
  image?: string;
}

export interface DigitalGift {
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
  qrisImage?: string;
  qrisText?: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  isPremium: boolean;
}
