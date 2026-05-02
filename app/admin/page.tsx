"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Users, Phone, Clock, MessageSquare, AlertCircle, CheckCircle2, XCircle, Trash2 } from "lucide-react";

type Reservation = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  eventType: string;
  guestCount: string | number;
  date: string;
  time: string;
  message?: string;
  status: string;
  createdAt: string;
};

export default function AdminDashboard() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchReservations = async () => {
    try {
      const res = await fetch("/api/reservations");
      if (!res.ok) throw new Error("Failed to fetch reservations");
      const data = await res.json();
      setReservations(data);
    } catch (err) {
      setError("Could not load reservations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/reservations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (!res.ok) throw new Error("Failed to update status");
      
      // Update local state
      setReservations(prev => 
        prev.map(r => r.id === id ? { ...r, status: newStatus } : r)
      );
    } catch (err) {
      alert("Error updating reservation status.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this reservation? This cannot be undone.")) return;
    
    setActionLoading(id);
    try {
      const res = await fetch(`/api/reservations/${id}`, {
        method: "DELETE",
      });
      
      if (!res.ok) throw new Error("Failed to delete reservation");
      
      // Update local state
      setReservations(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      alert("Error deleting reservation.");
    } finally {
      setActionLoading(null);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric"
      }).format(date);
    } catch (e) {
      return dateString;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
      case "confirmed":
        return "bg-green-500/20 text-green-500 border-green-500/30";
      case "cancelled":
        return "bg-red-500/20 text-red-500 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-dark text-light p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-light mb-2 tracking-wide">
              Admin <span className="text-primary">Dashboard</span>
            </h1>
            <p className="text-light-muted">Manage your lounge reservations</p>
          </div>
          <button
            onClick={() => {
              setLoading(true);
              fetchReservations();
            }}
            className="px-6 py-2 border border-primary text-primary hover:bg-primary hover:text-dark transition-colors uppercase tracking-wider text-sm font-semibold rounded-sm w-max"
          >
            Refresh Data
          </button>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-dark border-t-primary rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/50 p-6 rounded-sm text-center">
            <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <p className="text-red-500">{error}</p>
          </div>
        ) : reservations.length === 0 ? (
          <div className="text-center py-24 bg-dark-lighter border border-white/5 rounded-sm">
            <Calendar className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-light mb-2">No Reservations Yet</h3>
            <p className="text-light-muted">New reservations will appear here.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            <div className="overflow-x-auto rounded-sm border border-white/10 bg-dark-lighter shadow-2xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10 text-light-muted uppercase tracking-wider text-xs font-semibold">
                    <th className="p-4">Guest Info</th>
                    <th className="p-4">Event Details</th>
                    <th className="p-4">Date & Time</th>
                    <th className="p-4">Message</th>
                    <th className="p-4 text-right">Status & Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {reservations.map((res, index) => (
                    <motion.tr
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      key={res.id}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="p-4 align-top">
                        <div className="font-medium text-light mb-1">{res.name}</div>
                        <div className="flex items-center text-sm text-light-muted mb-1">
                          <Phone className="w-3 h-3 mr-2" />
                          {res.phone}
                        </div>
                        {res.email && (
                          <div className="text-xs text-white/40">{res.email}</div>
                        )}
                      </td>
                      <td className="p-4 align-top">
                        <div className="inline-block px-2 py-1 bg-white/5 rounded text-xs text-light mb-2">
                          {res.eventType}
                        </div>
                        <div className="flex items-center text-sm text-light-muted">
                          <Users className="w-3 h-3 mr-2" />
                          {res.guestCount} Guests
                        </div>
                      </td>
                      <td className="p-4 align-top">
                        <div className="flex items-center text-sm text-light mb-1">
                          <Calendar className="w-3 h-3 mr-2 text-primary" />
                          {formatDate(res.date)}
                        </div>
                        <div className="flex items-center text-sm text-light-muted">
                          <Clock className="w-3 h-3 mr-2 text-primary" />
                          {res.time}
                        </div>
                      </td>
                      <td className="p-4 align-top max-w-xs">
                        {res.message ? (
                          <div className="text-sm text-light-muted line-clamp-3 group-hover:line-clamp-none transition-all">
                            <MessageSquare className="w-3 h-3 inline mr-1 opacity-50" />
                            {res.message}
                          </div>
                        ) : (
                          <span className="text-white/20 text-sm italic">None</span>
                        )}
                      </td>
                      <td className="p-4 align-top text-right">
                        <div className="flex flex-col items-end gap-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(res.status)} capitalize`}>
                            {res.status}
                          </span>
                          
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            {res.status !== "confirmed" && (
                              <button 
                                onClick={() => handleStatusChange(res.id, "confirmed")}
                                disabled={actionLoading === res.id}
                                className="p-1.5 text-green-500 hover:bg-green-500/10 rounded transition-colors"
                                title="Confirm Reservation"
                              >
                                <CheckCircle2 className="w-4 h-4" />
                              </button>
                            )}
                            {res.status !== "cancelled" && (
                              <button 
                                onClick={() => handleStatusChange(res.id, "cancelled")}
                                disabled={actionLoading === res.id}
                                className="p-1.5 text-yellow-500 hover:bg-yellow-500/10 rounded transition-colors"
                                title="Cancel Reservation"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            )}
                            <button 
                              onClick={() => handleDelete(res.id)}
                              disabled={actionLoading === res.id}
                              className="p-1.5 text-red-500 hover:bg-red-500/10 rounded transition-colors"
                              title="Delete Reservation"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <div className="text-[10px] text-white/30">
                            {new Date(res.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
