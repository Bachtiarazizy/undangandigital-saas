import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";
import prisma from "@/lib/db";

const createInvitationSchema = z.object({
  title: z.string().min(1, "Judul undangan harus diisi"),
  slug: z
    .string()
    .min(1, "Slug harus diisi")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug hanya boleh mengandung huruf kecil, angka, dan tanda hubung"),
  templateId: z.string().min(1, "Template harus dipilih"),
  eventDate: z.string().min(1, "Tanggal acara harus diisi"),
  eventTime: z.string().min(1, "Waktu acara harus diisi"),
  location: z.string().min(1, "Lokasi acara harus diisi"),
  googleMapsUrl: z.string().optional(),
  description: z.string().optional(),
  musicUrl: z.string().optional(),
  loveStory: z
    .array(
      z.object({
        id: z.string(),
        date: z.string(),
        title: z.string(),
        description: z.string(),
        image: z.string().optional(),
      })
    )
    .optional(),
  digitalGift: z
    .object({
      bankName: z.string().optional(),
      accountNumber: z.string().optional(),
      accountName: z.string().optional(),
      qrisImage: z.string().optional(),
      qrisText: z.string().optional(),
    })
    .optional(),
  galleryImages: z.array(z.string()).optional(),
  enableRsvp: z.boolean().default(true),
});

// GET /api/invitations - Get user's invitations
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const invitations = await prisma.invitation.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        _count: {
          select: {
            rsvps: true,
            guestMessages: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(invitations);
  } catch (error) {
    console.error("Error fetching invitations:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/invitations - Create new invitation
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = createInvitationSchema.parse(body);

    // Check if slug is already taken
    const existingInvitation = await prisma.invitation.findUnique({
      where: { slug: validatedData.slug },
    });

    if (existingInvitation) {
      return NextResponse.json({ error: "Slug sudah digunakan, silakan pilih yang lain" }, { status: 400 });
    }

    // Check user limits for free users
    if (session.user.role === "FREE") {
      const userInvitationsCount = await prisma.invitation.count({
        where: { userId: session.user.id },
      });

      if (userInvitationsCount >= 3) {
        return NextResponse.json({ error: "Pengguna gratis hanya dapat membuat maksimal 3 undangan. Upgrade ke Premium untuk unlimited undangan." }, { status: 403 });
      }

      // Check premium features for free users
      if (validatedData.musicUrl || (validatedData.loveStory && validatedData.loveStory.length > 0) || validatedData.digitalGift || (validatedData.galleryImages && validatedData.galleryImages.length > 5)) {
        return NextResponse.json({ error: "Fitur ini hanya tersedia untuk pengguna Premium" }, { status: 403 });
      }
    }

    const invitation = await prisma.invitation.create({
      data: {
        ...validatedData,
        userId: session.user.id,
        eventDate: new Date(validatedData.eventDate),
        loveStory: validatedData.loveStory || [],
        digitalGift: validatedData.digitalGift || {},
        galleryImages: validatedData.galleryImages || [],
      },
    });

    return NextResponse.json(invitation, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }

    console.error("Error creating invitation:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
