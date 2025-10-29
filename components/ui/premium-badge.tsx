import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"

type TPremiumBadgeProps = {
  icon?: LucideIcon
  text: string
  className?: string
}

export function PremiumBadge({ icon: Icon, text, className = "" }: TPremiumBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500/10 to-amber-600/10 border border-amber-500/30 rounded-full backdrop-blur-sm ${className}`}
    >
      {Icon && <Icon className="w-4 h-4 text-amber-400" />}
      <span className="text-amber-400 text-sm font-semibold tracking-wide uppercase">{text}</span>
    </motion.div>
  )
}

