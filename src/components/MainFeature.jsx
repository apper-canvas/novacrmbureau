import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import Chart from 'react-apexcharts'
import { format, addDays, startOfWeek, endOfWeek, isSameDay, isSameMonth, startOfMonth, endOfMonth, addMonths, subMonths } from 'date-fns'

const MainFeature = ({ activeSection }) => {
  // Dashboard state
  const [dashboardData, setDashboardData] = useState({
    totalContacts: 1250,
    totalDeals: 87,
    revenue: 542000,
    tasksCompleted: 156
  })

  // Contacts state
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Sarah Wilson', email: 'sarah@example.com', company: 'Tech Corp', status: 'active', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face' },
    { id: 2, name: 'Michael Chen', email: 'michael@example.com', company: 'Design Studio', status: 'active', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face' },
    { id: 3, name: 'Emily Rodriguez', email: 'emily@example.com', company: 'Marketing Plus', status: 'inactive', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face' }
  ])
  const [contactForm, setContactForm] = useState({ name: '', email: '', company: '', phone: '' })
  const [showContactModal, setShowContactModal] = useState(false)
  const [editingContact, setEditingContact] = useState(null)

  // Deals state
  const [deals, setDeals] = useState([
    { id: 1, title: 'Website Redesign', company: 'Tech Corp', value: 25000, stage: 'proposal', probability: 75, contact: 'Sarah Wilson' },
    { id: 2, title: 'Mobile App Development', company: 'StartupXYZ', value: 80000, stage: 'negotiation', probability: 60, contact: 'John Smith' },
    { id: 3, title: 'Brand Strategy', company: 'Fashion Brand', value: 15000, stage: 'qualified', probability: 90, contact: 'Lisa Johnson' }
  ])
  const [dealForm, setDealForm] = useState({ title: '', company: '', value: '', stage: 'qualified', probability: 50, contact: '' })
  const [showDealModal, setShowDealModal] = useState(false)
  const [editingDeal, setEditingDeal] = useState(null)

  // Tasks state
  const [tasks, setTasks] = useState({
    todo: [
      { id: 1, title: 'Call Sarah Wilson', description: 'Follow up on website redesign proposal', priority: 'high', assignee: 'You', dueDate: '2024-01-20' },
      { id: 2, title: 'Prepare presentation', description: 'Create slides for next week\'s client meeting', priority: 'medium', assignee: 'You', dueDate: '2024-01-22' }
    ],
    inprogress: [
      { id: 3, title: 'Review contracts', description: 'Go through legal documents for pending deals', priority: 'high', assignee: 'Legal Team', dueDate: '2024-01-21' }
    ],
    done: [
      { id: 4, title: 'Update CRM data', description: 'Import new contact information from last event', priority: 'low', assignee: 'You', dueDate: '2024-01-18' }
    ]
  })
  const [taskForm, setTaskForm] = useState({ title: '', description: '', priority: 'medium', assignee: '', dueDate: '' })
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [draggedTask, setDraggedTask] = useState(null)

  // Calendar state - Fixed initialization and event handling
  const [calendarCurrentDate, setCalendarCurrentDate] = useState(new Date())
  const [calendarView, setCalendarView] = useState('month')
  const [calendarEvents, setCalendarEvents] = useState([
    { id: 1, title: 'Team Meeting', date: new Date(2024, 0, 20, 10, 0), type: 'meeting', description: 'Weekly team sync' },
    { id: 2, title: 'Client Call', date: new Date(2024, 0, 22, 14, 30), type: 'call', description: 'Project review with Sarah Wilson' },
    { id: 3, title: 'Project Deadline', date: new Date(2024, 0, 25, 17, 0), type: 'deadline', description: 'Website redesign completion' }
  ])
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(null)
  const [showEventModal, setShowEventModal] = useState(false)
  const [eventForm, setEventForm] = useState({ title: '', date: '', time: '', type: 'meeting', description: '' })

  // Reports state - Fixed chart configuration
  const [reportsLoading, setReportsLoading] = useState(false)
  const [reportsPeriod, setReportsPeriod] = useState('month')
  const [reportsData, setReportsData] = useState({
    revenue: { current: 542000, previous: 485000, growth: 11.7 },
    deals: { current: 87, previous: 72, growth: 20.8 },
    contacts: { current: 1250, previous: 1180, growth: 5.9 }
  })

  // Settings state - Fixed form handling
  const [settingsLoading, setSettingsLoading] = useState(false)
  const [settingsData, setSettingsData] = useState({
    profile: { name: 'Alex Chen', email: 'alex@company.com', phone: '+1 (555) 123-4567', company: 'Nova Corp' },
    notifications: { email: true, push: true, sms: false, marketing: true },
    privacy: { profileVisibility: 'team', dataSharing: false, analytics: true },
    preferences: { language: 'en', timezone: 'UTC-8', dateFormat: 'MM/DD/YYYY', currency: 'USD' }
  })
  const [settingsChanged, setSettingsChanged] = useState(false)
