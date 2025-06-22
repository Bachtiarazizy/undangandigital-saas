"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Calendar, Users, MessageSquare, Crown, BarChart3, ExternalLink, Edit, Trash2 } from "lucide-react";

interface Invitation {
  id: string;
  title: string;
  slug: string;
  eventDate: string;
  createdAt: string;
  _count: {
    rsvps: number;
    guestMessages: number;
  };
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchInvitations();
    }
  }, [session]);

  const fetchInvitations = async () => {
    try {
      const response = await fetch("/api/invitations");
      if (response.ok) {
        const data = await response.json();
        setInvitations(data);
      }
    } catch (error) {
      console.error("Error fetching invitations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat dashboard...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const isPremium = session.user.role === "PREMIUM";
  const totalRSVPs = invitations.reduce((sum, inv) => sum + inv._count.rsvps, 0);
  const totalMessages = invitations.reduce((sum, inv) => sum + inv._count.guestMessages, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-600">
                Selamat datang, {session.user.name || session.user.email}
                {isPremium && (
                  <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                    <Crown className="h-3 w-3 mr-1" />
                    Premium
                  </span>
                )}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {!isPremium && (
                <Link href="/upgrade">
                  <Button className="bg-yellow-500 hover:bg-yellow-600">
                    <Crown className="h-4 w-4 mr-2" />
                    Upgrade Premium
                  </Button>
                </Link>
              )}
              <Link href="/invitations/create">
                <Button className="bg-pink-500 hover:bg-pink-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Buat Undangan
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-pink-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Undangan</p>
                  <p className="text-2xl font-bold text-gray-900">{invitations.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total RSVP</p>
                  <p className="text-2xl font-bold text-gray-900">{totalRSVPs}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <MessageSquare className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Ucapan</p>
                  <p className="text-2xl font-bold text-gray-900">{totalMessages}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <BarChart3 className="h-8 w-8 text-purple-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Status</p>
                  <p className="text-lg font-bold text-gray-900">{isPremium ? "Premium" : "Free"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Invitations List */}
        <Card>
          <CardHeader>
            <CardTitle>Undangan Anda</CardTitle>
            <CardDescription>Kelola semua undangan digital yang telah Anda buat</CardDescription>
          </CardHeader>
          <CardContent>
            {invitations.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada undangan</h3>
                <p className="text-gray-600 mb-6">Mulai membuat undangan digital pertama Anda</p>
                <Link href="/invitations/create">
                  <Button className="bg-pink-500 hover:bg-pink-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Buat Undangan Pertama
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {invitations.map((invitation) => (
                  <div key={invitation.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{invitation.title}</h3>
                        <p className="text-sm text-gray-600">undangandigital.com/{invitation.slug}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <span>Acara: {new Date(invitation.eventDate).toLocaleDateString("id-ID")}</span>
                          <span>•</span>
                          <span>{invitation._count.rsvps} RSVP</span>
                          <span>•</span>
                          <span>{invitation._count.guestMessages} Ucapan</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Link href={`/invitations/${invitation.slug}`} target="_blank">
                          <Button variant="outline" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href={`/invitations/${invitation.id}/edit`}>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
