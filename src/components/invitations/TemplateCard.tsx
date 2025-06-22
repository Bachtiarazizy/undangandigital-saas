"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, Eye, Check } from "lucide-react";
import { Template } from "@/types";

interface TemplateCardProps {
  template: Template;
  isSelected: boolean;
  onSelect: (templateId: string) => void;
  onPreview: (templateId: string) => void;
  userRole: "FREE" | "PREMIUM";
}

export default function TemplateCard({ template, isSelected, onSelect, onPreview, userRole }: TemplateCardProps) {
  const [imageError, setImageError] = useState(false);
  const canUse = !template.isPremium || userRole === "PREMIUM";

  return (
    <Card className={`relative overflow-hidden transition-all duration-200 hover:shadow-lg ${isSelected ? "ring-2 ring-pink-500 shadow-lg" : ""} ${!canUse ? "opacity-60" : ""}`}>
      {template.isPremium && (
        <div className="absolute top-2 right-2 z-10">
          <div className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
            <Crown className="h-3 w-3 mr-1" />
            Premium
          </div>
        </div>
      )}

      {isSelected && (
        <div className="absolute top-2 left-2 z-10">
          <div className="bg-pink-500 text-white rounded-full p-1">
            <Check className="h-4 w-4" />
          </div>
        </div>
      )}

      <div className="aspect-[3/4] relative bg-gray-100">
        {!imageError ? (
          <Image src={template.thumbnail} alt={template.name} fill className="object-cover" onError={() => setImageError(true)} />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100">
            <div className="text-center">
              <div className="text-4xl mb-2">💕</div>
              <div className="text-sm text-gray-600">{template.name}</div>
            </div>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1">{template.name}</h3>
        <p className="text-sm text-gray-600 mb-3">{template.description}</p>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => onPreview(template.id)} className="flex-1">
            <Eye className="h-4 w-4 mr-1" />
            Preview
          </Button>

          {canUse ? (
            <Button size="sm" onClick={() => onSelect(template.id)} className={`flex-1 ${isSelected ? "bg-pink-500 hover:bg-pink-600" : "bg-gray-900 hover:bg-gray-800"}`}>
              {isSelected ? "Terpilih" : "Pilih"}
            </Button>
          ) : (
            <Button size="sm" disabled className="flex-1">
              <Crown className="h-4 w-4 mr-1" />
              Premium
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
