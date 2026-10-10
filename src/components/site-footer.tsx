import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#333333] text-white pt-20 pb-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* Brand Column */}
          <div>
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-white mb-6 group">
  <div className="w-10 h-10 bg-[#FF5500] rounded-full flex items-center justify-center text-white font-bold text-lg group-hover:bg-[#e64d00] transition-colors">
    J
  </div>
  JIE PLATE<span className="text-[#FF5500]">.</span>
</Link>
            <p className="text-[#a0a0a0] text-sm leading-relaxed max-w-xs">
              Made for full tables.
              <br />
              Starting with Lagos.
            </p>
          </div>
          
          {/* Message Column */}
          <div className="flex items-center">
            <p className="text-2xl md:text-3xl font-serif text-white leading-snug">
              Good food should fit
              <br />
              <em className="text-[#FF5500] not-italic font-bold">into your life.</em>
            </p>
          </div>

          {/* Links Column */}
          <nav aria-label="Footer" className="flex flex-col gap-4 md:items-end">
            <Link href="/orders" className="text-[#a0a0a0] hover:text-[#FF5500] transition-colors text-sm font-medium">
              My test orders â†—
            </Link>
            <Link href="/about" className="text-[#a0a0a0] hover:text-[#FF5500] transition-colors text-sm font-medium">
              About this prototype â†—
            </Link>
            <Link href="/about#stack" className="text-[#a0a0a0] hover:text-[#FF5500] transition-colors text-sm font-medium">
              Our technology choices â†—
            </Link>
            <Link href="/support" className="text-[#a0a0a0] hover:text-[#FF5500] transition-colors text-sm font-medium">
              Contact Support â†—
            </Link>
          </nav>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-[#333333] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#a0a0a0]">
          <span>Â© 2026 JIE PLATE Â· A product in progress</span>
          <span>Next.js build Â· Fictional kitchens and pricing</span>
        </div>
      </div>
    </footer>
  );
}
