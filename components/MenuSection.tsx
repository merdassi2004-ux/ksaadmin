"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const menuData = {
  coffee: [
    { name: "Espresso", price: "7.5 TND", description: "Rich and intense single shot of our signature blend." },
    { name: "Cappuccino", price: "9.0 TND", description: "Espresso with steamed milk and a deep layer of microfoam." },
    { name: "Latte Macchiato", price: "10.5 TND", description: "Steamed milk stained with a shot of espresso." },
    { name: "Turkish Coffee", price: "8.0 TND", description: "Traditional finely ground, unfiltered coffee." },
    { name: "Iced Caramel Latte", price: "12.0 TND", description: "Espresso, cold milk, and caramel over ice." },
  ],
  shisha: [
    { name: "Classic Apple", price: "25.0 TND", description: "Traditional double apple premium molasses." },
    { name: "Mint Breeze", price: "28.0 TND", description: "Refreshing blend of sweet mint and crisp ice." },
    { name: "Exotic Berry", price: "30.0 TND", description: "A complex mix of wild berries and subtle floral notes." },
    { name: "The Lounge Special", price: "40.0 TND", description: "Our secret signature blend in a premium fresh fruit bowl." },
  ],
  food: [
    { name: "Tapas Platter", price: "35.0 TND", description: "An assortment of premium cheeses, cured meats, and olives." },
    { name: "Crispy Calamari", price: "24.0 TND", description: "Lightly dusted calamari served with zesty aioli." },
    { name: "Wagyu Sliders", price: "42.0 TND", description: "Three premium wagyu beef sliders with caramelized onions." },
  ],
};

type Category = "coffee" | "shisha" | "food";

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("coffee");

  const categories: { id: Category; label: string }[] = [
    { id: "coffee", label: "Coffee" },
    { id: "shisha", label: "Shisha" },
    { id: "food", label: "Food" },
  ];

  return (
    <section id="menu" className="py-24 bg-dark-lighter">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-serif font-bold text-light mb-4 tracking-wide"
          >
            Our Menu
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-px bg-primary/30 w-24 mx-auto"
          />
        </div>

        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-8 py-3 tracking-wider uppercase font-semibold text-sm transition-all duration-300 rounded-sm ${
                activeCategory === category.id
                  ? "bg-primary text-dark"
                  : "border border-white/10 text-light-muted hover:border-primary/50 hover:text-light"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="max-w-4xl mx-auto min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {menuData[activeCategory].map((item, index) => (
                <div
                  key={index}
                  className="bg-dark p-6 border border-white/5 rounded-sm hover:border-primary/20 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-serif font-bold text-light">{item.name}</h3>
                    <span className="text-primary font-semibold tracking-wider bg-primary/10 px-3 py-1 rounded-sm text-sm">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-light-muted text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
