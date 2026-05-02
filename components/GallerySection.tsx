"use client";

import { motion } from "framer-motion";

export default function GallerySection() {
  // Using elegant colored placeholder blocks instead of photos as requested
  const galleryItems = [
    { id: 1, title: "Lounge Area", gradient: "from-[#1a1510] to-[#2a241c]" },
    { id: 2, title: "Rooftop View", gradient: "from-[#0a0a0a] to-[#1f1f1f]" },
    { id: 3, title: "Signature Cocktails", gradient: "from-[#1c1711] to-[#262018]" },
    { id: 4, title: "Premium Shisha", gradient: "from-[#141414] to-[#242424]" },
    { id: 5, title: "VIP Seating", gradient: "from-[#1a1714] to-[#2b2723]" },
    { id: 6, title: "Night Ambiance", gradient: "from-[#0f0f0f] to-[#1c1c1c]" },
  ];

  return (
    <section id="gallery" className="py-24 bg-dark">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-serif font-bold text-light mb-4 tracking-wide"
          >
            Lounge Gallery
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-px bg-primary/30 w-24 mx-auto"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative aspect-square overflow-hidden group bg-gradient-to-br ${item.gradient} rounded-sm border border-white/5 flex items-center justify-center`}
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500"></div>
              
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-primary/10 backdrop-blur-[2px]">
                <h3 className="text-light font-serif text-xl tracking-wider font-semibold translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
