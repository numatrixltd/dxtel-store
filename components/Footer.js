import Link from "next/link";
import {
  Zap,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Youtube,
  Instagram,
} from "lucide-react";
import Image from "next/image";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  // { label: "Products", href: "/#products" },
  { label: "Store Locator", href: "/partners" },
  { label: "About Us", href: "/#about" },
];

const STORE_LINKS = [
  { label: "Retail Chains", href: "/partners" },
  { label: "Dealer Points", href: "/partners" },
  { label: "Become a Dealer", href: "/#contact" },
  { label: "Warranty & Support", href: "/#contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-ink text-slate-200">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="group flex items-center">
              <Image
                src="/assets/logo/dxx-logo.png"
                alt="DXTEL"
                width={140}
                height={36}
                priority
                className="h-auto w-auto md:h-24 md:w-auto"
              />
            </Link>
            {/* <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              A nationwide network of authorized retail chains and dealer
              points, verified for genuine products and reliable service across
              Bangladesh.
            </p> */}
            {/* <div className="mt-5 flex gap-3">
              {[Facebook, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-300 transition-colors hover:border-yellow-500 hover:text-yellow-400"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div> */}
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-white">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-yellow-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Partner network */}
          {/* <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-white">
              Store Network
            </h3>
            <ul className="mt-4 space-y-3">
              {STORE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-yellow-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Contact */}
          <div id="contact">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-white">
              Get in Touch
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-400" />
                <a href="tel:+8801708-813798" className="hover:text-yellow-400">
                  +8801708-813798
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-400" />
                <a
                  href="mailto:hello@dx.com.bd"
                  className="hover:text-yellow-400"
                >
                 hello@dx.com.bd
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-400" />
                <span>House # 7, Road # 54/A
                Gulshan-2, Dhaka-1212, Bangladesh</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} DX. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-yellow-400">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-yellow-400">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
