'use client'

import { motion } from 'framer-motion'
import { Icon } from '@/components/icons'

interface CoreService {
  name: string
  description: string
  icon: string
}

interface AnimatedAboutSectionProps {
  title: string
  description: string
  coreServices: CoreService[]
  primaryColor: string
}

export default function AnimatedAboutSection({ title, description, coreServices, primaryColor }: AnimatedAboutSectionProps) {
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
      className='section md:py-20'
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        <motion.div 
          className='flex flex-col gap-6'
          variants={itemVariants}
        >
          <h2 className='text-2xl md:text-4xl'>
            {title}
          </h2>
          <p className='text-md md:text-lg'>
            {description}
          </p>
          <motion.div 
            className="flex items-center gap-4 mt-4"
            variants={containerVariants}
          >
            <motion.div 
              className="flex flex-col items-center p-4 bg-yellow-50 rounded-lg"
              variants={cardVariants}
              whileHover="hover"
            >
              <span className="text-2xl font-bold text-yellow-900">15+</span>
              <span className="text-sm text-yellow-700">Years Experience</span>
            </motion.div>
            <motion.div 
              className="flex flex-col items-center p-4 bg-yellow-50 rounded-lg"
              variants={cardVariants}
              whileHover="hover"
            >
              <span className="text-2xl font-bold text-yellow-900">100%</span>
              <span className="text-sm text-yellow-700">Quality Guarantee</span>
            </motion.div>
          </motion.div>
        </motion.div>
        <motion.div 
          className='flex flex-col gap-6'
          variants={itemVariants}
        >
          <h3 className='text-xl md:text-2xl'>Core Services & Expertise</h3>
          <motion.div 
            className='grid gap-6'
            variants={containerVariants}
          >
            {coreServices.map((service, index) => (
              <motion.div 
                key={`${service.name}-${index}`} 
                className='flex gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer'
                variants={cardVariants}
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
              >
                <Icon icon={service.icon} className='text-2xl shrink-0 mt-1' style={{ color: primaryColor }} />
                <div>
                  <h4 className='text-lg font-semibold text-gray-900'>{service.name}</h4>
                  <p className='text-sm text-gray-600'>{service.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
} 