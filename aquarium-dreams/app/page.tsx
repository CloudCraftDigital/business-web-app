import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Fish, Package, Droplets, Twitter, Facebook, Instagram, MessageCircle, Box, Wrench, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: 'url("https://picsum.photos/seed/aquarium/1920/1080")' }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Header (Glassmorphism) */}
        <header className="absolute top-0 left-0 right-0 z-20 px-8 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3">
            <a href="/" className="flex items-center gap-2 text-white font-bold text-xl hover:text-white/90 transition-colors">
              <Fish className="w-6 h-6" />
              <span>Aquarium Dreams</span>
            </a>
            <nav className="hidden md:flex items-center gap-8 text-white/90 font-medium text-sm">
              <Link href="#" className="hover:text-white transition-colors border-b-2 border-white pb-1">Home</Link>
              <Link href="#" className="hover:text-white transition-colors">Shop</Link>
              <Link href="#" className="hover:text-white transition-colors">Services</Link>
              <Link href="#" className="hover:text-white transition-colors">Contact</Link>
              <Link href="/admin" className="hover:text-white transition-colors text-blue-200">Admin</Link>
            </nav>
            <div className="flex items-center gap-4">
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="text-white hover:text-green-400 transition-colors" title="Contact on WhatsApp">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
              </a>
              <button className="text-white hover:text-white/80 transition-colors">
                <ShoppingCart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white max-w-3xl px-4 mt-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Bring Your Aquarium<br/>Dreams to Life
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 font-medium">
            Premium fish, custom tanks, and expert care.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button className="bg-teal-500 hover:bg-teal-600 text-white rounded-full px-8 py-6 text-lg font-medium border-0">
              Shop Now
            </Button>
            <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 rounded-full px-8 py-6 text-lg font-medium backdrop-blur-sm">
              Book Service
            </Button>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8 text-slate-900">Category Grid</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CategoryCard 
            title="Livestock" 
            icon={<Fish className="w-8 h-8 mb-4 text-white" />} 
            image="https://picsum.photos/seed/livefish/400/300" 
          />
          <CategoryCard 
            title="Equipment" 
            icon={<Wrench className="w-8 h-8 mb-4 text-white" />} 
            image="https://picsum.photos/seed/tank/400/300" 
          />
          <CategoryCard 
            title="Consumables" 
            icon={<Droplets className="w-8 h-8 mb-4 text-white" />} 
            image="https://picsum.photos/seed/fishfood/400/300" 
          />
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-8 text-slate-900 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCard title="Peginium fish name" price="$23.00" badge="Beginner Friendly" badge2="Premium" image="https://picsum.photos/seed/tetra1/300/300" />
          <ProductCard title="Raoin trure name" price="$25.00" badge="Beginner Friendly" badge2="Premium" image="https://picsum.photos/seed/tetra2/300/300" />
          <ProductCard title="Rare fiundters" price="$16.00" badge="Premium" badge2="Rare" image="https://picsum.photos/seed/tetra3/300/300" />
        </div>
      </section>

      {/* Services */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8 text-slate-900 text-center">Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ServiceCard 
            title="Aquarium Setup"
            description="Aquarium solocies, pormarizies consultiam and promsiores."
            price="$150"
            icon={<Box className="w-6 h-6" />}
          />
          <ServiceCard 
            title="Maintenance & Cleaning"
            description="Sontomistion prodeccs velaing, maintenanc and cleaning."
            price="$130"
            icon={<Wrench className="w-6 h-6" />}
          />
          <ServiceCard 
            title="Consultation"
            description="Concultation is conultant and and odiant and conusists."
            price="$120"
            icon={<User className="w-6 h-6" />}
          />
        </div>
      </section>

      {/* AI Recommendation */}
      <section className="relative py-24 mt-16">
        <div className="absolute inset-0 bg-[#0F2027] z-0">
           <div className="absolute inset-0 opacity-30 bg-[url('https://picsum.photos/seed/ocean/1920/1080')] bg-cover bg-center mix-blend-overlay"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-white">AI Recommendation</h2>
          
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 text-white">
              <h3 className="text-3xl font-bold mb-4">Find Your Perfect<br/>Setup</h3>
              <p className="text-white/70 leading-relaxed">
                Find your aquarium tanks for expert care and effects, and meticulous setup in your needs.
              </p>
            </div>
            <div className="flex-1 w-full space-y-6">
              <div>
                <Label className="text-white/90 mb-2 block">Tank Size (Gallons)</Label>
                <Input className="bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-full px-6 py-6" placeholder="10" />
              </div>
              <div>
                <Label className="text-white/90 mb-2 block">Budget ($)</Label>
                <Input className="bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-full px-6 py-6" placeholder="$" />
              </div>
              <Button className="w-full bg-white text-teal-900 hover:bg-white/90 rounded-full py-6 text-base font-semibold mt-4">
                Get AI Recommendations
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Aquarium Gallery */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <h2 className="text-2xl font-bold mb-8 text-slate-900 text-center">Aquarium Gallery</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative rounded-2xl overflow-hidden aspect-video">
            <Image src="https://picsum.photos/seed/gal1/800/600" alt="Gallery" fill className="object-cover hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
          </div>
          <div className="relative rounded-2xl overflow-hidden aspect-video">
            <Image src="https://picsum.photos/seed/gal2/800/600" alt="Gallery" fill className="object-cover hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
          </div>
          <div className="relative rounded-2xl overflow-hidden aspect-video">
            <Image src="https://picsum.photos/seed/gal3/800/600" alt="Gallery" fill className="object-cover" referrerPolicy="no-referrer" />
            <div className="absolute inset-y-0 left-1/2 w-0.5 bg-white -translate-x-1/2 shadow-sm"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md cursor-ew-resize">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 border-t-2 border-l-2 border-slate-400 -rotate-45"></div>
                <div className="w-1.5 h-1.5 border-t-2 border-r-2 border-slate-400 rotate-45"></div>
              </div>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden aspect-video">
            <Image src="https://picsum.photos/seed/gal4/800/600" alt="Gallery" fill className="object-cover" referrerPolicy="no-referrer" />
            <div className="absolute inset-y-0 left-1/2 w-0.5 bg-white -translate-x-1/2 shadow-sm"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md cursor-ew-resize">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 border-t-2 border-l-2 border-slate-400 -rotate-45"></div>
                <div className="w-1.5 h-1.5 border-t-2 border-r-2 border-slate-400 rotate-45"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F172A] text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact links</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">About Us</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Aquarium is dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Contact</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Newsletter Sign up</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Newsletter Sign-up</h4>
            <div className="relative mb-6">
              <Input 
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 rounded-full pr-12" 
                placeholder="Email Address" 
              />
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <Link href="#" className="hover:text-white transition-colors"><Twitter className="w-5 h-5" /></Link>
              <Link href="#" className="hover:text-white transition-colors"><Facebook className="w-5 h-5" /></Link>
              <Link href="#" className="hover:text-white transition-colors"><Instagram className="w-5 h-5" /></Link>
            </div>
          </div>
        </div>
        
        {/* WhatsApp Floating Button (simulated in footer for now, or fixed) */}
        <div className="fixed bottom-8 right-8 z-50 flex items-center gap-2">
          <div className="bg-white text-slate-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
            WhatsApp
          </div>
          <button className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-transform hover:scale-110">
            <MessageCircle className="w-6 h-6" />
          </button>
        </div>
      </footer>
    </div>
  );
}