const [settingsChanged, setSettingsChanged] = useState(false)

  // Additional state for forms and functionality
  const [newContact, setNewContact] = useState({ name: '', email: '', company: '', phone: '' })
  const [newDeal, setNewDeal] = useState({ title: '', value: '', contact: '', stage: 'qualified' })
  
  // Companies state
  const [companies, setCompanies] = useState([
    { id: 1, name: 'Tech Corp', industry: 'Technology', employees: 500, revenue: 50000000, location: 'San Francisco, CA', status: 'Active', contact: 'Sarah Wilson', email: 'sarah@techcorp.com', phone: '+1 (555) 123-4567', website: 'https://techcorp.com', founded: 2010, description: 'Leading technology solutions provider' },
    { id: 2, name: 'Design Studio', industry: 'Design', employees: 50, revenue: 5000000, location: 'New York, NY', status: 'Active', contact: 'Michael Chen', email: 'michael@designstudio.com', phone: '+1 (555) 234-5678', website: 'https://designstudio.com', founded: 2015, description: 'Creative design and branding agency' },
    { id: 3, name: 'StartupXYZ', industry: 'Technology', employees: 25, revenue: 2000000, location: 'Austin, TX', status: 'Prospect', contact: 'John Smith', email: 'john@startupxyz.com', phone: '+1 (555) 345-6789', website: 'https://startupxyz.com', founded: 2020, description: 'Innovative startup in the tech space' }
  ])
  const [companiesSearch, setCompaniesSearch] = useState('')
  const [showAddCompanyModal, setShowAddCompanyModal] = useState(false)
  const [showEditCompanyModal, setShowEditCompanyModal] = useState(false)
  const [showCompanyDetails, setShowCompanyDetails] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [companyForm, setCompanyForm] = useState({
    name: '', industry: '', employees: '', revenue: '', location: '', status: 'Prospect',
    contact: '', email: '', phone: '', website: '', founded: '', description: ''
  })

  // Helper functions
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const formatNumber = (number) => {
    return new Intl.NumberFormat('en-US').format(number)
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-surface-100 text-surface-800'
    }
  }

  // Stats for dashboard
  const stats = [
    { title: 'Total Contacts', value: formatNumber(dashboardData.totalContacts), change: '+12%', icon: 'Users', color: 'text-blue-600' },
    { title: 'Active Deals', value: formatNumber(dashboardData.totalDeals), change: '+8%', icon: 'Target', color: 'text-green-600' },
    { title: 'Revenue', value: formatCurrency(dashboardData.revenue), change: '+15%', icon: 'TrendingUp', color: 'text-purple-600' },
    { title: 'Tasks Done', value: formatNumber(dashboardData.tasksCompleted), change: '+23%', icon: 'CheckCircle', color: 'text-orange-600' }
  ]

  // Deal stages
  const stages = [
    { id: 'qualified', title: 'Qualified', color: 'bg-blue-100 text-blue-800' },
    { id: 'proposal', title: 'Proposal', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'negotiation', title: 'Negotiation', color: 'bg-orange-100 text-orange-800' },
    { id: 'closed', title: 'Closed', color: 'bg-green-100 text-green-800' }
  ]

  // Calendar functions - Fixed event handling and validation
  const navigateCalendar = (direction) => {
    try {
      setCalendarCurrentDate(prev => {
        if (calendarView === 'month') {
          return direction === 'prev' ? subMonths(prev, 1) : addMonths(prev, 1)
        }
        return direction === 'prev' ? addDays(prev, -7) : addDays(prev, 7)
      })
    } catch (error) {
      toast.error('Error navigating calendar')
      console.error('Calendar navigation error:', error)
    }
  }

  const handleEventSubmit = (e) => {
    e.preventDefault()
    try {
      if (!eventForm.title || !eventForm.date || !eventForm.time) {
        toast.error('Please fill in all required fields')
        return
      }

      const eventDate = new Date(`${eventForm.date}T${eventForm.time}`)
      if (isNaN(eventDate.getTime())) {
        toast.error('Invalid date or time')
        return
      }

      const newEvent = {
        id: Date.now(),
        title: eventForm.title,
        date: eventDate,
        type: eventForm.type,
        description: eventForm.description
      }

      setCalendarEvents(prev => [...prev, newEvent])
      setEventForm({ title: '', date: '', time: '', type: 'meeting', description: '' })
      setShowEventModal(false)
      toast.success('Event created successfully')
    } catch (error) {
      toast.error('Error creating event')
      console.error('Event creation error:', error)
    }
  }

  const handleDeleteEvent = (eventId) => {
    try {
      setCalendarEvents(prev => prev.filter(event => event.id !== eventId))
      toast.success('Event deleted successfully')
    } catch (error) {
      toast.error('Error deleting event')
      console.error('Event deletion error:', error)
    }
  }

  const getCalendarDays = () => {
    try {
      const start = startOfWeek(startOfMonth(calendarCurrentDate))
      const end = endOfWeek(endOfMonth(calendarCurrentDate))
      const days = []
      let day = start

      while (day <= end) {
        days.push(day)
        day = addDays(day, 1)
      }

      return days
    } catch (error) {
      console.error('Calendar days calculation error:', error)
      return []
    }
  }

  const getEventsForDate = (date) => {
    try {
      return calendarEvents.filter(event => 
        isSameDay(event.date, date)
      )
    } catch (error) {
      console.error('Events filtering error:', error)
      return []
    }
  }

  // Reports functions - Fixed chart configuration and data handling
  const handleReportsPeriodChange = (period) => {
    try {
      setReportsPeriod(period)
      setReportsLoading(true)
      
      // Simulate data loading with proper error handling
      setTimeout(() => {
        try {
          setReportsLoading(false)
          toast.success('Reports updated successfully')
        } catch (error) {
          setReportsLoading(false)
          toast.error('Error updating reports')
          console.error('Reports update error:', error)
        }
      }, 1000)
    } catch (error) {
      toast.error('Error changing report period')
      console.error('Reports period change error:', error)
    }
  }

  // Settings functions - Fixed form validation and state management
  const handleSettingsChange = (section, field, value) => {
    try {
      setSettingsData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }))
      setSettingsChanged(true)
    } catch (error) {
      toast.error('Error updating settings')
      console.error('Settings change error:', error)
    }
  }

  const handleSettingsSave = () => {
    try {
      setSettingsLoading(true)
      
      // Validate settings before saving
      if (!settingsData.profile.name || !settingsData.profile.email) {
        toast.error('Name and email are required')
        setSettingsLoading(false)
        return
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(settingsData.profile.email)) {
        toast.error('Please enter a valid email address')
        setSettingsLoading(false)
        return
      }

      // Simulate save operation with proper error handling
      setTimeout(() => {
        try {
          setSettingsLoading(false)
          setSettingsChanged(false)
          toast.success('Settings saved successfully!')
        } catch (error) {
          setSettingsLoading(false)
          toast.error('Error saving settings')
          console.error('Settings save error:', error)
        }
      }, 1000)
    } catch (error) {
      setSettingsLoading(false)
      toast.error('Error saving settings')
      console.error('Settings save error:', error)
    }
  }

  // Contact functions
  const handleContactSubmit = (e) => {
    e.preventDefault()
    
    if (!contactForm.name || !contactForm.email) {
      toast.error('Name and email are required')
      return
    }

    if (editingContact) {
      setContacts(prev => prev.map(contact => 
        contact.id === editingContact.id 
          ? { ...contact, ...contactForm }
          : contact
      ))
      toast.success('Contact updated successfully')
    } else {
      const newContactObj = {
        id: Date.now(),
        ...contactForm,
        status: 'active',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
      }
      setContacts(prev => [...prev, newContactObj])
      toast.success('Contact added successfully')
    }

    setContactForm({ name: '', email: '', company: '', phone: '' })
    setShowContactModal(false)
    setEditingContact(null)
  }

  // Deal form handler
