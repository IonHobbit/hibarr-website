'use client'

import { CheckCircle, BookOpen, TrendingUp, Bell, Lock, Users, MessageSquare } from 'lucide-react'
import { useState, useEffect } from 'react'

const benefits = [
  {
    icon: BookOpen,
    title: "The Ultimate Guide to North Cyprus Real Estate",
    description: "Normally €4.99 — yours free, instantly after joining."
  },
  {
    icon: TrendingUp,
    title: "Exclusive Property Deals",
    description: "Off-market listings & offers — sent to you 3 days before public release."
  },
  {
    icon: CheckCircle,
    title: "Expert Trainings",
    description: "Learn about relocation, tax strategies, legal residency & profitable investments."
  },
  {
    icon: Bell,
    title: "Insider Market Updates",
    description: "Get notified of important legal changes and market shifts."
  },
  {
    icon: Lock,
    title: "Private Insights",
    description: "Tips and advice we don't publish anywhere else."
  },
  {
    icon: Users,
    title: "Elite Networking",
    description: "Connect with high-net-worth investors and real buyers."
  },
  {
    icon: MessageSquare,
    title: "Real Stories & Investor Tips",
    description: "Hear directly from members who've successfully relocated or invested."
  }
]

export default function WhyJoinSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 2) % benefits.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getVisibleBenefits = () => {
    const visible = []
    for (let i = 0; i < 2; i++) {
      const index = (currentIndex + i) % benefits.length
      visible.push(benefits[index])
    }
    return visible
  }

  return (
    <section className="py-8 bg-white/10 backdrop-blur-sm rounded-2xl my-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Why Join?
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Discover the exclusive benefits that make our community the #1 choice for North Cyprus real estate
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {getVisibleBenefits().map((benefit, index) => {
              const IconComponent = benefit.icon
              
              return (
                <div
                  key={`${currentIndex}-${index}`}
                  className="group relative bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/30 transition-all duration-700 ease-in-out hover:scale-105 hover:shadow-xl h-[260px]"
                  style={{
                    animation: 'smoothSlideIn 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  <div className="flex flex-col items-start gap-4 h-full">
                    <div className="p-3 rounded-lg bg-white/20 group-hover:bg-white/30 transition-colors duration-300">
                      <IconComponent className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="font-semibold text-primary-foreground text-lg mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-primary-foreground/80 text-sm leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              )
            })}
          </div>
          
          {/* CSS for smooth slide animation */}
          <style jsx>{`
            @keyframes smoothSlideIn {
              0% {
                opacity: 0;
                transform: translateX(30px) scale(0.95);
              }
              50% {
                opacity: 0.7;
                transform: translateX(10px) scale(0.98);
              }
              100% {
                opacity: 1;
                transform: translateX(0) scale(1);
              }
            }
          `}</style>
        </div>
      </div>
    </section>
  )
} 