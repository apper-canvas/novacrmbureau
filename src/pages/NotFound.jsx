import { Link } from 'react-router-dom'
import ApperIcon from '../components/ApperIcon'
import { motion } from 'framer-motion'

const NotFound = () => {
  return (
<div className="min-h-screen bg-gradient-to-br from-surface-50 via-white to-surface-100 flex items-center justify-center px-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center max-w-md w-full"
      >
        <div className="nova-card p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
          <div className="relative">
            <motion.div 
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow"
            >
              <ApperIcon name="AlertTriangle" className="w-10 h-10 text-white" />
            </motion.div>
            
            <h1 className="text-6xl font-bold gradient-text mb-4 font-heading">404</h1>
            <h2 className="text-xl font-semibold text-nova-text mb-4">Page Not Found</h2>
            <p className="text-surface-600 mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
            
            <Link
              to="/"
              className="nova-button inline-flex items-center space-x-2 group"
            >
              <ApperIcon name="ArrowLeft" className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default NotFound