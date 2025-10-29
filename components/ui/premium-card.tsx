import { motion } from "framer-motion"
import { ReactNode } from "react"

type TPremiumCardProps = {
  children: ReactNode
  className?: string
  delay?: number
  hover?: boolean
}

export function PremiumCard({ children, className = "", delay = 0, hover = true }: TPremiumCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="relative group"
    >
      {/* Glow Effect */}
      {hover && (
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-amber-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
      )}
      
      {/* Card */}
      <div className={`relative bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl ${hover ? 'group-hover:border-amber-500/50' : ''} transition-all duration-300 ${className}`}>
        {children}
      </div>
    </motion.div>
  )
}

