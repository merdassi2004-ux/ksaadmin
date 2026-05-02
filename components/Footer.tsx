export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#050505] py-12 border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <img src="/logo.jpg" alt="KSAR AYED Logo" className="h-10 w-10 object-contain rounded-full" />
            <span className="text-xl font-serif font-bold tracking-widest text-primary">
              KSAR AYED
            </span>
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="text-light-muted hover:text-primary transition-colors text-sm uppercase tracking-wider">Instagram</a>
            <a href="#" className="text-light-muted hover:text-primary transition-colors text-sm uppercase tracking-wider">Facebook</a>
            <a href="#" className="text-light-muted hover:text-primary transition-colors text-sm uppercase tracking-wider">TikTok</a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/5 text-center flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-light-muted text-sm">
            &copy; {currentYear} KSAR AYED Lounge. All rights reserved.
          </p>
          <div className="text-light-muted text-sm flex gap-4">
            <a href="#" className="hover:text-light transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-light transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
