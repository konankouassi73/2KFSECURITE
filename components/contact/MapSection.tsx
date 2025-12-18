'use client'

import { motion } from 'framer-motion'

export function MapSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-light p-8 rounded-xl border border-white/10"
        >
          <h2 className="text-2xl font-bold font-heading mb-6 text-primary-gray">
            Notre localisation
          </h2>
          <div className="aspect-video rounded-lg overflow-hidden bg-white border border-primary-gray/20">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937606!2d2.3316!3d48.8606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2s229%20Rue%20Saint-Honor%C3%A9%2C%2075001%20Paris!5e0!3m2!1sfr!2sfr!4v1234567890123!5m2!1sfr!2sfr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
          <p className="mt-4 text-primary-gray text-center">
            229 Rue Saint-Honoré, 75001 Paris
          </p>
        </motion.div>
      </div>
    </section>
  )
}

