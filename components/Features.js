"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Truck, Headphones, Store } from "lucide-react";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Verified partners only",
    desc: "Every retail chain and dealer point is vetted and authorized directly by ElectroLink, so you always get genuine products and honest warranty support.",
  },
  {
    icon: Store,
    title: "Retail & wholesale, covered",
    desc: "From flagship retail showrooms to wholesale dealer points, find the right kind of partner for the purchase you need to make.",
  },
  {
    icon: Truck,
    title: "Nationwide coverage",
    desc: "From Dhaka and Chattogram to Sylhet, Khulna, and beyond \u2014 our partner network reaches districts across Bangladesh.",
  },
  {
    icon: Headphones,
    title: "Support that follows you",
    desc: "Every location lists direct phone contact and working hours, so help is always one call away, wherever you bought from.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Features() {
  return (
    <section id="products" className="border-t border-slate-200 bg-white py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-widest text-yellow-600">
            Why ElectroLink
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            A network built for trust, not just proximity.
          </h2>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {FEATURES.map((f) => (
            <motion.div
              key={f.title}
              variants={item}
              className="group rounded-2xl border border-slate-200 p-6 transition-colors hover:border-yellow-300 hover:bg-yellow-50/40"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink text-yellow-400 transition-colors group-hover:bg-yellow-600">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-base font-semibold text-ink">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
