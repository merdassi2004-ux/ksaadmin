"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-dark">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-serif font-bold text-light mb-4 tracking-wide"
          >
            Find Us
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-px bg-primary/30 w-24 mx-auto"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/3 space-y-8"
          >
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-light mb-2">Location</h3>
                <p className="text-light-muted leading-relaxed">
                  Rue de Tunis, Gammarth
                  <br /> Tunis, Tunisia
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-light mb-2">Phone</h3>
                <p className="text-light-muted leading-relaxed">+216 71 000 000</p>
                <p className="text-light-muted leading-relaxed mt-1 text-sm">WhatsApp available on our reservation line.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-light mb-2">Email</h3>
                <p className="text-light-muted leading-relaxed">hello@ksarayed.tn</p>
              </div>
            </div>
            
            <div className="pt-8 border-t border-white/10 mt-8">
              <h3 className="text-xl font-serif font-bold text-light mb-4">Opening Hours</h3>
              <div className="space-y-2 text-light-muted">
                <p className="flex justify-between"><span>Monday - Thursday</span> <span>4:00 PM - 1:00 AM</span></p>
                <p className="flex justify-between"><span>Friday - Sunday</span> <span>4:00 PM - 3:00 AM</span></p>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-2/3 h-[400px] lg:h-[500px]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3191.0601267426176!2d10.3204368!3d36.8837267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12e2b34c2ab1e779%3A0x6bba8c6a2c2df9e!2sGammarth%2C%20Tunisia!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: "2px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale contrast-125 opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
