import React, { useState } from "react";
import { Layout } from "../components/layout/Layout";
import Container from "../components/ui/Container";
import { Button } from "../components/ui/Button";
import { Filter, ArrowRight } from "lucide-react";
import { cn } from "../lib/utils";

const Catalog = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const kitchens = [
    {
      id: 1,
      name: "Milano Grande",
      style: "modern",
      price: 185000,
      image: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80&w=800",
      tags: ["Хит", "МДФ"],
    },
    {
      id: 2,
      name: "Nordic Light",
      style: "scandi",
      price: 145000,
      image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=800",
      tags: ["Новинка"],
    },
    {
      id: 3,
      name: "Royal Classic",
      style: "classic",
      price: 280000,
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800",
      tags: ["Эмаль", "Патина"],
    },
    {
      id: 4,
      name: "Urban Loft",
      style: "loft",
      price: 165000,
      image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800",
      tags: ["Бетон", "Металл"],
    },
    {
      id: 5,
      name: "Provence Dream",
      style: "provence",
      price: 210000,
      image: "https://images.unsplash.com/photo-1484154218962-a1c002085d2f?auto=format&fit=crop&q=80&w=800",
      tags: ["Массив"],
    },
    {
      id: 6,
      name: "Future Tech",
      style: "hitech",
      price: 245000,
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800",
      tags: ["Глянец", "Умный дом"],
    },
    {
      id: 7,
      name: "White Minimal",
      style: "modern",
      price: 135000,
      image: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&q=80&w=800",
      tags: ["Акция"],
    },
    {
      id: 8,
      name: "Dark Matter",
      style: "loft",
      price: 195000,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=800",
      tags: ["Премиум"],
    },
    {
      id: 9,
      name: "Eco Wood",
      style: "scandi",
      price: 175000,
      image: "https://images.unsplash.com/photo-1556909190-eccf4c8ba7f1?auto=format&fit=crop&q=80&w=800",
      tags: ["Шпон"],
    },
  ];

  const filteredKitchens = activeFilter === "all" 
    ? kitchens 
    : kitchens.filter(k => k.style === activeFilter);

  const filters = [
    { id: "all", label: "Все" },
    { id: "modern", label: "Современные" },
    { id: "classic", label: "Классика" },
    { id: "scandi", label: "Сканди" },
    { id: "loft", label: "Лофт" },
    { id: "provence", label: "Прованс" },
    { id: "hitech", label: "Хай-тек" },
  ];

  return (
    <Layout>
      {/* Header Banner */}
      <div className="relative h-[40vh] bg-primary flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000" 
            alt="Каталог кухонь" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-playfair font-bold text-white mb-4">Каталог Кухонь</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto px-4">
            Более 500 готовых решений для вашего дома. Адаптируем любой проект под ваши размеры.
          </p>
        </div>
      </div>

      <Container className="py-12">
        {/* Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6 sticky top-20 z-30 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-sm border border-gray-100">
           <div className="flex items-center gap-2 overflow-x-auto w-full pb-2 md:pb-0 scrollbar-hide">
              <Filter size={20} className="text-accent flex-shrink-0 mr-2" />
              {filters.map(filter => (
                 <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={cn(
                       "px-6 py-2 rounded-full whitespace-nowrap transition-all duration-300 text-sm font-medium",
                       activeFilter === filter.id 
                         ? "bg-primary text-white shadow-lg" 
                         : "bg-gray-100 text-text-medium hover:bg-gray-200"
                    )}
                 >
                    {filter.label}
                 </button>
              ))}
           </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {filteredKitchens.map(kitchen => (
              <div key={kitchen.id} className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-500 hover:-translate-y-2">
                 <div className="relative h-64 overflow-hidden">
                    <img 
                      src={kitchen.image} 
                      alt={kitchen.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                       {kitchen.tags.map(tag => (
                          <span key={tag} className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-primary">
                             {tag}
                          </span>
                       ))}
                    </div>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                       <Button variant="outline" className="text-white border-white hover:bg-white hover:text-primary">
                          Подробнее
                       </Button>
                    </div>
                 </div>
                 <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                       <div>
                          <h3 className="text-xl font-bold font-playfair mb-1">{kitchen.name}</h3>
                          <p className="text-sm text-text-light uppercase tracking-wide">{filters.find(f => f.id === kitchen.style)?.label}</p>
                       </div>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                       <div>
                          <p className="text-xs text-text-light mb-1">Стоимость от</p>
                          <p className="font-dm-mono font-bold text-lg text-primary">{kitchen.price.toLocaleString()} ₽</p>
                       </div>
                       <button className="w-10 h-10 rounded-full bg-light-gray flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-white transition-colors">
                          <ArrowRight size={18} />
                       </button>
                    </div>
                 </div>
              </div>
           ))}
        </div>
      </Container>
    </Layout>
  );
};

export default Catalog;
