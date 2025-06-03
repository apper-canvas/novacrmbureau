import { useState } from 'react'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'
import { motion } from 'framer-motion'

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('dashboard')

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { id: 'contacts', label: 'Contacts', icon: 'Users' },
    { id: 'deals', label: 'Deals', icon: 'TrendingUp' },
    { id: 'tasks', label: 'Tasks', icon: 'CheckSquare' },
    { id: 'calendar', label: 'Calendar', icon: 'Calendar' },
    { id: 'reports', label: 'Reports', icon: 'BarChart3' },
    { id: 'settings', label: 'Settings', icon: 'Settings' },
  ]

  return (
    <div className="min-h-screen bg-nova-gray">
      {/* Top Navigation */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-card border-b border-surface-100 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between relative z-50"
      >
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-xl hover:bg-surface-100 transition-colors"
          >
            <ApperIcon name="Menu" className="w-6 h-6 text-nova-text" />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-nova-gradient rounded-lg flex items-center justify-center">
              <ApperIcon name="Zap" className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-nova-text hidden sm:block">Nova CRM</span>
          </div>
        </div>

        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-surface-400" />
            <input
              type="text"
              placeholder="Search contacts, deals, tasks..."
              className="w-full pl-10 pr-4 py-2 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button className="relative p-2 rounded-xl hover:bg-surface-100 transition-colors">
            <ApperIcon name="Bell" className="w-6 h-6 text-nova-text" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-2 cursor-pointer hover:bg-surface-100 rounded-xl p-2 transition-colors">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format"
              alt="User Avatar"
              className="w-8 h-8 rounded-lg object-cover"
            />
            <span className="hidden sm:block font-medium text-nova-text">Alex Chen</span>
            <ApperIcon name="ChevronDown" className="w-4 h-4 text-surface-400" />
          </div>
        </div>
      </motion.nav>

      <div className="flex">
        {/* Sidebar */}
        <motion.aside 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white shadow-card border-r border-surface-100 transition-transform duration-300 ease-in-out`}
        >
          <div className="p-6 pt-20 lg:pt-6">
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id)
                    setSidebarOpen(false)
                  }}
                  className={`nova-sidebar-item w-full text-left ${
                    activeSection === item.id ? 'active' : 'text-surface-600 hover:text-nova-text'
                  }`}
                >
                  <ApperIcon name={item.icon} className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </motion.aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/20 z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-screen lg:ml-0">
          <MainFeature activeSection={activeSection} />
        </main>
      </div>
    </div>
  )
}

export default Home