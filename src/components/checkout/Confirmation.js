import React from 'react'
import { motion } from 'framer-motion'

export const Confirmation = () => {
    return (
        <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        id="privacy">
          <div style={{ height: '80vh' }} className="startup-screen">
            <div className="widget-description">
              <h1>Dziękujemy za zakupy w naszym sklepie!</h1>
            </div>
          </div>
        </motion.section>
    )
}
