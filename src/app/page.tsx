import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, Calendar, MapPin, Camera, Music, Gift, Download, Share2, Crown } from "lucide-react";
import { FREE_FEATURES, PREMIUM_FEATURES } from "@/lib/constants";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Buat Undangan Digital
            <span className="text-pink-500"> Impian Anda</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">Platform terlengkap untuk membuat undangan digital yang memukau. Dengan fitur RSVP, galeri foto, musik latar, dan banyak lagi.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3">
                Buat Undangan Gratis
              </Button>
            </Link>
            <Link href="/templates">
              <Button variant="outline" size="lg" className="px-8 py-3">
                Lihat Template
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Fitur Lengkap untuk Undangan Sempurna</h2>
            <p className="text-xl text-gray-600">Semua yang Anda butuhkan untuk membuat undangan digital yang berkesan</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Template Cantik",
                description: "Pilihan template elegan dan modern yang dapat disesuaikan",
              },
              {
                icon: Users,
                title: "RSVP Online",
                description: "Tamu dapat konfirmasi kehadiran langsung dari undangan",
              },
              {
                icon: Camera,
                title: "Galeri Foto",
                description: "Tampilkan foto-foto indah pasangan atau momen spesial",
              },
              {
                icon: Calendar,
                title: "Countdown Timer",
                description: "Hitung mundur menuju hari bahagia Anda",
              },
              {
                icon: MapPin,
                title: "Google Maps",
                description: "Integrasi lokasi dengan Google Maps untuk kemudahan tamu",
              },
              {
                icon: Music,
                title: "Musik Latar",
                description: "Tambahkan musik favorit untuk suasana yang sempurna",
              },
              {
                icon: Gift,
                title: "Kado Digital",
                description: "Terima kado melalui transfer bank atau QRIS",
              },
              {
                icon: Download,
                title: "Export Data",
                description: "Download daftar RSVP dan ucapan dalam format PDF/Excel",
              },
              {
                icon: Share2,
                title: "Share Unlimited",
                description: "Bagikan undangan tanpa batas ke media sosial",
              },
            ].map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-pink-500 mx-auto mb-4" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Pilih Paket yang Tepat</h2>
            <p className="text-xl text-gray-600">Mulai gratis atau upgrade ke Premium untuk fitur lengkap</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <Card className="relative">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Gratis</CardTitle>
                <div className="text-4xl font-bold text-gray-900 mt-4">
                  Rp 0<span className="text-lg font-normal text-gray-600">/bulan</span>
                </div>
                <CardDescription>Sempurna untuk memulai membuat undangan digital</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {FREE_FEATURES.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Heart className="h-5 w-5 text-pink-500 mr-3" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/register" className="block mt-8">
                  <Button className="w-full" variant="outline">
                    Mulai Gratis
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Premium Plan */}
            <Card className="relative border-pink-200 shadow-lg">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-pink-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                  <Crown className="h-4 w-4 mr-1" />
                  Terpopuler
                </span>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Premium</CardTitle>
                <div className="text-4xl font-bold text-gray-900 mt-4">
                  Rp 99K<span className="text-lg font-normal text-gray-600">/bulan</span>
                </div>
                <CardDescription>Fitur lengkap untuk undangan yang tak terlupakan</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {PREMIUM_FEATURES.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Crown className="h-5 w-5 text-pink-500 mr-3" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/register" className="block mt-8">
                  <Button className="w-full bg-pink-500 hover:bg-pink-600">Upgrade ke Premium</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-pink-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Siap Membuat Undangan Digital Impian?</h2>
          <p className="text-xl text-pink-100 mb-8">Bergabung dengan ribuan pasangan yang telah mempercayai platform kami</p>
          <Link href="/register">
            <Button size="lg" className="bg-white text-pink-500 hover:bg-gray-100 px-8 py-3">
              Mulai Sekarang - Gratis!
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
