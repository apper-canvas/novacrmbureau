import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from './ApperIcon'
import { toast } from 'react-toastify'

const MainFeature = ({ activeSection }) => {
  const [deals, setDeals] = useState([
    { id: 1, title: 'Acme Corp Deal', value: 25000, stage: 'new', contact: 'John Smith', owner: 'Alex Chen' },
    { id: 2, title: 'TechStart Partnership', value: 45000, stage: 'contacted', contact: 'Sarah Johnson', owner: 'Mike Davis' },
    { id: 3, title: 'Global Solutions Contract', value: 80000, stage: 'proposal', contact: 'David Wilson', owner: 'Alex Chen' },
    { id: 4, title: 'Innovation Labs Deal', value: 35000, stage: 'negotiation', contact: 'Lisa Brown', owner: 'Emma Taylor' },
    { id: 5, title: 'Enterprise Plus Package', value: 120000, stage: 'closed', contact: 'Robert Garcia', owner: 'Alex Chen' },
  ])

  const [contacts, setContacts] = useState([
    { id: 1, name: 'John Smith', email: 'john@acmecorp.com', company: 'Acme Corp', phone: '+1 (555) 123-4567', status: 'active' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@techstart.io', company: 'TechStart', phone: '+1 (555) 234-5678', status: 'active' },
    { id: 3, name: 'David Wilson', email: 'david@globalsolutions.com', company: 'Global Solutions', phone: '+1 (555) 345-6789', status: 'prospect' },
    { id: 4, name: 'Lisa Brown', email: 'lisa@innovationlabs.com', company: 'Innovation Labs', phone: '+1 (555) 456-7890', status: 'active' },
  ])

  const [tasks, setTasks] = useState([
    { id: 1, title: 'Follow up with Acme Corp', dueDate: '2024-01-15', priority: 'high', status: 'pending' },
    { id: 2, title: 'Prepare proposal for TechStart', dueDate: '2024-01-16', priority: 'medium', status: 'in-progress' },
    { id: 3, title: 'Schedule demo call', dueDate: '2024-01-14', priority: 'high', status: 'pending' },
    { id: 4, title: 'Send contract to Innovation Labs', dueDate: '2024-01-17', priority: 'low', status: 'completed' },
  ])

  const [newContact, setNewContact] = useState({ name: '', email: '', company: '', phone: '' })
  const [newDeal, setNewDeal] = useState({ title: '', value: '', contact: '', stage: 'new' })
  const [searchTerm, setSearchTerm] = useState('')

  const stages = [
    { id: 'new', title: 'New', color: 'bg-blue-100 text-blue-800' },
    { id: 'contacted', title: 'Contacted', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'proposal', title: 'Proposal', color: 'bg-purple-100 text-purple-800' },
    { id: 'negotiation', title: 'Negotiation', color: 'bg-orange-100 text-orange-800' },
    { id: 'closed', title: 'Closed', color: 'bg-green-100 text-green-800' },
  ]

  const activities = [
    { id: 1, type: 'deal_created', description: 'Created new deal "Acme Corp Deal"', user: 'Alex Chen', time: '2 hours ago' },
    { id: 2, type: 'contact_updated', description: 'Updated contact information for Sarah Johnson', user: 'Mike Davis', time: '4 hours ago' },
    { id: 3, type: 'task_completed', description: 'Completed task "Send follow-up email"', user: 'Emma Taylor', time: '6 hours ago' },
    { id: 4, type: 'deal_moved', description: 'Moved "TechStart Partnership" to Proposal stage', user: 'Alex Chen', time: '1 day ago' },
  ]

  const stats = [
    { title: 'Total Contacts', value: contacts.length, icon: 'Users', color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Active Deals', value: deals.filter(d => d.stage !== 'closed').length, icon: 'TrendingUp', color: 'text-green-600', bg: 'bg-green-50' },
    { title: 'Tasks Due Today', value: tasks.filter(t => t.status === 'pending').length, icon: 'CheckSquare', color: 'text-orange-600', bg: 'bg-orange-50' },
    { title: 'Monthly Revenue', value: `$${deals.filter(d => d.stage === 'closed').reduce((sum, d) => sum + d.value, 0).toLocaleString()}`, icon: 'DollarSign', color: 'text-purple-600', bg: 'bg-purple-50' },
  ]

  const handleContactSubmit = (e) => {
    e.preventDefault()
    if (!newContact.name || !newContact.email) {
      toast.error('Name and email are required')
      return
    }
    
    const contact = {
      id: Date.now(),
      ...newContact,
      status: 'prospect'
    }
    setContacts([...contacts, contact])
    setNewContact({ name: '', email: '', company: '', phone: '' })
    toast.success('Contact created successfully!')
  }

  const handleDealSubmit = (e) => {
    e.preventDefault()
    if (!newDeal.title || !newDeal.value) {
      toast.error('Title and value are required')
      return
    }
    
    const deal = {
      id: Date.now(),
      ...newDeal,
      value: parseInt(newDeal.value),
      owner: 'Alex Chen'
    }
    setDeals([...deals, deal])
    setNewDeal({ title: '', value: '', contact: '', stage: 'new' })
    toast.success('Deal created successfully!')
  }

  const moveDeal = (dealId, newStage) => {
    setDeals(deals.map(deal => 
      deal.id === dealId ? { ...deal, stage: newStage } : deal
    ))
    toast.success('Deal stage updated!')
  }

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const renderDashboard = () => (
    <div className="space-y-6 sm:space-y-8">
      {/* Welcome Header */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-nova-text mb-2">Welcome back, Alex 👋</h1>
          <p className="text-surface-600">Here's what's happening with your sales today.</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <span className="text-sm text-surface-500">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="nova-stat-card group"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-surface-600 text-sm font-medium">{stat.title}</p>
                <p className="text-2xl font-bold text-nova-text mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl ${stat.bg} group-hover:scale-110 transition-transform`}>
                <ApperIcon name={stat.icon} className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Kanban Pipeline */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="nova-card p-4 sm:p-6"
      >
        <h2 className="text-xl font-bold text-nova-text mb-6">Sales Pipeline</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 overflow-x-auto">
          {stages.map((stage) => (
            <div key={stage.id} className="nova-kanban-column min-w-64 sm:min-w-0">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-nova-text">{stage.title}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${stage.color}`}>
                  {deals.filter(deal => deal.stage === stage.id).length}
                </span>
              </div>
              <div className="space-y-3">
                {deals.filter(deal => deal.stage === stage.id).map((deal) => (
                  <motion.div
                    key={deal.id}
                    layout
                    className="nova-kanban-card group"
                  >
                    <h4 className="font-medium text-nova-text mb-2">{deal.title}</h4>
                    <p className="text-sm text-surface-600 mb-1">{deal.contact}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-lg font-semibold text-green-600">${deal.value.toLocaleString()}</span>
                      <div className="flex space-x-1">
                        {stage.id !== 'closed' && (
                          <button
                            onClick={() => {
                              const currentIndex = stages.findIndex(s => s.id === stage.id)
                              if (currentIndex < stages.length - 1) {
                                moveDeal(deal.id, stages[currentIndex + 1].id)
                              }
                            }}
                            className="p-1 rounded-lg hover:bg-surface-100 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <ApperIcon name="ArrowRight" className="w-4 h-4 text-surface-400" />
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="nova-card p-4 sm:p-6"
      >
        <h2 className="text-xl font-bold text-nova-text mb-6">Recent Activity</h2>
        <div className="space-y-1">
          {activities.map((activity) => (
            <div key={activity.id} className="nova-activity-item">
              <div className="w-8 h-8 bg-nova-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                <ApperIcon name="Activity" className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-nova-text">{activity.description}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-surface-500">{activity.user}</span>
                  <span className="text-xs text-surface-400">•</span>
                  <span className="text-xs text-surface-500">{activity.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )

  const renderContacts = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-nova-text">Contacts</h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-surface-400" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="nova-input pl-10 w-full sm:w-64"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Form */}
        <div className="nova-card p-6">
          <h2 className="text-xl font-semibold text-nova-text mb-4">Add New Contact</h2>
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name *"
              value={newContact.name}
              onChange={(e) => setNewContact({...newContact, name: e.target.value})}
              className="nova-input"
              required
            />
            <input
              type="email"
              placeholder="Email Address *"
              value={newContact.email}
              onChange={(e) => setNewContact({...newContact, email: e.target.value})}
              className="nova-input"
              required
            />
            <input
              type="text"
              placeholder="Company"
              value={newContact.company}
              onChange={(e) => setNewContact({...newContact, company: e.target.value})}
              className="nova-input"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={newContact.phone}
              onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
              className="nova-input"
            />
            <button type="submit" className="nova-button w-full">
              <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
              Add Contact
            </button>
          </form>
        </div>

        {/* Contacts List */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 gap-4">
            {filteredContacts.map((contact) => (
              <motion.div
                key={contact.id}
                layout
                className="nova-card p-6 hover:scale-102 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-nova-gradient rounded-xl flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {contact.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-nova-text">{contact.name}</h3>
                      <p className="text-surface-600 text-sm">{contact.email}</p>
                      {contact.company && (
                        <p className="text-surface-500 text-sm">{contact.company}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      contact.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {contact.status}
                    </span>
                    <button className="p-2 hover:bg-surface-100 rounded-lg transition-colors">
                      <ApperIcon name="Phone" className="w-4 h-4 text-surface-400" />
                    </button>
                    <button className="p-2 hover:bg-surface-100 rounded-lg transition-colors">
                      <ApperIcon name="Mail" className="w-4 h-4 text-surface-400" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderDeals = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-nova-text">Deals</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Deal Form */}
        <div className="nova-card p-6">
          <h2 className="text-xl font-semibold text-nova-text mb-4">Create New Deal</h2>
          <form onSubmit={handleDealSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Deal Title *"
              value={newDeal.title}
              onChange={(e) => setNewDeal({...newDeal, title: e.target.value})}
              className="nova-input"
              required
            />
            <input
              type="number"
              placeholder="Deal Value *"
              value={newDeal.value}
              onChange={(e) => setNewDeal({...newDeal, value: e.target.value})}
              className="nova-input"
              required
            />
            <input
              type="text"
              placeholder="Contact Name"
              value={newDeal.contact}
              onChange={(e) => setNewDeal({...newDeal, contact: e.target.value})}
              className="nova-input"
            />
            <select
              value={newDeal.stage}
              onChange={(e) => setNewDeal({...newDeal, stage: e.target.value})}
              className="nova-input"
            >
              {stages.map((stage) => (
                <option key={stage.id} value={stage.id}>{stage.title}</option>
              ))}
            </select>
            <button type="submit" className="nova-button w-full">
              <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
              Create Deal
            </button>
          </form>
        </div>

        {/* Deals List */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 gap-4">
            {deals.map((deal) => (
              <motion.div
                key={deal.id}
                layout
                className="nova-card p-6 hover:scale-102 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-semibold text-nova-text text-lg">{deal.title}</h3>
                    <p className="text-surface-600">Contact: {deal.contact}</p>
                    <p className="text-surface-500 text-sm">Owner: {deal.owner}</p>
                  </div>
                  <div className="flex flex-col sm:items-end mt-4 sm:mt-0">
                    <span className="text-2xl font-bold text-green-600 mb-2">${deal.value.toLocaleString()}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      stages.find(s => s.id === deal.stage)?.color
                    }`}>
                      {stages.find(s => s.id === deal.stage)?.title}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderTasks = () => (
    <div className="space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-nova-text">Tasks</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            layout
            className="nova-card p-6"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-nova-text">{task.title}</h3>
              <span className={`px-2 py-1 text-xs rounded-full ${
                task.priority === 'high' ? 'bg-red-100 text-red-800' :
                task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {task.priority}
              </span>
            </div>
            <p className="text-sm text-surface-600 mb-3">Due: {task.dueDate}</p>
            <div className="flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                task.status === 'completed' ? 'bg-green-100 text-green-800' :
                task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                'bg-surface-100 text-surface-800'
              }`}>
                {task.status}
              </span>
              <ApperIcon name="Clock" className="w-4 h-4 text-surface-400" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case 'contacts':
        return renderContacts()
      case 'deals':
        return renderDeals()
      case 'tasks':
        return renderTasks()
      case 'calendar':
        return (
          <div className="nova-card p-8 text-center">
            <ApperIcon name="Calendar" className="w-16 h-16 text-surface-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-nova-text mb-2">Calendar</h2>
            <p className="text-surface-600">Calendar functionality coming soon...</p>
          </div>
        )
      case 'reports':
        return (
          <div className="nova-card p-8 text-center">
            <ApperIcon name="BarChart3" className="w-16 h-16 text-surface-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-nova-text mb-2">Reports</h2>
            <p className="text-surface-600">Advanced reporting features coming soon...</p>
          </div>
        )
      case 'settings':
        return (
          <div className="nova-card p-8 text-center">
            <ApperIcon name="Settings" className="w-16 h-16 text-surface-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-nova-text mb-2">Settings</h2>
            <p className="text-surface-600">Configuration options coming soon...</p>
          </div>
        )
      default:
        return renderDashboard()
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default MainFeature