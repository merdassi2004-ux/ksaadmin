"use client";

import { motion } from "framer-motion";
import { Coffee, Cloud, Map } from "lucide-react";

export default function AmbianceSection() {
  const features = [
    {
      icon: <Cloud className="w-10 h-10 text-primary" />,
      title: "Premium Shisha",
      description: "A selection of the finest flavors prepared by our expert shisha sommelier.",
    },
    {
      icon: <Map className="w-10 h-10 text-primary" />,
      title: "Rooftop City View",
      description: "Enjoy panoramic views of the city at night from our exclusive rooftop terrace.",
    },
    {
      icon: <Coffee className="w-10 h-10 text-primary" />,
      title: "Signature Drinks",
      description: "Our baristas craft the perfect cup of coffee while you relax and unwind.",
    },
  ];

  return (
    <section id="ambiance" className="py-24 bg-dark">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-primary font-sans uppercase tracking-[0.2em] font-semibold text-sm mb-4"
          >
            THE AMBIANCE
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-serif font-bold text-light mb-6 tracking-wide"
          >
            Elevate Your Evenings
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-light-muted text-lg leading-relaxed"
          >
            Discover the ultimate relaxation experience at our rooftop lounge. 
            Immerse yourself in a luxurious atmosphere designed for comfort and elegance, 
            where every detail ensures an unforgettable night.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 * (index + 2) }}
              className="bg-dark-lighter p-8 rounded-sm border border-white/5 hover:border-primary/30 transition-colors group flex flex-col items-center text-center"
            >
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-500">
                {feature.icon}
              </div>
              <h3 className="text-xl font-serif font-bold text-light mb-3 tracking-wide">{feature.title}</h3>
              <p className="text-light-muted leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
