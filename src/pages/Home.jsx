import { useState } from 'react'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('dashboard')
  const [userDrawerOpen, setUserDrawerOpen] = useState(false)

  const handleProfileEdit = () => {
    // Profile edit functionality
    toast.success('Profile updated successfully!')
    setUserDrawerOpen(false)
  }

  const handlePreferences = () => {
    // Preferences functionality
    toast.info('Preferences saved!')
  }

  const handleNotificationToggle = (enabled) => {
    // Notification toggle functionality
    toast.success(`Notifications ${enabled ? 'enabled' : 'disabled'}`)
  }

  const handleThemeToggle = (isDark) => {
    // Theme toggle functionality
    toast.info(`Switched to ${isDark ? 'dark' : 'light'} theme`)
  }

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      toast.success('Logged out successfully!')
      // Logout logic here
    }
    setUserDrawerOpen(false)
  }

const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { id: 'contacts', label: 'Contacts', icon: 'Users' },
    { id: 'companies', label: 'Companies', icon: 'Building2' },
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
          
<div 
            className="flex items-center space-x-2 cursor-pointer hover:bg-surface-100 rounded-xl p-2 transition-colors relative"
            onClick={() => setUserDrawerOpen(!userDrawerOpen)}
          >
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format"
              alt="User Avatar"
              className="w-8 h-8 rounded-lg object-cover"
            />
            <span className="hidden sm:block font-medium text-nova-text">Alex Chen</span>
            <ApperIcon name="ChevronDown" className={`w-4 h-4 text-surface-400 transition-transform ${userDrawerOpen ? 'rotate-180' : ''}`} />
          </div>
        </div>

        {/* User Drawer */}
        {userDrawerOpen && (
          <>
            <div 
              className="fixed inset-0 z-40 bg-black/20"
              onClick={() => setUserDrawerOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-16 right-4 w-80 bg-white rounded-xl shadow-nova border border-surface-100 z-50 overflow-hidden"
            >
              {/* User Profile Section */}
              <div className="p-6 bg-nova-gradient text-white">
                <div className="flex items-center space-x-4">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face&auto=format"
                    alt="User Avatar"
                    className="w-14 h-14 rounded-xl object-cover border-2 border-white/20"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">Alex Chen</h3>
                    <p className="text-white/80 text-sm">alex.chen@novacrm.com</p>
                    <p className="text-white/60 text-xs">Senior Sales Manager</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="p-4 border-b border-surface-100">
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={handleProfileEdit}
                    className="flex items-center space-x-2 p-3 rounded-xl hover:bg-surface-50 transition-colors text-left"
                  >
                    <ApperIcon name="User" className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">Edit Profile</span>
                  </button>
                  <button 
                    onClick={handlePreferences}
                    className="flex items-center space-x-2 p-3 rounded-xl hover:bg-surface-50 transition-colors text-left"
                  >
                    <ApperIcon name="Settings" className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">Preferences</span>
                  </button>
                </div>
              </div>

              {/* Settings */}
              <div className="p-4 border-b border-surface-100 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <ApperIcon name="Bell" className="w-5 h-5 text-surface-600" />
                    <span className="text-sm font-medium">Notifications</span>
                  </div>
                  <button 
                    onClick={() => handleNotificationToggle(true)}
                    className="w-10 h-6 bg-primary rounded-full relative transition-colors"
                  >
                    <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 transition-transform"></div>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <ApperIcon name="Moon" className="w-5 h-5 text-surface-600" />
                    <span className="text-sm font-medium">Dark Mode</span>
                  </div>
                  <button 
                    onClick={() => handleThemeToggle(false)}
                    className="w-10 h-6 bg-surface-300 rounded-full relative transition-colors"
                  >
                    <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 transition-transform"></div>
                  </button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="p-4 border-b border-surface-100">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold text-primary">24</div>
                    <div className="text-xs text-surface-600">Active Deals</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-secondary">156</div>
                    <div className="text-xs text-surface-600">Contacts</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-accent">8</div>
                    <div className="text-xs text-surface-600">Tasks Today</div>
                  </div>
                </div>
              </div>

              {/* Logout */}
              <div className="p-4">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-2 p-3 rounded-xl hover:bg-red-50 text-red-600 transition-colors"
                >
                  <ApperIcon name="LogOut" className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </motion.nav>

      <div className="flex">
        {/* Sidebar */}
        <motion.aside 
initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white/95 backdrop-blur-md shadow-glass border-r border-surface-100/50 transition-transform duration-300 ease-in-out`}
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