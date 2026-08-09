"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap, ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  // { label: "Products", href: "/#products" },
  { label: "Store Locator", href: "/partners" },
  { label: "About", href: "/#about" },
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
        <Link href="/" className="group flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink text-yellow-500 transition-colors group-hover:bg-teal-600">
            <Zap className="h-5 w-5" strokeWidth={2.25} fill="currentColor" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-yellow-500">
            DX<span className="text-yellow-500">TEL</span>
          </span>
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
          <Link
            href="/partners"
            className="inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-yellow-500"
          >
            Locate a Store
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg text-white md:hidden"
          onClick={() => setIsOpen((v) => !v)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-slate-200 bg-paper md:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-lg px-3 py-3 font-body text-base font-medium text-black hover:bg-yellow-50 hover:text-yellow-500"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/partners"
                  className="flex items-center justify-center gap-1.5 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
                >
                  Locate a Store
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
