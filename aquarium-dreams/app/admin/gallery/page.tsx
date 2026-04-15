"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Image as ImageIcon, Plus, Trash2, Save } from "lucide-react";
import Image from "next/image";

const initialImages = [
  { id: 1, section: "Hero Background", url: "https://picsum.photos/seed/aquarium/1920/1080" },
  { id: 2, section: "Category: Live Fish", url: "https://picsum.photos/seed/livefish/400/300" },
  { id: 3, section: "Category: Fish Food", url: "https://picsum.photos/seed/fishfood/400/300" },
  { id: 4, section: "Category: Tanks & Equipment", url: "https://picsum.photos/seed/tank/400/300" },
];

export default function GalleryPage() {
  const [images, setImages] = useState(initialImages);
  const [newSection, setNewSection] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const handleAddImage = () => {
    if (!newSection || !newUrl) return;
    const newId = images.length > 0 ? Math.max(...images.map(img => img.id)) + 1 : 1;
    setImages([...images, { id: newId, section: newSection, url: newUrl }]);
    setNewSection("");
    setNewUrl("");
  };

  const handleDeleteImage = (id: number) => {
    setImages(images.filter(img => img.id !== id));
  };

  const handleUpdateUrl = (id: number, url: string) => {
    setImages(images.map(img => img.id === id ? { ...img, url } : img));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Storefront Images</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Card className="p-6">
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Add New Image Link</h2>
          <div className="flex items-end gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
            <div className="flex-1">
              <Label className="mb-2 block">Section / Placement</Label>
              <Input 
                placeholder="e.g., Homepage Banner" 
                value={newSection}
                onChange={(e) => setNewSection(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <Label className="mb-2 block">Image URL</Label>
              <Input 
                placeholder="https://example.com/image.jpg" 
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
              />
            </div>
            <Button onClick={handleAddImage} className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>
        </div>

        <h2 className="text-lg font-semibold text-slate-800 mb-4">Current Images</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {images.map((img) => (
            <div key={img.id} className="border border-slate-200 rounded-lg p-4 flex gap-4 bg-white">
              <div className="w-24 h-24 relative rounded-md overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                {img.url ? (
                  <Image src={img.url} alt={img.section} fill className="object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <ImageIcon className="w-8 h-8" />
                  </div>
                )}
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <Label className="text-slate-500 text-xs uppercase tracking-wider">{img.section}</Label>
                  <Input 
                    className="mt-1 h-8 text-sm" 
                    value={img.url} 
                    onChange={(e) => handleUpdateUrl(img.id, e.target.value)}
                  />
                </div>
                <div className="flex justify-end mt-2">
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleDeleteImage(img.id)}>
                    <Trash2 className="w-4 h-4 mr-1" />
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