const handleDealSubmit = (e) => {
    e.preventDefault()
    
    if (!dealForm.title || !dealForm.value) {
      toast.error('Title and value are required')
      return
    }

    if (editingDeal) {
      setDeals(prev => prev.map(deal => 
        deal.id === editingDeal.id 
          ? { ...deal, ...dealForm, value: parseInt(dealForm.value) }
          : deal
      ))
      toast.success('Deal updated successfully')
    } else {
      const deal = {
        id: Date.now(),
        ...dealForm,
        value: parseInt(dealForm.value),
        company: dealForm.contact || 'Unknown',
        probability: dealForm.probability || 75
      }
      setDeals([...deals, deal])
      toast.success('Deal created successfully!')
    }

    setDealForm({ title: '', company: '', value: '', stage: 'qualified', probability: 50, contact: '' })
    setShowDealModal(false)
    setEditingDeal(null)
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

  // Filtered companies for search
  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(companiesSearch.toLowerCase()) ||
    company.industry.toLowerCase().includes(companiesSearch.toLowerCase()) ||
    company.location.toLowerCase().includes(companiesSearch.toLowerCase())
  )

  // Company handlers
  const handleAddCompany = () => {
    try {
      if (!companyForm.name || !companyForm.industry || !companyForm.contact || !companyForm.email) {
        toast.error('Please fill in all required fields')
        return
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(companyForm.email)) {
        toast.error('Please enter a valid email address')
        return
      }

      const newCompany = {
        id: Date.now(),
        ...companyForm,
        employees: parseInt(companyForm.employees) || 0,
        revenue: parseInt(companyForm.revenue) || 0,
        founded: parseInt(companyForm.founded) || new Date().getFullYear()
      }

      setCompanies(prev => [...prev, newCompany])
      setCompanyForm({
        name: '', industry: '', employees: '', revenue: '', location: '', status: 'Prospect',
        contact: '', email: '', phone: '', website: '', founded: '', description: ''
      })
      setShowAddCompanyModal(false)
      toast.success('Company added successfully')
    } catch (error) {
      toast.error('Error adding company')
      console.error('Company addition error:', error)
    }
  }

  const handleEditCompany = () => {
    try {
      if (!companyForm.name || !companyForm.industry || !companyForm.contact || !companyForm.email) {
        toast.error('Please fill in all required fields')
        return
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(companyForm.email)) {
        toast.error('Please enter a valid email address')
        return
      }

      const updatedCompany = {
        ...selectedCompany,
        ...companyForm,
        employees: parseInt(companyForm.employees) || 0,
        revenue: parseInt(companyForm.revenue) || 0,
        founded: parseInt(companyForm.founded) || new Date().getFullYear()
      }

      setCompanies(prev => prev.map(company => 
        company.id === selectedCompany.id ? updatedCompany : company
      ))
      setShowEditCompanyModal(false)
      setShowCompanyDetails(false)
      setSelectedCompany(null)
      toast.success('Company updated successfully')
    } catch (error) {
      toast.error('Error updating company')
      console.error('Company update error:', error)
    }
  }

  const handleDeleteCompany = (company) => {
    try {
      if (window.confirm(`Are you sure you want to delete ${company.name}?`)) {
        setCompanies(prev => prev.filter(c => c.id !== company.id))
        setShowCompanyDetails(false)
        setSelectedCompany(null)
        toast.success('Company deleted successfully')
      }
    } catch (error) {
      toast.error('Error deleting company')
      console.error('Company deletion error:', error)
    }
  }

  const openCompanyDetails = (company) => {
    setSelectedCompany(company)
    setShowCompanyDetails(true)
  }

  const openEditCompanyModal = (company) => {
    setSelectedCompany(company)
    setCompanyForm({
      name: company.name,
      industry: company.industry,
      employees: company.employees.toString(),
      revenue: company.revenue.toString(),
      location: company.location,
      status: company.status,
      contact: company.contact,
      email: company.email,
      phone: company.phone,
      website: company.website,
      founded: company.founded.toString(),
      description: company.description
    })
    setShowEditCompanyModal(true)
    setShowCompanyDetails(false)
  }

  // Dashboard render function with stats card implementation
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
                <p className="text-2xl font-bold text-nova-text">{stat.value}</p>
                <p className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <ApperIcon name={stat.icon} className={`w-6 h-6 text-white`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="nova-card p-6"
        >
          <h3 className="text-lg font-semibold text-nova-text mb-4">Recent Activities</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <ApperIcon name="CheckCircle" className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-nova-text">Deal closed with Tech Corp</p>
                <p className="text-xs text-surface-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <ApperIcon name="Users" className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-nova-text">3 new contacts added</p>
                <p className="text-xs text-surface-500">4 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <ApperIcon name="Calendar" className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-nova-text">Meeting scheduled for tomorrow</p>
                <p className="text-xs text-surface-500">1 day ago</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="nova-card p-6"
        >
          <h3 className="text-lg font-semibold text-nova-text mb-4">Upcoming Tasks</h3>
<div className="space-y-4">
            {tasks.todo.slice(0, 3).map((task, index) => (
              <motion.div 
                key={task.id} 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-surface-50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full group-hover:scale-150 transition-transform"></div>
                  <div>
                    <p className="text-sm font-medium text-nova-text">{task.title}</p>
                    <p className="text-xs text-surface-500">Due: {task.dueDate}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                  task.priority === 'high' 
                    ? 'bg-gradient-to-r from-red-100 to-pink-100 text-red-700 border border-red-200' 
                    : task.priority === 'medium'
                    ? 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-700 border border-yellow-200'
                    : 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border border-blue-200'
                }`}>
                  {task.priority}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )

  const renderContacts = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-nova-text">Contacts</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400 w-4 h-4" />
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
              value={contactForm.name}
              onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
              className="nova-input"
              required
            />
            <input
              type="email"
placeholder="Email Address *"
              value={contactForm.email}
              onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
              className="nova-input"
              required
            />
            <input
              type="text"
placeholder="Company"
              value={contactForm.company}
              onChange={(e) => setContactForm({...contactForm, company: e.target.value})}
              className="nova-input"
            />
            <input
              type="tel"
placeholder="Phone Number"
              value={contactForm.phone}
              onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
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
              value={dealForm.title}
              onChange={(e) => setDealForm({...dealForm, title: e.target.value})}
              className="nova-input"
              required
            />
            <input
              type="number"
placeholder="Deal Value *"
              value={dealForm.value}
              onChange={(e) => setDealForm({...dealForm, value: e.target.value})}
              className="nova-input"
              required
            />
            <input
              type="text"
placeholder="Contact Name"
              value={dealForm.contact}
              onChange={(e) => setDealForm({...dealForm, contact: e.target.value})}
              className="nova-input"
            />
            <select
value={dealForm.stage}
              onChange={(e) => setDealForm({...dealForm, stage: e.target.value})}
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
                  <div className="flex-1">
                    <h3 className="font-semibold text-nova-text mb-2">{deal.title}</h3>
                    <p className="text-surface-600 text-sm mb-2">{deal.company}</p>
                    <p className="text-lg font-bold text-green-600">{formatCurrency(deal.value)}</p>
                    <p className="text-sm text-surface-600">Contact: {deal.contact}</p>
                  </div>
                  <div className="mt-4 sm:mt-0 flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      stages.find(s => s.id === deal.stage)?.color || 'bg-gray-100 text-gray-800'
                    }`}>
                      {stages.find(s => s.id === deal.stage)?.title || deal.stage}
                    </span>
                    <span className="text-sm text-surface-600">{deal.probability}%</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-nova-text">Companies</h1>
            <p className="text-surface-600 mt-1">Manage your company relationships</p>
          </div>
          <button
            onClick={() => setShowAddCompanyModal(true)}
            className="nova-button flex items-center space-x-2"
          >
            <ApperIcon name="Plus" className="w-5 h-5" />
            <span>Add Company</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="nova-card p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-surface-400" />
                <input
                  type="text"
                  placeholder="Search companies..."
                  value={companiesSearch}
                  onChange={(e) => setCompaniesSearch(e.target.value)}
                  className="nova-input pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select className="nova-input">
                <option value="">All Industries</option>
                <option value="technology">Technology</option>
                <option value="finance">Finance</option>
                <option value="healthcare">Healthcare</option>
                <option value="retail">Retail</option>
                <option value="energy">Energy</option>
              </select>
              <select className="nova-input">
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="prospect">Prospect</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="nova-card p-6 hover:shadow-nova transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-nova-gradient rounded-xl flex items-center justify-center">
                    <ApperIcon name="Building2" className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-nova-text">{company.name}</h3>
                    <p className="text-sm text-surface-600">{company.industry}</p>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    company.status === 'Active'
                      ? 'bg-green-100 text-green-700'
                      : company.status === 'Prospect'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {company.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-surface-600">
                  <ApperIcon name="MapPin" className="w-4 h-4" />
                  <span>{company.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-surface-600">
                  <ApperIcon name="Users" className="w-4 h-4" />
                  <span>{company.employees} employees</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-surface-600">
                  <ApperIcon name="User" className="w-4 h-4" />
                  <span>{company.contact}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-surface-600">
                  <ApperIcon name="DollarSign" className="w-4 h-4" />
                  <span>${(company.revenue / 1000000).toFixed(1)}M revenue</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-surface-100">
                <button
                  onClick={() => openCompanyDetails(company)}
                  className="text-primary hover:text-primary-dark font-medium text-sm transition-colors"
                >
                  View Details
                </button>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openEditCompanyModal(company)}
                    className="p-2 rounded-lg hover:bg-surface-100 transition-colors"
                  >
                    <ApperIcon name="Edit" className="w-4 h-4 text-surface-600" />
                  </button>
                  <button
                    onClick={() => handleDeleteCompany(company)}
                    className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <ApperIcon name="Trash2" className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <div className="nova-card p-12 text-center">
            <ApperIcon name="Building2" className="w-16 h-16 text-surface-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-surface-600 mb-2">No companies found</h3>
            <p className="text-surface-500 mb-4">Try adjusting your search criteria or add a new company.</p>
            <button
              onClick={() => setShowAddCompanyModal(true)}
              className="nova-button"
            >
              Add First Company
            </button>
          </div>
        )}

        {/* Add Company Modal */}
        {showAddCompanyModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-nova max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-surface-100">
                <h2 className="text-2xl font-bold text-nova-text">Add New Company</h2>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">Company Name *</label>
                    <input
                      type="text"
                      value={companyForm.name}
                      onChange={(e) => setCompanyForm({...companyForm, name: e.target.value})}
                      className="nova-input"
                      placeholder="Enter company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">Industry *</label>
                    <select
                      value={companyForm.industry}
                      onChange={(e) => setCompanyForm({...companyForm, industry: e.target.value})}
                      className="nova-input"
                    >
                      <option value="">Select industry</option>
                      <option value="Technology">Technology</option>
                      <option value="Finance">Finance</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Retail">Retail</option>
                      <option value="Energy">Energy</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Education">Education</option>
                      <option value="Real Estate">Real Estate</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">Employees</label>
                    <input
                      type="number"
                      value={companyForm.employees}
                      onChange={(e) => setCompanyForm({...companyForm, employees: e.target.value})}
                      className="nova-input"
                      placeholder="Number of employees"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">Annual Revenue</label>
                    <input
                      type="number"
                      value={companyForm.revenue}
                      onChange={(e) => setCompanyForm({...companyForm, revenue: e.target.value})}
                      className="nova-input"
                      placeholder="Annual revenue in USD"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">Location</label>
                    <input
                      type="text"
                      value={companyForm.location}
                      onChange={(e) => setCompanyForm({...companyForm, location: e.target.value})}
                      className="nova-input"
                      placeholder="City, State/Country"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">Status</label>
                    <select
                      value={companyForm.status}
                      onChange={(e) => setCompanyForm({...companyForm, status: e.target.value})}
                      className="nova-input"
                    >
                      <option value="Prospect">Prospect</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">Primary Contact *</label>
                    <input
                      type="text"
                      value={companyForm.contact}
                      onChange={(e) => setCompanyForm({...companyForm, contact: e.target.value})}
                      className="nova-input"
                      placeholder="Contact person name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">Email *</label>
                    <input
                      type="email"
                      value={companyForm.email}
                      onChange={(e) => setCompanyForm({...companyForm, email: e.target.value})}
                      className="nova-input"
                      placeholder="contact@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={companyForm.phone}
                      onChange={(e) => setCompanyForm({...companyForm, phone: e.target.value})}
                      className="nova-input"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">Website</label>
                    <input
                      type="url"
                      value={companyForm.website}
                      onChange={(e) => setCompanyForm({...companyForm, website: e.target.value})}
                      className="nova-input"
                      placeholder="https://company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">Founded Year</label>
                    <input
                      type="number"
                      value={companyForm.founded}
                      onChange={(e) => setCompanyForm({...companyForm, founded: e.target.value})}
                      className="nova-input"
                      placeholder="2020"
                      min="1800"
                      max={new Date().getFullYear()}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-2">Description</label>
                  <textarea
                    value={companyForm.description}
                    onChange={(e) => setCompanyForm({...companyForm, description: e.target.value})}
                    className="nova-input"
                    rows="3"
                    placeholder="Brief description of the company..."
                  />
                </div>
              </div>
              
              <div className="p-6 border-t border-surface-100 flex justify-end space-x-3">
                <button
                  onClick={() => setShowAddCompanyModal(false)}
                  className="nova-button-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCompany}
                  className="nova-button"
                >
                  Add Company
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Edit Company Modal */}
        {showEditCompanyModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-nova max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-surface-100">
                <h2 className="text-2xl font-bold text-nova-text">Edit Company</h2>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">Company Name *</label>
                    <input
                      type="text"
                      value={companyForm.name}
                      onChange={(e) => setCompanyForm({...companyForm, name: e.target.value})}
                      className="nova-input"
                      placeholder="Enter company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">Industry *</label>
                    <select
                      value={companyForm.industry}
                      onChange={(e) => setCompanyForm({...companyForm, industry: e.target.value})}
                      className="nova-input"
                    >
                      <option value="">Select industry</option>
                      <option value="Technology">Technology</option>
                      <option value="Finance">Finance</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Retail">Retail</option>
                      <option value="Energy">Energy</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Education">Education</option>
                      <option value="Real Estate">Real Estate</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">Employees</label>
                    <input
                      type="number"
                      value={companyForm.employees}
                      onChange={(e) => setCompanyForm({...companyForm, employees: e.target.value})}
                      className="nova-input"
                      placeholder="Number of employees"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">Annual Revenue</label>
                    <input
                      type="number"
                      value={companyForm.revenue}
                      onChange={(e) => setCompanyForm({...companyForm, revenue: e.target.value})}
                      className="nova-input"
                      placeholder="Annual revenue in USD"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">Location</label>
                    <input
                      type="text"
                      value={companyForm.location}
                      onChange={(e) => setCompanyForm({...companyForm, location: e.target.value})}
                      className="nova-input"
                      placeholder="City, State/Country"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">Status</label>
                    <select
                      value={companyForm.status}
                      onChange={(e) => setCompanyForm({...companyForm, status: e.target.value})}
                      className="nova-input"
                    >
                      <option value="Prospect">Prospect</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">Primary Contact *</label>
                    <input
                      type="text"
                      value={companyForm.contact}
                      onChange={(e) => setCompanyForm({...companyForm, contact: e.target.value})}
                      className="nova-input"
                      placeholder="Contact person name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">Email *</label>
                    <input
                      type="email"
                      value={companyForm.email}
                      onChange={(e) => setCompanyForm({...companyForm, email: e.target.value})}
                      className="nova-input"
                      placeholder="contact@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={companyForm.phone}
                      onChange={(e) => setCompanyForm({...companyForm, phone: e.target.value})}
                      className="nova-input"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">Website</label>
                    <input
                      type="url"
                      value={companyForm.website}
                      onChange={(e) => setCompanyForm({...companyForm, website: e.target.value})}
                      className="nova-input"
                      placeholder="https://company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">Founded Year</label>
                    <input
                      type="number"
                      value={companyForm.founded}
                      onChange={(e) => setCompanyForm({...companyForm, founded: e.target.value})}
                      className="nova-input"
                      placeholder="2020"
                      min="1800"
                      max={new Date().getFullYear()}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-2">Description</label>
                  <textarea
                    value={companyForm.description}
                    onChange={(e) => setCompanyForm({...companyForm, description: e.target.value})}
                    className="nova-input"
                    rows="3"
                    placeholder="Brief description of the company..."
                  />
                </div>
              </div>
              
              <div className="p-6 border-t border-surface-100 flex justify-end space-x-3">
                <button
                  onClick={() => setShowEditCompanyModal(false)}
                  className="nova-button-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditCompany}
                  className="nova-button"
                >
                  Update Company
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Company Details Modal */}
        {showCompanyDetails && selectedCompany && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-nova max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-surface-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-nova-gradient rounded-xl flex items-center justify-center">
                      <ApperIcon name="Building2" className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-nova-text">{selectedCompany.name}</h2>
                      <p className="text-surface-600">{selectedCompany.industry}</p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedCompany.status === 'Active'
                        ? 'bg-green-100 text-green-700'
                        : selectedCompany.status === 'Prospect'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {selectedCompany.status}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  <div className="nova-card p-4">
                    <div className="flex items-center space-x-3">
                      <ApperIcon name="Users" className="w-8 h-8 text-primary" />
                      <div>
                        <p className="text-2xl font-bold text-nova-text">{selectedCompany.employees}</p>
                        <p className="text-sm text-surface-600">Employees</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="nova-card p-4">
                    <div className="flex items-center space-x-3">
                      <ApperIcon name="DollarSign" className="w-8 h-8 text-green-600" />
                      <div>
                        <p className="text-2xl font-bold text-nova-text">${(selectedCompany.revenue / 1000000).toFixed(1)}M</p>
                        <p className="text-sm text-surface-600">Annual Revenue</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="nova-card p-4">
                    <div className="flex items-center space-x-3">
                      <ApperIcon name="Calendar" className="w-8 h-8 text-blue-600" />
                      <div>
                        <p className="text-2xl font-bold text-nova-text">{selectedCompany.founded}</p>
                        <p className="text-sm text-surface-600">Founded</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-nova-text mb-4">Company Information</h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <ApperIcon name="MapPin" className="w-5 h-5 text-surface-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-nova-text">Location</p>
                          <p className="text-surface-600">{selectedCompany.location}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <ApperIcon name="Globe" className="w-5 h-5 text-surface-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-nova-text">Website</p>
                          <a 
                            href={selectedCompany.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary-dark"
                          >
                            {selectedCompany.website}
                          </a>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <ApperIcon name="FileText" className="w-5 h-5 text-surface-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-nova-text">Description</p>
                          <p className="text-surface-600">{selectedCompany.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-nova-text mb-4">Contact Information</h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <ApperIcon name="User" className="w-5 h-5 text-surface-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-nova-text">Primary Contact</p>
                          <p className="text-surface-600">{selectedCompany.contact}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <ApperIcon name="Mail" className="w-5 h-5 text-surface-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-nova-text">Email</p>
                          <a 
                            href={`mailto:${selectedCompany.email}`}
                            className="text-primary hover:text-primary-dark"
                          >
                            {selectedCompany.email}
                          </a>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <ApperIcon name="Phone" className="w-5 h-5 text-surface-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-nova-text">Phone</p>
                          <a 
                            href={`tel:${selectedCompany.phone}`}
                            className="text-primary hover:text-primary-dark"
                          >
                            {selectedCompany.phone}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t border-surface-100 flex justify-between">
                <div className="flex space-x-3">
                  <button
                    onClick={() => openEditCompanyModal(selectedCompany)}
                    className="nova-button flex items-center space-x-2"
                  >
                    <ApperIcon name="Edit" className="w-4 h-4" />
                    <span>Edit Company</span>
                  </button>
                  <button
                    onClick={() => handleDeleteCompany(selectedCompany)}
                    className="nova-button-secondary text-red-600 hover:bg-red-50 flex items-center space-x-2"
                  >
                    <ApperIcon name="Trash2" className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
                <button
                  onClick={() => setShowCompanyDetails(false)}
                  className="nova-button-secondary"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    )
  }


  const renderTasks = () => {
    const allTasks = [...tasks.todo, ...tasks.inprogress, ...tasks.done]
    
    return (
      <div className="space-y-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-nova-text">Tasks</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allTasks.map((task) => (
            <motion.div
              key={task.id}
              layout
              className="nova-card p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-nova-text">{task.title}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
              </div>
              <p className="text-sm text-surface-600 mb-3">{task.description}</p>
              <p className="text-sm text-surface-600 mb-3">Due: {task.dueDate}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-surface-500">
                  Assigned to: {task.assignee}
                </span>
                <ApperIcon name="Clock" className="w-4 h-4 text-surface-400" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    )
  }

  const renderCalendar = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6"
      >
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
          <h1 className="text-2xl font-bold text-nova-text mb-4 lg:mb-0">Calendar</h1>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center bg-white rounded-xl shadow-card">
              <button
                onClick={() => setCalendarView('month')}
                className={`px-4 py-2 rounded-l-xl transition-all ${
                  calendarView === 'month' 
                    ? 'bg-primary text-white' 
                    : 'text-surface-600 hover:bg-surface-50'
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setCalendarView('week')}
                className={`px-4 py-2 rounded-r-xl transition-all ${
                  calendarView === 'week' 
                    ? 'bg-primary text-white' 
                    : 'text-surface-600 hover:bg-surface-50'
                }`}
              >
                Week
              </button>
            </div>
            <button
              onClick={() => {
                setEventForm({ title: '', date: format(new Date(), 'yyyy-MM-dd'), time: '', type: 'meeting', description: '' })
                setShowEventModal(true)
              }}
              className="nova-button flex items-center space-x-2"
            >
              <ApperIcon name="Plus" className="w-4 h-4" />
              <span>Add Event</span>
            </button>
          </div>
        </div>

        <div className="nova-card mb-6">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => navigateCalendar('prev')}
                className="p-2 rounded-xl hover:bg-surface-100 transition-colors"
              >
                <ApperIcon name="ChevronLeft" className="w-5 h-5 text-surface-600" />
              </button>
              
              <h2 className="text-xl font-semibold text-nova-text">
                {format(calendarCurrentDate, 'MMMM yyyy')}
              </h2>
              
              <button
                onClick={() => navigateCalendar('next')}
                className="p-2 rounded-xl hover:bg-surface-100 transition-colors"
              >
                <ApperIcon name="ChevronRight" className="w-5 h-5 text-surface-600" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-3 text-center text-surface-500 font-medium">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {getCalendarDays().map((day, index) => {
                const eventsForDay = getEventsForDate(day)
                const isCurrentMonth = isSameMonth(day, calendarCurrentDate)
                const isToday = isSameDay(day, new Date())

                return (
                  <div
                    key={index}
                    onClick={() => setSelectedCalendarDate(day)}
                    className={`p-2 min-h-24 border border-surface-100 rounded-lg cursor-pointer transition-all hover:bg-surface-50 ${
                      isCurrentMonth ? 'bg-white' : 'bg-surface-50'
                    } ${isToday ? 'ring-2 ring-primary' : ''}`}
                  >
                    <div className={`text-sm font-medium mb-1 ${
                      isCurrentMonth ? 'text-nova-text' : 'text-surface-400'
                    } ${isToday ? 'text-primary' : ''}`}>
                      {format(day, 'd')}
                    </div>
                    
                    <div className="space-y-1">
                      {eventsForDay.slice(0, 2).map(event => (
                        <div
                          key={event.id}
                          onClick={(e) => {
                            e.stopPropagation()
                          }}
                          className={`text-xs p-1 rounded truncate cursor-pointer hover:opacity-80 ${
                            event.type === 'meeting' ? 'bg-blue-100 text-blue-800' :
                            event.type === 'call' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}
                          title={event.title}
                        >
                          {event.title}
                        </div>
                      ))}
                      {eventsForDay.length > 2 && (
                        <div className="text-xs text-surface-500">
                          +{eventsForDay.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Event Modal */}
        {showEventModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-xl p-6 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-nova-text">Add Event</h3>
                <button
                  onClick={() => {
                    setShowEventModal(false)
                    setEventForm({ title: '', date: '', time: '', type: 'meeting', description: '' })
                  }}
                  className="p-2 rounded-xl hover:bg-surface-100 transition-colors"
                >
                  <ApperIcon name="X" className="w-5 h-5 text-surface-600" />
                </button>
              </div>

              <form onSubmit={handleEventSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-nova-text mb-2">Title *</label>
                  <input
                    type="text"
                    value={eventForm.title}
                    onChange={(e) => setEventForm(prev => ({ ...prev, title: e.target.value }))}
                    className="nova-input"
                    placeholder="Event title"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-nova-text mb-2">Date *</label>
                    <input
                      type="date"
                      value={eventForm.date}
                      onChange={(e) => setEventForm(prev => ({ ...prev, date: e.target.value }))}
                      className="nova-input"
                      min={format(new Date(), 'yyyy-MM-dd')}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-nova-text mb-2">Time *</label>
                    <input
                      type="time"
                      value={eventForm.time}
                      onChange={(e) => setEventForm(prev => ({ ...prev, time: e.target.value }))}
                      className="nova-input"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-nova-text mb-2">Type</label>
                  <select
                    value={eventForm.type}
                    onChange={(e) => setEventForm(prev => ({ ...prev, type: e.target.value }))}
                    className="nova-input"
                  >
                    <option value="meeting">Meeting</option>
                    <option value="call">Call</option>
                    <option value="deadline">Deadline</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-nova-text mb-2">Description</label>
                  <textarea
                    value={eventForm.description}
                    onChange={(e) => setEventForm(prev => ({ ...prev, description: e.target.value }))}
                    className="nova-input resize-none"
                    rows="3"
                    placeholder="Event description"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEventModal(false)
                      setEventForm({ title: '', date: '', time: '', type: 'meeting', description: '' })
                    }}
                    className="px-4 py-2 text-surface-600 hover:bg-surface-100 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="nova-button"
                  >
                    Add Event
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </motion.div>
    )
  }

  const renderReports = () => {
    // Fixed chart configuration with proper error handling
    const chartOptions = {
      chart: {
        type: 'area',
        height: 350,
        toolbar: { show: false },
        background: 'transparent',
        fontFamily: 'Inter, ui-sans-serif, system-ui'
      },
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth', width: 3 },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        labels: {
          style: {
            colors: '#64748b',
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: '#64748b',
            fontSize: '12px'
          }
        }
      },
      colors: ['#5B9DF9', '#A18CD1'],
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 90, 100]
        }
      },
      grid: {
        borderColor: '#e2e8f0',
        strokeDashArray: 4
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        fontFamily: 'Inter, ui-sans-serif, system-ui'
      },
      responsive: [{
        breakpoint: 768,
        options: {
          chart: {
            height: 300
          }
        }
      }]
    }

    const chartSeries = [
      {
        name: 'Revenue',
        data: [30000, 40000, 35000, 50000, 49000, 60000]
      },
      {
        name: 'Deals',
        data: [20, 35, 25, 40, 38, 45]
      }
    ]

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6"
      >
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
          <h1 className="text-2xl font-bold text-nova-text mb-4 lg:mb-0">Reports & Analytics</h1>
          <div className="flex items-center space-x-4">
            <select
              value={reportsPeriod}
              onChange={(e) => handleReportsPeriodChange(e.target.value)}
              className="nova-input w-auto"
              disabled={reportsLoading}
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
            <button 
              onClick={() => toast.success('Export functionality coming soon!')}
              className="nova-button flex items-center space-x-2"
            >
              <ApperIcon name="Download" className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {reportsLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="nova-stat-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-surface-600 text-sm font-medium">Total Revenue</p>
                  <p className="text-2xl font-bold text-nova-text">{formatCurrency(reportsData.revenue.current)}</p>
                  <p className="text-sm text-green-600 font-medium">
                    +{reportsData.revenue.growth}% from last period
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <ApperIcon name="TrendingUp" className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="nova-stat-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-surface-600 text-sm font-medium">Total Deals</p>
                  <p className="text-2xl font-bold text-nova-text">{formatNumber(reportsData.deals.current)}</p>
                  <p className="text-sm text-green-600 font-medium">
                    +{reportsData.deals.growth}% from last period
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <ApperIcon name="Target" className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="nova-stat-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-surface-600 text-sm font-medium">Total Contacts</p>
                  <p className="text-2xl font-bold text-nova-text">{formatNumber(reportsData.contacts.current)}</p>
                  <p className="text-sm text-green-600 font-medium">
                    +{reportsData.contacts.growth}% from last period
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <ApperIcon name="Users" className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="nova-card">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-nova-text mb-4">Revenue & Deals Trend</h3>
            <div className="chart-container" style={{ minHeight: '350px' }}>
              <Chart
                options={chartOptions}
                series={chartSeries}
                type="area"
                height={350}
              />
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  const renderSettings = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6"
      >
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
          <h1 className="text-2xl font-bold text-nova-text mb-4 lg:mb-0">Settings</h1>
          {settingsChanged && (
            <button
              onClick={handleSettingsSave}
              disabled={settingsLoading}
              className="nova-button flex items-center space-x-2"
            >
              {settingsLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <ApperIcon name="Save" className="w-4 h-4" />
              )}
              <span>Save Changes</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Settings */}
          <div className="nova-card">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-nova-text mb-4">Profile Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-nova-text mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={settingsData.profile.name}
                    onChange={(e) => handleSettingsChange('profile', 'name', e.target.value)}
                    className="nova-input"
                    placeholder="Your full name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-nova-text mb-2">Email *</label>
                  <input
                    type="email"
                    value={settingsData.profile.email}
                    onChange={(e) => handleSettingsChange('profile', 'email', e.target.value)}
                    className="nova-input"
                    placeholder="your.email@company.com"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-nova-text mb-2">Phone</label>
                  <input
                    type="tel"
                    value={settingsData.profile.phone}
                    onChange={(e) => handleSettingsChange('profile', 'phone', e.target.value)}
                    className="nova-input"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-nova-text mb-2">Company</label>
                  <input
                    type="text"
                    value={settingsData.profile.company}
                    onChange={(e) => handleSettingsChange('profile', 'company', e.target.value)}
                    className="nova-input"
                    placeholder="Your company name"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="nova-card">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-nova-text mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-nova-text">Email Notifications</p>
                    <p className="text-sm text-surface-600">Receive notifications via email</p>
                  </div>
                  <button
                    onClick={() => handleSettingsChange('notifications', 'email', !settingsData.notifications.email)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                      settingsData.notifications.email ? 'bg-primary' : 'bg-surface-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settingsData.notifications.email ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-nova-text">Push Notifications</p>
                    <p className="text-sm text-surface-600">Receive push notifications</p>
                  </div>
                  <button
                    onClick={() => handleSettingsChange('notifications', 'push', !settingsData.notifications.push)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                      settingsData.notifications.push ? 'bg-primary' : 'bg-surface-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settingsData.notifications.push ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-nova-text">SMS Notifications</p>
                    <p className="text-sm text-surface-600">Receive notifications via SMS</p>
                  </div>
                  <button
                    onClick={() => handleSettingsChange('notifications', 'sms', !settingsData.notifications.sms)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                      settingsData.notifications.sms ? 'bg-primary' : 'bg-surface-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settingsData.notifications.sms ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-nova-text">Marketing Emails</p>
                    <p className="text-sm text-surface-600">Receive marketing and promotional emails</p>
                  </div>
                  <button
                    onClick={() => handleSettingsChange('notifications', 'marketing', !settingsData.notifications.marketing)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                      settingsData.notifications.marketing ? 'bg-primary' : 'bg-surface-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settingsData.notifications.marketing ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="nova-card">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-nova-text mb-4">Privacy & Security</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-nova-text">Profile Visibility</p>
                    <p className="text-sm text-surface-600">Who can see your profile information</p>
                  </div>
                  <select
                    value={settingsData.privacy.profileVisibility}
                    onChange={(e) => handleSettingsChange('privacy', 'profileVisibility', e.target.value)}
                    className="nova-input w-auto"
                  >
                    <option value="public">Public</option>
                    <option value="team">Team Only</option>
                    <option value="private">Private</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-nova-text">Data Sharing</p>
                    <p className="text-sm text-surface-600">Allow data sharing for analytics</p>
                  </div>
                  <button
                    onClick={() => handleSettingsChange('privacy', 'dataSharing', !settingsData.privacy.dataSharing)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                      settingsData.privacy.dataSharing ? 'bg-primary' : 'bg-surface-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settingsData.privacy.dataSharing ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="nova-card">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-nova-text mb-4">Preferences</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-nova-text mb-2">Language</label>
                  <select
                    value={settingsData.preferences.language}
                    onChange={(e) => handleSettingsChange('preferences', 'language', e.target.value)}
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
                    value={settingsData.preferences.timezone}
                    onChange={(e) => handleSettingsChange('preferences', 'timezone', e.target.value)}
                    className="nova-input"
                  >
                    <option value="UTC-8">Pacific Time (UTC-8)</option>
                    <option value="UTC-5">Eastern Time (UTC-5)</option>
                    <option value="UTC+0">Greenwich Mean Time (UTC+0)</option>
                    <option value="UTC+1">Central European Time (UTC+1)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-nova-text mb-2">Currency</label>
                  <select
                    value={settingsData.preferences.currency}
                    onChange={(e) => handleSettingsChange('preferences', 'currency', e.target.value)}
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
          </div>
        </div>
      </motion.div>
    )
  }

const renderContent = () => {
    switch (activeSection) {
      case 'contacts':
        return renderContacts()
      case 'companies':
        return renderCompanies()
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
      <motion.div
        key={activeSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {renderContent()}
      </motion.div>
    </div>
  )
}

export default MainFeature