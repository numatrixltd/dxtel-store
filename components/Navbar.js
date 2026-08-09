"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Home, MapPin, Info, Phone } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/", icon: Home },
  // { label: "Products", href: "/#products", icon: Package },
  { label: "Store Locator", href: "/partners", icon: MapPin },
  { label: "About", href: "/#about", icon: Info },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-ink backdrop-blur-lg border-b border-slate-200 shadow-sm"
          : "bg-ink border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="group flex items-center">
          <Image
            src="/assets/logo/dxx-logo.png"
            alt="DXTEL"
            width={140}
            height={36}
            priority
            className="h-8 w-auto md:h-12"
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-body text-sm font-medium text-white transition-colors hover:text-yellow-600"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <p className="inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-yellow-500">
            {/* <Phone className="h-4 w-4" /> */}
            Hotline: +8801708-813798
          </p>
        </div>

        {/* Mobile toggle */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg text-white md:hidden"
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
          aria-expanded={isOpen}
        >
          <Menu className="h-6 w-6" />
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[60] bg-ink/60 backdrop-blur-sm md:hidden"
            />

            {/* Drawer panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
              className="fixed inset-y-0 left-0 z-[70] flex w-[82%] max-w-xs flex-col bg-ink shadow-2xl md:hidden"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <Image
                  src="/assets/logo/dxx-logo.png"
                  alt="DXTEL"
                  width={120}
                  height={32}
                  className="h-8 w-auto"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Nav links */}
              <ul className="flex flex-1 flex-col gap-1 px-3 py-4">
                {NAV_LINKS.map((link, i) => {
                  const Icon = link.icon;
                  const active = pathname === link.href;
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className={`flex items-center gap-3 rounded-xl px-3 py-3 font-body text-base font-medium transition-colors ${
                          active
                            ? "bg-yellow-500 text-ink"
                            : "text-white hover:bg-white/10"
                        }`}
                      >
                        <Icon className="h-5 w-5" strokeWidth={2} />
                        {link.label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              {/* Drawer footer */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="border-t border-white/10 px-5 py-5"
              >
                <a
                  href="tel:+8801708813798"
                  className="mb-3 flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  <Phone className="h-4 w-4" />
                  +8801708-813798
                </a>
                {/* <Link
                  href="/partners"
                  className="flex items-center justify-center gap-1.5 rounded-full bg-yellow-500 px-5 py-3 text-sm font-semibold text-ink"
                >
                  Locate a Store
                  <ArrowUpRight className="h-4 w-4" />
                </Link> */}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
