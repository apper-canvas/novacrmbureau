import { Link } from 'react-router-dom'
import ApperIcon from '../components/ApperIcon'
import { motion } from 'framer-motion'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-nova-gray flex items-center justify-center px-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center max-w-md w-full"
      >
        <div className="nova-card p-8 sm:p-12">
          <div className="w-20 h-20 bg-nova-gradient rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ApperIcon name="AlertTriangle" className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl font-bold text-nova-text mb-4">404</h1>
          <h2 className="text-xl font-semibold text-nova-text mb-4">Page Not Found</h2>
          <p className="text-surface-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <Link
            to="/"
            className="nova-button inline-flex items-center space-x-2"
          >
            <ApperIcon name="ArrowLeft" className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default NotFound