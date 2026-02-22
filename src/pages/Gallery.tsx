import React, { useState } from "react";
import { Layout } from "../components/layout/Layout";
import Container from "../components/ui/Container";
import { X, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const images = [
    { id: 1, src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=1200", title: "Проект в ЖК 'Сердце Столицы'", size: "large" },
    { id: 2, src: "https://images.unsplash.com/photo-1600566752355-35792bedcfe1?auto=format&fit=crop&q=80&w=800", title: "Кухня-гостиная", size: "small" },
    { id: 3, src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800", title: "Классика в доме", size: "medium" },
    { id: 4, src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800", title: "Лофт пространство", size: "medium" },
    { id: 5, src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80&w=1200", title: "Светлый минимализм", size: "large" },
    { id: 6, src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800", title: "Островная кухня", size: "small" },
    { id: 7, src: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80&w=800", title: "Компактное решение", size: "small" },
    { id: 8, src: "https://images.unsplash.com/photo-1556909190-eccf4c8ba7f1?auto=format&fit=crop&q=80&w=1200", title: "Эко-стиль", size: "medium" },
  ];

  return (
    <Layout>
      <div className="pt-32 pb-12 bg-light min-h-screen">
        <Container>
           <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">Галерея работ</h1>
              <p className="text-text-medium max-w-2xl mx-auto">
                 Реальные фотографии наших проектов. Мы гордимся каждой установленной кухней.
              </p>
           </div>

           {/* Masonry-ish Grid using CSS Grid columns */}
           <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {images.map((img, idx) => (
                 <motion.div
                    key={img.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="break-inside-avoid relative group rounded-2xl overflow-hidden cursor-pointer"
                    onClick={() => setSelectedImage(img)}
                 >
                    <img src={img.src} alt={img.title} className="w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-4 text-center">
                       <ZoomIn size={32} className="mb-2 opacity-80" />
                       <h3 className="font-playfair text-xl font-bold">{img.title}</h3>
                    </div>
                 </motion.div>
              ))}
           </div>
        </Container>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4 md:p-12"
             onClick={() => setSelectedImage(null)}
           >
              <button className="absolute top-4 right-4 text-white hover:text-accent transition-colors">
                 <X size={40} />
              </button>
              <div 
                 className="relative max-w-full max-h-full"
                 onClick={e => e.stopPropagation()} 
              >
                 <img src={selectedImage.src} alt={selectedImage.title} className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl" />
                 <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white rounded-b-lg">
                    <h3 className="text-2xl font-playfair font-bold">{selectedImage.title}</h3>
                 </div>
              </div>
           </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Gallery;
