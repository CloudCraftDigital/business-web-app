"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

const productSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters"),
  price: z.string().regex(/^\$?\d+(\.\d{2})?$/, "Invalid price format (e.g., 3.99)"),
  category: z.string().min(1, "Please select a category"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  careInstructions: z.string().min(10, "Care instructions must be at least 10 characters"),
  inStock: z.boolean().default(true),
});

type ProductFormValues = z.infer<typeof productSchema>;

export default function AddProductPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "Neon Tetra",
      price: "3.99",
      category: "freshwater",
      description: "Description text or even for all reovit sonsitivite the care rooh and sales.",
      careInstructions: "Care Instructions and art Instructions.",
      inStock: true,
    }
  });

  const onSubmit = (data: ProductFormValues) => {
    console.log("Form submitted:", data);
    // Here you would typically save the data to your backend
    router.push("/admin/products");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/products" className="text-slate-500 hover:text-slate-900">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-slate-900">Add/Edit Product</h1>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div>
              <Label className="text-slate-700 font-medium mb-2 block">Product Name</Label>
              <Input {...register("name")} className="bg-slate-50" />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-slate-700 font-medium mb-2 block">Price</Label>
                <Input {...register("price")} className="bg-slate-50" />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
              </div>
              <div>
                <Label className="text-slate-700 font-medium mb-2 block">Category</Label>
                <Select 
                  value={watch("category")} 
                  onValueChange={(val) => setValue("category", val, { shouldValidate: true })}
                >
                  <SelectTrigger className="bg-slate-50">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="freshwater">Freshwater Fish</SelectItem>
                    <SelectItem value="saltwater">Saltwater Fish</SelectItem>
                    <SelectItem value="equipment">Equipment</SelectItem>
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
              </div>
            </div>

            <div>
              <Label className="text-slate-700 font-medium mb-2 block">Description</Label>
              <div className="border rounded-md overflow-hidden">
                <div className="bg-slate-50 border-b p-2 flex items-center gap-1 text-slate-500">
                  <Button type="button" variant="ghost" size="icon" className="h-8 w-8"><span className="font-bold">B</span></Button>
                  <Button type="button" variant="ghost" size="icon" className="h-8 w-8"><span className="italic">I</span></Button>
                  <Button type="button" variant="ghost" size="icon" className="h-8 w-8"><span className="underline">U</span></Button>
                  <div className="w-px h-4 bg-slate-300 mx-1"></div>
                  <Button type="button" variant="ghost" size="icon" className="h-8 w-8"><span>&lt;/&gt;</span></Button>
                </div>
                <Textarea 
                  {...register("description")}
                  className="border-0 focus-visible:ring-0 resize-none rounded-none min-h-[100px]" 
                />
              </div>
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
            </div>

            <div>
              <Label className="text-slate-700 font-medium mb-2 block">Care Instructions</Label>
              <Textarea 
                {...register("careInstructions")}
                className="bg-slate-50 min-h-[100px]" 
              />
              {errors.careInstructions && <p className="text-red-500 text-sm mt-1">{errors.careInstructions.message}</p>}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Label className="text-slate-700 font-medium">Availability</Label>
              <Switch 
                checked={watch("inStock")} 
                onCheckedChange={(val) => setValue("inStock", val)} 
              />
              <span className="text-sm text-slate-600">In Stock</span>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Save Product</Button>
              <Button type="button" variant="outline" onClick={() => router.push("/admin/products")}>
                Cancel
              </Button>
            </div>
          </div>

          <div>
            <Label className="text-slate-700 font-medium mb-2 block">Product Image</Label>
            <div className="flex gap-4">
              <div className="w-32 h-32 border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center text-slate-500 bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors">
                <Upload className="w-6 h-6 mb-2" />
                <span className="text-xs text-center px-2">Drag and drop<br/>image here</span>
              </div>
              <div className="w-32 h-32 rounded-lg overflow-hidden border border-slate-200 relative">
                <Image src="https://picsum.photos/seed/neontetra/200/200" alt="Neon Tetra" fill className="object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}
