export default function Footer() {
  return (
    <footer className="w-full bg-luxury-paper border-t border-luxury-gold/30 py-12 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center relative z-50">
      
      <a href="/" data-cursor="HOME" className="mb-6 md:mb-0 block">
        <img 
          src="/logo.png" 
          alt="Disha Bafna" 
          className="h-10 md:h-14 w-auto object-contain" 
        />
      </a>

      <div className="flex space-x-12 text-xs tracking-[0.2em] uppercase font-sans text-luxury-charcoal/70">
        <a href="mailto:hello@dishabafna.com" data-cursor="CLICK" className="hover:text-luxury-burgundy transition-colors">
          Inquiries
        </a>
        <a href="#" data-cursor="CLICK" className="hover:text-luxury-burgundy transition-colors">
          Instagram
        </a>
        <a href="#" data-cursor="CLICK" className="hover:text-luxury-burgundy transition-colors">
          LinkedIn
        </a>
      </div>

      <div className="text-xs tracking-[0.2em] text-luxury-charcoal/40 font-sans mt-6 md:mt-0 uppercase">
        © 2026 Disha Bafna
      </div>

    </footer>
  );
}