function CategoryCard({ title, icon, image }: { title: string; icon: React.ReactNode; image: string }) {
  return (
    <div className="relative h-48 rounded-2xl overflow-hidden group cursor-pointer">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
        {icon}
        <h3 className="text-xl font-bold text-center">{title}</h3>
      </div>
    </div>
  );
}

function ProductCard({ title, price, badge, badge2, image }: { title: string; price: string; badge: string; badge2?: string; image: string }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
      <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-slate-50">
        <Image src={image} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
      </div>
      <h3 className="font-bold text-slate-900 mb-1">{title}</h3>
      <p className="text-slate-900 font-bold mb-3">{price}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="bg-teal-50 text-teal-700 text-xs font-medium px-2.5 py-1 rounded-full border border-teal-100">
          {badge}
        </span>
        {badge2 && (
          <span className="bg-amber-50 text-amber-700 text-xs font-medium px-2.5 py-1 rounded-full border border-amber-100">
            {badge2}
          </span>
        )}
      </div>
      <div className="flex gap-2">
        <Button variant="outline" className="flex-1 rounded-full border-slate-200 text-slate-600 hover:bg-slate-50 text-xs px-2">
          View Details
        </Button>
        <Button className="flex-1 bg-teal-500 hover:bg-teal-600 text-white rounded-full text-xs px-2">
          Order via WhatsApp
        </Button>
      </div>
    </div>
  );
}

function ServiceCard({ title, description, price, icon }: { title: string; description: string; price: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex flex-col">
      <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-500 text-sm mb-6 flex-1 leading-relaxed">{description}</p>
      <p className="text-slate-500 text-sm mb-4">Starting at <span className="text-slate-900 font-bold">{price}</span></p>
      <Button className="w-full bg-[#1e3a5f] hover:bg-[#152a45] text-white rounded-full">
        Book Now
      </Button>
    </div>
  );
}
