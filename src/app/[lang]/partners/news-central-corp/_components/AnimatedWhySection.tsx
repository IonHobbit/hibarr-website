'use client'

import { motion } from 'framer-motion'

interface WhyCard {
  title: string
  content: string
  items: string[]
}

interface AnimatedWhySectionProps {
  title: string
  subtitle: string
  cards: WhyCard[]
  primaryColor: string
}

export default function AnimatedWhySection({ title, subtitle, cards, primaryColor }: AnimatedWhySectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.section 
      className='bg-gray-50 py-16'
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className='section'>
        <motion.div 
          className='text-center mb-12'
          variants={itemVariants}
        >
          <h2 className='text-2xl md:text-4xl mb-4'>{title}</h2>
          <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
            {subtitle}
          </p>
        </motion.div>

        <motion.div 
          className='grid grid-cols-1 md:grid-cols-2 gap-8'
          variants={containerVariants}
        >
          {cards.map((card, index) => (
            <motion.div 
              key={index}
              className='bg-white p-8 rounded-lg shadow-sm cursor-pointer'
              variants={cardVariants}
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
            >
              <h3 className='text-xl font-semibold mb-4' style={{ color: primaryColor }}>{card.title}</h3>
              <p className='text-gray-600 mb-4'>{card.content}</p>
              <ul className='space-y-2 text-sm text-gray-600'>
                {card.items.map((item, itemIndex) => (
                  <li key={itemIndex}>• {item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
} 