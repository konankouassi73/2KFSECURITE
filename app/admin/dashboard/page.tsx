'use client'

import { useState, useEffect } from 'react'
import { useAdmin } from '@/hooks/useAdmin'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminHeader } from '@/components/admin/AdminHeader'
import Link from 'next/link'
import { 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  TrendingUp,
  ArrowRight,
  Loader2,
  Mail,
  Phone,
  Building2,
  Eye
} from 'lucide-react'

interface Stats {
  total: number
  new: number
  pending: number
  contacted: number
  converted: number
  unread: number
  today: number
  thisWeek: number
  thisMonth: number
}

interface Request {
  id: string
  name: string
  email: string
  phone: string
  company: string | null
  service_type: string
  status: string
  priority: string
  is_read: boolean
  created_at: string
}

export default function AdminDashboardPage() {
  const { user, isLoading: authLoading, logout } = useAdmin()
  const [stats, setStats] = useState<Stats | null>(null)
  const [recentRequests, setRecentRequests] = useState<Request[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (user) {
      fetchData()
    }
  }, [user])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      // Récupérer les stats
      const statsRes = await fetch('/api/admin/stats')
      if (statsRes.ok) {
        const statsData = await statsRes.json()
        setStats(statsData.stats)
      }

      // Récupérer les demandes récentes
      const requestsRes = await fetch('/api/admin/requests?limit=5&sortBy=created_at&sortOrder=desc')
      if (requestsRes.ok) {
        const requestsData = await requestsRes.json()
        setRecentRequests(requestsData.data || [])
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-primary-accent" />
      </div>
    )
  }

  if (!user) return null

  const statCards = [
    { 
      label: 'Nouvelles demandes', 
      value: stats?.new || 0, 
      icon: MessageSquare, 
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    { 
      label: 'En attente', 
      value: stats?.pending || 0, 
      icon: Clock, 
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600'
    },
    { 
      label: 'Contactés', 
      value: stats?.contacted || 0, 
      icon: CheckCircle, 
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    { 
      label: 'Convertis', 
      value: stats?.converted || 0, 
      icon: TrendingUp, 
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
  ]

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      new: 'bg-blue-100 text-blue-700',
      pending: 'bg-yellow-100 text-yellow-700',
      contacted: 'bg-green-100 text-green-700',
      converted: 'bg-purple-100 text-purple-700',
      archived: 'bg-gray-100 text-gray-700',
    }
    const labels: Record<string, string> = {
      new: 'Nouveau',
      pending: 'En attente',
      contacted: 'Contacté',
      converted: 'Converti',
      archived: 'Archivé',
    }
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] || styles.new}`}>
        {labels[status] || status}
      </span>
    )
  }

  const formatDate = (date: string) => {
    const d = new Date(date)
    const now = new Date()
    const diff = now.getTime() - d.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)

    if (hours < 1) return 'Il y a quelques minutes'
    if (hours < 24) return `Il y a ${hours}h`
    if (days < 7) return `Il y a ${days}j`
    return d.toLocaleDateString('fr-FR')
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar 
        user={user} 
        onLogout={logout} 
        unreadCount={stats?.unread || 0}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col">
        <AdminHeader 
          title="Tableau de bord"
          subtitle={`Bienvenue, ${user.name}`}
          onMenuClick={() => setSidebarOpen(true)}
          onRefresh={fetchData}
          unreadCount={stats?.unread || 0}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-primary-accent" />
            </div>
          ) : (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                {statCards.map((stat) => {
                  const Icon = stat.icon
                  return (
                    <div 
                      key={stat.label}
                      className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-2 sm:p-3 rounded-xl ${stat.bgColor}`}>
                          <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.textColor}`} />
                        </div>
                        <span className={`text-2xl sm:text-3xl font-bold ${stat.textColor}`}>
                          {stat.value}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                    </div>
                  )
                })}
              </div>

              {/* Summary */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Aujourd'hui</h3>
                  <p className="text-2xl font-bold text-primary-dark">{stats?.today || 0}</p>
                </div>
                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Cette semaine</h3>
                  <p className="text-2xl font-bold text-primary-dark">{stats?.thisWeek || 0}</p>
                </div>
                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Ce mois</h3>
                  <p className="text-2xl font-bold text-primary-dark">{stats?.thisMonth || 0}</p>
                </div>
              </div>

              {/* Recent Requests */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="px-4 sm:px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="text-lg font-display font-bold text-primary-dark">
                    Demandes récentes
                  </h2>
                  <Link 
                    href="/admin/requests"
                    className="text-sm text-primary-accent hover:text-primary-accent/80 font-medium flex items-center gap-1"
                  >
                    Voir tout
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                
                {recentRequests.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>Aucune demande pour le moment</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {recentRequests.map((request) => (
                      <Link
                        key={request.id}
                        href={`/admin/requests/${request.id}`}
                        className={`block px-4 sm:px-6 py-4 hover:bg-gray-50 transition-colors ${
                          !request.is_read ? 'bg-blue-50/50' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              {!request.is_read && (
                                <span className="w-2 h-2 bg-blue-500 rounded-full" />
                              )}
                              <span className="font-semibold text-primary-dark truncate">
                                {request.name}
                              </span>
                              {getStatusBadge(request.status)}
                            </div>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                {request.email}
                              </span>
                              <span className="flex items-center gap-1">
                                <Phone className="w-3 h-3" />
                                {request.phone}
                              </span>
                              {request.company && (
                                <span className="flex items-center gap-1">
                                  <Building2 className="w-3 h-3" />
                                  {request.company}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-400 mt-1">
                              {request.service_type} • {formatDate(request.created_at)}
                            </p>
                          </div>
                          <Eye className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  )
}

