import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#333333] text-white pt-20 pb-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div>
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-white mb-6">
              <div className="w-10 h-10 bg-[#FF5500] rounded-full flex items-center justify-center text-white font-bold text-lg">B</div>
              Bufer Feast<span className="text-[#FF5500]">.</span>
            </Link>
            <p className="text-[#a0a0a0] text-sm leading-relaxed max-w-xs">
              Good food for every table, from trusted cooks to your door.
            </p>
          </div>

          <div>
            <h2 className="mb-5 text-sm font-bold uppercase tracking-wider text-white">Company</h2>
            <nav className="flex flex-col gap-4 text-sm">
              <Link href="/about" className="text-[#a0a0a0] hover:text-[#FF5500]">About Us</Link>
              <Link href="/how-it-works" className="text-[#a0a0a0] hover:text-[#FF5500]">How It Works</Link>
              <Link href="/signup" className="text-[#a0a0a0] hover:text-[#FF5500]">Become a Seller / Join as a Cook</Link>
            </nav>
          </div>

          <div>
            <h2 className="mb-5 text-sm font-bold uppercase tracking-wider text-white">Contact</h2>
            <div className="flex flex-col gap-4 text-sm text-[#a0a0a0]">
              <Link href="/support" className="hover:text-[#FF5500]">WhatsApp support (number to be added)</Link>
              <span>Support hours: Mon to Sun, 8am to 9pm</span>
              <Link href="/support" className="hover:text-[#FF5500]">Contact us</Link>
            </div>
          </div>

          <div>
            <h2 className="mb-5 text-sm font-bold uppercase tracking-wider text-white">Follow us</h2>
            <div className="flex flex-col gap-4 text-sm">
              <a href="https://instagram.com/bufer_feast" target="_blank" rel="noreferrer" className="text-[#a0a0a0] hover:text-[#FF5500]">Instagram · @bufer_feast</a>
              <a href="https://www.tiktok.com/@bufer_feast" target="_blank" rel="noreferrer" className="text-[#a0a0a0] hover:text-[#FF5500]">TikTok · @bufer_feast</a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#333333] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#a0a0a0]">
          <span>© 2026 Bufer Feast</span>
          <span>Legal pages will be published before public launch</span>
        </div>
      </div>
    </footer>
  );
}
