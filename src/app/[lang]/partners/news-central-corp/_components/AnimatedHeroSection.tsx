'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface AnimatedHeroSectionProps {
  logo: string
  title: string
  subtitle: string
  primaryColor: string
}

export default function AnimatedHeroSection({ logo, title, subtitle, primaryColor }: AnimatedHeroSectionProps) {
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
      id='root' 
      className="relative grid place-items-center place-content-center h-[50dvh] bg-black"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-2xl text-center flex flex-col gap-10 px-4 z-10">
        <motion.div 
          className='flex flex-col items-center gap-6'
          variants={containerVariants}
        >
          <motion.div variants={logoVariants}>
            <Image src={logo} alt="News Central Corp Logo" width={300} height={300} />
          </motion.div>

          <motion.h1 
            className="text-5xl font-semibold uppercase"
            style={{ color: primaryColor }}
            variants={textVariants}
          >
            {title}
          </motion.h1>
          <motion.p 
            className="text-md md:text-2xl text-white"
            variants={textVariants}
          >
            {subtitle}
          </motion.p>
        </motion.div>
      </div>
    </motion.section>
  )
} 