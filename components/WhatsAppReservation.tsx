"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function WhatsAppReservation() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    eventType: "Table Reservation",
    guestCount: "",
    date: "",
    time: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const eventTypes = [
    "Table Reservation",
    "Wedding",
    "Birthday",
    "Private Party",
    "Corporate Event",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit reservation");
      }

      setIsSuccess(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        eventType: "Table Reservation",
        guestCount: "",
        date: "",
        time: "",
        message: "",
      });
    } catch (err) {
      setError("An error occurred. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <section id="reservation" className="py-24 bg-dark-lighter relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center bg-dark p-12 border border-primary/20 shadow-2xl rounded-sm"
          >
            <div className="w-20 h-20 bg-primary/10 text-primary mx-auto rounded-full flex items-center justify-center mb-6">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-3xl font-serif font-bold text-light mb-4">Reservation Requested</h3>
            <p className="text-light-muted mb-8">
              Thank you for choosing KSAR AYED Lounge. We have received your request and will contact you shortly to confirm your reservation.
            </p>
            <button
              onClick={() => setIsSuccess(false)}
              className="px-8 py-3 border border-primary text-primary hover:bg-primary hover:text-dark transition-colors uppercase tracking-wider text-sm font-semibold rounded-sm"
            >
              Make Another Reservation
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="reservation" className="py-24 bg-dark-lighter relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-serif font-bold text-light mb-4 tracking-wide"
          >
            Book a Table
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-light-muted text-lg max-w-2xl mx-auto"
          >
            Reserve your spot for an unforgettable experience. 
            All reservations are handled directly via WhatsApp for your convenience.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto bg-dark p-8 md:p-12 border border-white/10 shadow-2xl rounded-sm"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-light-muted uppercase tracking-wider font-semibold">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-dark-lighter border border-white/10 rounded-sm p-3 text-light focus:border-primary focus:outline-none transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-light-muted uppercase tracking-wider font-semibold">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-dark-lighter border border-white/10 rounded-sm p-3 text-light focus:border-primary focus:outline-none transition-colors"
                  placeholder="+216 XX XXX XXX"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-light-muted uppercase tracking-wider font-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-dark-lighter border border-white/10 rounded-sm p-3 text-light focus:border-primary focus:outline-none transition-colors"
                  placeholder="john@example.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-light-muted uppercase tracking-wider font-semibold">Event Type</label>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  className="w-full bg-dark-lighter border border-white/10 rounded-sm p-3 text-light focus:border-primary focus:outline-none transition-colors appearance-none"
                >
                  {eventTypes.map((type) => (
                    <option key={type} value={type} className="bg-dark text-light">
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-light-muted uppercase tracking-wider font-semibold">Number of Guests</label>
                <input
                  type="number"
                  name="guestCount"
                  required
                  min="1"
                  value={formData.guestCount}
                  onChange={handleChange}
                  className="w-full bg-dark-lighter border border-white/10 rounded-sm p-3 text-light focus:border-primary focus:outline-none transition-colors"
                  placeholder="2"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-light-muted uppercase tracking-wider font-semibold">Date</label>
                <input
                  type="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full bg-dark-lighter border border-white/10 rounded-sm p-3 text-light focus:border-primary focus:outline-none transition-colors color-scheme-dark"
                  style={{ colorScheme: "dark" }}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm text-light-muted uppercase tracking-wider font-semibold">Time</label>
                <input
                  type="time"
                  name="time"
                  required
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full bg-dark-lighter border border-white/10 rounded-sm p-3 text-light focus:border-primary focus:outline-none transition-colors"
                  style={{ colorScheme: "dark" }}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm text-light-muted uppercase tracking-wider font-semibold">Special Requests (Optional)</label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-dark-lighter border border-white/10 rounded-sm p-3 text-light focus:border-primary focus:outline-none transition-colors resize-none"
                  placeholder="Any specific seating preferences, dietary requirements, etc."
                ></textarea>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-sm text-red-500 text-sm text-center">
                {error}
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 mt-4 font-semibold tracking-wider uppercase flex items-center justify-center gap-2 rounded-sm transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] ${
                isSubmitting ? "bg-primary-dark text-dark cursor-wait" : "bg-primary text-dark"
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-dark border-t-transparent rounded-full animate-spin"></div>
                  Redirecting to WhatsApp...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Reserve Now
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
