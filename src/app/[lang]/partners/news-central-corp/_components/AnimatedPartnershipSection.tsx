'use client'

import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import Image from 'next/image'

interface PartnershipBenefit {
  title: string
  description: string
  icon: string
}

interface AnimatedPartnershipSectionProps {
  nccLogo: string
  hibarrLogo: string
  tagline: string
  benefitsTitle: string
  benefits: PartnershipBenefit[]
  primaryColor: string
}

export default function AnimatedPartnershipSection({
  nccLogo,
  hibarrLogo,
  tagline,
  benefitsTitle,
  benefits,
  primaryColor
}: AnimatedPartnershipSectionProps) {
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

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.section
      className='bg-black w-full p-6 py-10 md:min-h-[25vh] flex flex-col gap-20 items-center justify-center'
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <motion.div
        className='flex flex-col gap-2'
        variants={itemVariants}
      >
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          variants={containerVariants}
        >
          <motion.div variants={logoVariants}>
            <Image src={nccLogo} alt="News Central Corp Logo" width={300} height={300} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Icon icon="mdi:close" className='text-white text-6xl shrink-0' />
          </motion.div>
          <motion.div variants={logoVariants}>
            <Image src={hibarrLogo} alt="Hibarr Logo" width={400} height={160} />
          </motion.div>
        </motion.div>
        <motion.p
          className='text-white text-xl md:text-2xl text-center'
          variants={textVariants}
        >
          {tagline}
        </motion.p>
      </motion.div>

      <motion.div
        className='section py-0'
        variants={itemVariants}
      >
        <h3 className='text-2xl md:text-4xl text-white text-center'>{benefitsTitle}</h3>
        <motion.div
          className='grid grid-cols-1 md:grid-cols-2 gap-6'
          variants={containerVariants}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={`${benefit.title}-${index}`}
              className='bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 cursor-pointer'
              variants={cardVariants}
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
            >
              <div className='flex items-start gap-4'>
                <Icon icon={benefit.icon} className='text-2xl shrink-0 mt-1' style={{ color: primaryColor }} />
                <div>
                  <h4 className='text-lg font-semibold text-white mb-2'>{benefit.title}</h4>
                  <p className='text-white text-sm'>{benefit.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  )
} 