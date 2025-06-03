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

  const renderCalendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [events, setEvents] = useState([
      { id: 1, title: 'Team Meeting', date: '2024-01-15', time: '10:00', type: 'meeting', color: 'bg-blue-500' },
      { id: 2, title: 'Client Call - Acme Corp', date: '2024-01-16', time: '14:00', type: 'call', color: 'bg-green-500' },
      { id: 3, title: 'Product Demo', date: '2024-01-17', time: '15:30', type: 'demo', color: 'bg-purple-500' },
      { id: 4, title: 'Follow-up: TechStart', date: '2024-01-18', time: '11:00', type: 'follow-up', color: 'bg-orange-500' },
    ])
    const [showEventForm, setShowEventForm] = useState(false)
    const [newEvent, setNewEvent] = useState({ title: '', date: '', time: '', type: 'meeting' })

    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"]
    
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()
    
    const eventTypes = [
      { id: 'meeting', label: 'Meeting', color: 'bg-blue-500' },
      { id: 'call', label: 'Call', color: 'bg-green-500' },
      { id: 'demo', label: 'Demo', color: 'bg-purple-500' },
      { id: 'follow-up', label: 'Follow-up', color: 'bg-orange-500' },
    ]

    const handleEventSubmit = (e) => {
      e.preventDefault()
      if (!newEvent.title || !newEvent.date || !newEvent.time) {
        toast.error('Please fill in all required fields')
        return
      }
      
      const eventType = eventTypes.find(type => type.id === newEvent.type)
      const event = {
        id: Date.now(),
        ...newEvent,
        color: eventType.color
      }
      setEvents([...events, event])
      setNewEvent({ title: '', date: '', time: '', type: 'meeting' })
      setShowEventForm(false)
      toast.success('Event created successfully!')
    }

    const getEventsForDate = (date) => {
      const dateStr = date.toISOString().split('T')[0]
      return events.filter(event => event.date === dateStr)
    }

    const navigateMonth = (direction) => {
      const newDate = new Date(currentDate)
      newDate.setMonth(currentDate.getMonth() + direction)
      setCurrentDate(newDate)
    }

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-nova-text">Calendar</h1>
          <button
            onClick={() => setShowEventForm(true)}
            className="nova-button"
          >
            <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
            Add Event
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calendar Grid */}
          <div className="lg:col-span-3">
            <div className="nova-card p-6">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => navigateMonth(-1)}
                  className="p-2 hover:bg-surface-100 rounded-lg transition-colors"
                >
                  <ApperIcon name="ChevronLeft" className="w-5 h-5 text-nova-text" />
                </button>
                <h2 className="text-xl font-semibold text-nova-text">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <button
                  onClick={() => navigateMonth(1)}
                  className="p-2 hover:bg-surface-100 rounded-lg transition-colors"
                >
                  <ApperIcon name="ChevronRight" className="w-5 h-5 text-nova-text" />
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="p-2 text-center font-medium text-surface-600 text-sm">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {/* Empty cells for days before month starts */}
                {Array.from({ length: firstDayOfMonth }, (_, i) => (
                  <div key={`empty-${i}`} className="h-24 p-1"></div>
                ))}
                
                {/* Days of the month */}
                {Array.from({ length: daysInMonth }, (_, i) => {
                  const day = i + 1
                  const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
                  const dayEvents = getEventsForDate(date)
                  const isToday = date.toDateString() === new Date().toDateString()
                  const isSelected = date.toDateString() === selectedDate.toDateString()
                  
                  return (
                    <div
                      key={day}
                      onClick={() => setSelectedDate(date)}
                      className={`h-24 p-1 border border-surface-100 cursor-pointer hover:bg-surface-50 transition-colors ${
                        isToday ? 'bg-primary/10 border-primary' : ''
                      } ${isSelected ? 'bg-primary/20' : ''}`}
                    >
                      <div className={`text-sm font-medium mb-1 ${
                        isToday ? 'text-primary' : 'text-nova-text'
                      }`}>
                        {day}
                      </div>
                      <div className="space-y-1">
                        {dayEvents.slice(0, 2).map(event => (
                          <div
                            key={event.id}
                            className={`text-xs p-1 rounded text-white truncate ${event.color}`}
                          >
                            {event.time} {event.title}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-surface-500">
                            +{dayEvents.length - 2} more
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Events Sidebar */}
          <div className="space-y-6">
            <div className="nova-card p-6">
              <h3 className="font-semibold text-nova-text mb-4">
                Events for {selectedDate.toLocaleDateString()}
              </h3>
              <div className="space-y-3">
                {getEventsForDate(selectedDate).length > 0 ? (
                  getEventsForDate(selectedDate).map(event => (
                    <div key={event.id} className="flex items-center space-x-3 p-3 bg-surface-50 rounded-lg">
                      <div className={`w-3 h-3 rounded-full ${event.color}`}></div>
                      <div className="flex-1">
                        <p className="font-medium text-nova-text text-sm">{event.title}</p>
                        <p className="text-surface-600 text-xs">{event.time}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-surface-500 text-sm">No events scheduled</p>
                )}
              </div>
            </div>

            <div className="nova-card p-6">
              <h3 className="font-semibold text-nova-text mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setCurrentDate(new Date())}
                  className="w-full text-left p-2 hover:bg-surface-100 rounded-lg transition-colors text-sm"
                >
                  <ApperIcon name="Calendar" className="w-4 h-4 inline mr-2" />
                  Go to Today
                </button>
                <button
                  onClick={() => setShowEventForm(true)}
                  className="w-full text-left p-2 hover:bg-surface-100 rounded-lg transition-colors text-sm"
                >
                  <ApperIcon name="Plus" className="w-4 h-4 inline mr-2" />
                  Add Event
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Event Form Modal */}
        {showEventForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-nova-text">Add New Event</h2>
                <button
                  onClick={() => setShowEventForm(false)}
                  className="p-2 hover:bg-surface-100 rounded-lg transition-colors"
                >
                  <ApperIcon name="X" className="w-5 h-5 text-surface-400" />
                </button>
              </div>
              
              <form onSubmit={handleEventSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Event Title *"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  className="nova-input"
                  required
                />
                <input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                  className="nova-input"
                  required
                />
                <input
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                  className="nova-input"
                  required
                />
                <select
                  value={newEvent.type}
                  onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
                  className="nova-input"
                >
                  {eventTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.label}</option>
                  ))}
                </select>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowEventForm(false)}
                    className="flex-1 px-4 py-2 border border-surface-300 rounded-xl hover:bg-surface-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="flex-1 nova-button">
                    Add Event
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderReports = () => {
    const [reportPeriod, setReportPeriod] = useState('month')
    const [reportType, setReportType] = useState('overview')

    const reportMetrics = {
      sales: {
        total: 305000,
        growth: 12.5,
        deals: 23,
        conversion: 68
      },
      contacts: {
        total: 1247,
        new: 156,
        active: 892,
        conversion: 15.2
      },
      performance: {
        revenue: 305000,
        target: 350000,
        completion: 87.1,
        forecast: 420000
      }
    }

    const chartData = {
      revenue: [
        { month: 'Jan', value: 245000 },
        { month: 'Feb', value: 267000 },
        { month: 'Mar', value: 289000 },
        { month: 'Apr', value: 305000 }
      ],
      deals: [
        { stage: 'New', count: 15 },
        { stage: 'Contacted', count: 8 },
        { stage: 'Proposal', count: 12 },
        { stage: 'Negotiation', count: 6 },
        { stage: 'Closed', count: 23 }
      ]
    }

    const exportReport = () => {
      toast.success('Report exported successfully!')
    }

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-nova-text">Reports & Analytics</h1>
          <div className="flex gap-3">
            <select
              value={reportPeriod}
              onChange={(e) => setReportPeriod(e.target.value)}
              className="nova-input py-2"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
            <button onClick={exportReport} className="nova-button">
              <ApperIcon name="Download" className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Report Categories */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'sales', label: 'Sales Performance' },
            { id: 'contacts', label: 'Contact Analytics' },
            { id: 'pipeline', label: 'Pipeline Analysis' }
          ].map(category => (
            <button
              key={category.id}
              onClick={() => setReportType(category.id)}
              className={`px-4 py-2 rounded-xl transition-colors ${
                reportType === category.id
                  ? 'bg-nova-gradient text-white'
                  : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="nova-card p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-surface-600 text-sm font-medium">Total Revenue</p>
                <p className="text-2xl font-bold text-nova-text">${reportMetrics.sales.total.toLocaleString()}</p>
                <p className="text-sm text-green-600 mt-1">
                  +{reportMetrics.sales.growth}% from last period
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-xl">
                <ApperIcon name="DollarSign" className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="nova-card p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-surface-600 text-sm font-medium">Deals Closed</p>
                <p className="text-2xl font-bold text-nova-text">{reportMetrics.sales.deals}</p>
                <p className="text-sm text-blue-600 mt-1">
                  {reportMetrics.sales.conversion}% conversion rate
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl">
                <ApperIcon name="TrendingUp" className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="nova-card p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-surface-600 text-sm font-medium">Active Contacts</p>
                <p className="text-2xl font-bold text-nova-text">{reportMetrics.contacts.active}</p>
                <p className="text-sm text-purple-600 mt-1">
                  +{reportMetrics.contacts.new} new this period
                </p>
              </div>
              <div className="p-3 bg-purple-50 rounded-xl">
                <ApperIcon name="Users" className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="nova-card p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-surface-600 text-sm font-medium">Target Progress</p>
                <p className="text-2xl font-bold text-nova-text">{reportMetrics.performance.completion}%</p>
                <p className="text-sm text-orange-600 mt-1">
                  ${(reportMetrics.performance.target - reportMetrics.performance.revenue).toLocaleString()} remaining
                </p>
              </div>
              <div className="p-3 bg-orange-50 rounded-xl">
                <ApperIcon name="Target" className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="nova-card p-6"
          >
            <h3 className="text-lg font-semibold text-nova-text mb-4">Revenue Trend</h3>
            <div className="h-64 flex items-end justify-between space-x-2">
              {chartData.revenue.map((item, index) => (
                <div key={item.month} className="flex flex-col items-center flex-1">
                  <div
                    className="bg-nova-gradient rounded-t-lg w-full transition-all duration-500"
                    style={{ height: `${(item.value / Math.max(...chartData.revenue.map(d => d.value))) * 200}px` }}
                  ></div>
                  <span className="text-sm text-surface-600 mt-2">{item.month}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="nova-card p-6"
          >
            <h3 className="text-lg font-semibold text-nova-text mb-4">Pipeline Distribution</h3>
            <div className="space-y-4">
              {chartData.deals.map((item, index) => (
                <div key={item.stage} className="flex items-center space-x-4">
                  <span className="w-20 text-sm text-surface-600">{item.stage}</span>
                  <div className="flex-1 bg-surface-100 rounded-full h-3">
                    <div
                      className="bg-nova-gradient h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(item.count / Math.max(...chartData.deals.map(d => d.count))) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-nova-text w-8">{item.count}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Performance Summary */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="nova-card p-6"
        >
          <h3 className="text-lg font-semibold text-nova-text mb-4">Performance Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <ApperIcon name="TrendingUp" className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-nova-text">Strong Growth</h4>
              <p className="text-sm text-surface-600 mt-1">Revenue increased by {reportMetrics.sales.growth}% this period</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <ApperIcon name="Users" className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-nova-text">Contact Expansion</h4>
              <p className="text-sm text-surface-600 mt-1">{reportMetrics.contacts.new} new contacts added this period</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <ApperIcon name="Target" className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-nova-text">On Track</h4>
              <p className="text-sm text-surface-600 mt-1">{reportMetrics.performance.completion}% of monthly target achieved</p>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  const renderSettings = () => {
    const [activeTab, setActiveTab] = useState('profile')
    const [profile, setProfile] = useState({
      name: 'Alex Chen',
      email: 'alex@novacrm.com',
      phone: '+1 (555) 123-4567',
      company: 'Nova CRM',
      role: 'Sales Manager'
    })
    const [notifications, setNotifications] = useState({
      email: true,
      push: true,
      deals: true,
      tasks: true,
      reports: false
    })
    const [preferences, setPreferences] = useState({
      theme: 'light',
      language: 'en',
      timezone: 'PST',
      currency: 'USD'
    })

    const settingsTabs = [
      { id: 'profile', label: 'Profile', icon: 'User' },
      { id: 'notifications', label: 'Notifications', icon: 'Bell' },
      { id: 'security', label: 'Security', icon: 'Shield' },
      { id: 'preferences', label: 'Preferences', icon: 'Settings' },
      { id: 'data', label: 'Data Management', icon: 'Database' }
    ]

    const handleProfileSave = () => {
      toast.success('Profile updated successfully!')
    }

    const handleNotificationChange = (key) => {
      setNotifications(prev => ({ ...prev, [key]: !prev[key] }))
      toast.success('Notification preferences updated!')
    }

    const handlePasswordChange = () => {
      toast.success('Password updated successfully!')
    }

    const exportData = () => {
      toast.success('Data export initiated. Download will start shortly.')
    }

    const importData = () => {
      toast.success('Data import completed successfully!')
    }

    return (
      <div className="space-y-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-nova-text">Settings</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Settings Navigation */}
          <div className="nova-card p-6">
            <nav className="space-y-2">
              {settingsTabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all ${
                    activeTab === tab.id
                      ? 'bg-nova-gradient text-white'
                      : 'text-surface-600 hover:bg-surface-100 hover:text-nova-text'
                  }`}
                >
                  <ApperIcon name={tab.icon} className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Profile Settings */}
                {activeTab === 'profile' && (
                  <div className="nova-card p-6">
                    <h2 className="text-xl font-semibold text-nova-text mb-6">Profile Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2 flex items-center space-x-6">
                        <div className="w-20 h-20 bg-nova-gradient rounded-xl flex items-center justify-center">
                          <span className="text-white text-2xl font-bold">AC</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-nova-text">{profile.name}</h3>
                          <p className="text-surface-600">{profile.role}</p>
                          <button className="text-primary hover:underline text-sm mt-1">
                            Change Avatar
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-nova-text mb-2">Full Name</label>
                        <input
                          type="text"
                          value={profile.name}
                          onChange={(e) => setProfile({...profile, name: e.target.value})}
                          className="nova-input"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-nova-text mb-2">Email</label>
                        <input
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile({...profile, email: e.target.value})}
                          className="nova-input"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-nova-text mb-2">Phone</label>
                        <input
                          type="tel"
                          value={profile.phone}
                          onChange={(e) => setProfile({...profile, phone: e.target.value})}
                          className="nova-input"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-nova-text mb-2">Company</label>
                        <input
                          type="text"
                          value={profile.company}
                          onChange={(e) => setProfile({...profile, company: e.target.value})}
                          className="nova-input"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <button onClick={handleProfileSave} className="nova-button">
                          <ApperIcon name="Save" className="w-4 h-4 mr-2" />
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Notification Settings */}
                {activeTab === 'notifications' && (
                  <div className="nova-card p-6">
                    <h2 className="text-xl font-semibold text-nova-text mb-6">Notification Preferences</h2>
                    <div className="space-y-6">
                      {[
                        { key: 'email', label: 'Email Notifications', description: 'Receive notifications via email' },
                        { key: 'push', label: 'Push Notifications', description: 'Receive push notifications in browser' },
                        { key: 'deals', label: 'Deal Updates', description: 'Notifications about deal status changes' },
                        { key: 'tasks', label: 'Task Reminders', description: 'Reminders for upcoming tasks' },
                        { key: 'reports', label: 'Weekly Reports', description: 'Automated weekly performance reports' }
                      ].map(item => (
                        <div key={item.key} className="flex items-center justify-between p-4 bg-surface-50 rounded-xl">
                          <div>
                            <h3 className="font-medium text-nova-text">{item.label}</h3>
                            <p className="text-sm text-surface-600">{item.description}</p>
                          </div>
                          <button
                            onClick={() => handleNotificationChange(item.key)}
                            className={`relative w-12 h-6 rounded-full transition-colors ${
                              notifications[item.key] ? 'bg-primary' : 'bg-surface-300'
                            }`}
                          >
                            <div className={`absolute w-4 h-4 bg-white rounded-full transition-transform top-1 ${
                              notifications[item.key] ? 'translate-x-7' : 'translate-x-1'
                            }`}></div>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Security Settings */}
                {activeTab === 'security' && (
                  <div className="nova-card p-6">
                    <h2 className="text-xl font-semibold text-nova-text mb-6">Security Settings</h2>
                    <div className="space-y-6">
                      <div className="p-4 bg-surface-50 rounded-xl">
                        <h3 className="font-medium text-nova-text mb-2">Change Password</h3>
                        <p className="text-sm text-surface-600 mb-4">Update your password to keep your account secure</p>
                        <div className="space-y-3">
                          <input type="password" placeholder="Current Password" className="nova-input" />
                          <input type="password" placeholder="New Password" className="nova-input" />
                          <input type="password" placeholder="Confirm New Password" className="nova-input" />
                          <button onClick={handlePasswordChange} className="nova-button">
                            Update Password
                          </button>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-surface-50 rounded-xl">
                        <h3 className="font-medium text-nova-text mb-2">Two-Factor Authentication</h3>
                        <p className="text-sm text-surface-600 mb-4">Add an extra layer of security to your account</p>
                        <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                          <ApperIcon name="Shield" className="w-4 h-4 inline mr-2" />
                          Enable 2FA
                        </button>
                      </div>
                      
                      <div className="p-4 bg-surface-50 rounded-xl">
                        <h3 className="font-medium text-nova-text mb-2">Active Sessions</h3>
                        <p className="text-sm text-surface-600 mb-4">Manage devices that are currently signed in</p>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-2 bg-white rounded-lg">
                            <span className="text-sm">Current Session - Chrome on MacOS</span>
                            <span className="text-xs text-green-600">Active</span>
                          </div>
                          <button className="text-red-600 hover:underline text-sm">
                            Sign out all other sessions
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Preferences */}
                {activeTab === 'preferences' && (
                  <div className="nova-card p-6">
                    <h2 className="text-xl font-semibold text-nova-text mb-6">Preferences</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-nova-text mb-2">Theme</label>
                        <select
                          value={preferences.theme}
                          onChange={(e) => setPreferences({...preferences, theme: e.target.value})}
                          className="nova-input"
                        >
                          <option value="light">Light</option>
                          <option value="dark">Dark</option>
                          <option value="auto">Auto</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-nova-text mb-2">Language</label>
                        <select
                          value={preferences.language}
                          onChange={(e) => setPreferences({...preferences, language: e.target.value})}
                          className="nova-input"
                        >
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                          <option value="de">German</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-nova-text mb-2">Timezone</label>
                        <select
                          value={preferences.timezone}
                          onChange={(e) => setPreferences({...preferences, timezone: e.target.value})}
                          className="nova-input"
                        >
                          <option value="PST">Pacific Standard Time</option>
                          <option value="EST">Eastern Standard Time</option>
                          <option value="GMT">Greenwich Mean Time</option>
                          <option value="CET">Central European Time</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-nova-text mb-2">Currency</label>
                        <select
                          value={preferences.currency}
                          onChange={(e) => setPreferences({...preferences, currency: e.target.value})}
                          className="nova-input"
                        >
                          <option value="USD">US Dollar ($)</option>
                          <option value="EUR">Euro (€)</option>
                          <option value="GBP">British Pound (£)</option>
                          <option value="CAD">Canadian Dollar (C$)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Data Management */}
                {activeTab === 'data' && (
                  <div className="nova-card p-6">
                    <h2 className="text-xl font-semibold text-nova-text mb-6">Data Management</h2>
                    <div className="space-y-6">
                      <div className="p-4 bg-surface-50 rounded-xl">
                        <h3 className="font-medium text-nova-text mb-2">Export Data</h3>
                        <p className="text-sm text-surface-600 mb-4">Download all your CRM data in CSV format</p>
                        <button onClick={exportData} className="nova-button">
                          <ApperIcon name="Download" className="w-4 h-4 mr-2" />
                          Export All Data
                        </button>
                      </div>
                      
                      <div className="p-4 bg-surface-50 rounded-xl">
                        <h3 className="font-medium text-nova-text mb-2">Import Data</h3>
                        <p className="text-sm text-surface-600 mb-4">Import contacts and deals from CSV files</p>
                        <button onClick={importData} className="px-4 py-2 border border-surface-300 rounded-xl hover:bg-surface-100 transition-colors">
                          <ApperIcon name="Upload" className="w-4 h-4 mr-2" />
                          Import Data
                        </button>
                      </div>
                      
                      <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                        <h3 className="font-medium text-red-800 mb-2">Danger Zone</h3>
                        <p className="text-sm text-red-600 mb-4">Permanently delete your account and all associated data</p>
                        <button className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors">
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    )
  }
  const renderContent = () => {
    switch (activeSection) {
      case 'contacts':
        return renderContacts()
      case 'deals':
        return renderDeals()
      case 'tasks':
        return renderTasks()
case 'calendar':
        return renderCalendar()
      case 'reports':
        return renderReports()
      case 'settings':
        return renderSettings()
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