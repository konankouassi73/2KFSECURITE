'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAdmin } from '@/hooks/useAdmin'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminHeader } from '@/components/admin/AdminHeader'
import Link from 'next/link'
import { 
  Search, 
  Filter, 
  Mail, 
  Phone, 
  Building2, 
  Eye,
  ChevronLeft,
  ChevronRight,
  Loader2,
  MessageSquare,
  X
} from 'lucide-react'

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

interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

const statusOptions = [
  { value: '', label: 'Tous les statuts' },
  { value: 'new', label: 'Nouveau' },
  { value: 'pending', label: 'En attente' },
  { value: 'contacted', label: 'Contacté' },
  { value: 'converted', label: 'Converti' },
  { value: 'archived', label: 'Archivé' },
]

const priorityOptions = [
  { value: '', label: 'Toutes priorités' },
  { value: 'urgent', label: 'Urgent' },
  { value: 'high', label: 'Haute' },
  { value: 'normal', label: 'Normale' },
  { value: 'low', label: 'Basse' },
]

export default function AdminRequestsPage() {
  const { user, isLoading: authLoading, logout } = useAdmin()
  const [requests, setRequests] = useState<Request[]>([])
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 20, total: 0, totalPages: 0 })
  const [isLoading, setIsLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  // Filtres
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [priority, setPriority] = useState('')
  const [isRead, setIsRead] = useState('')

  const fetchRequests = useCallback(async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      })
      if (search) params.append('search', search)
      if (status) params.append('status', status)
      if (priority) params.append('priority', priority)
      if (isRead) params.append('isRead', isRead)

      const res = await fetch(`/api/admin/requests?${params}`)
      if (res.ok) {
        const data = await res.json()
        setRequests(data.data || [])
        setPagination(data.pagination)
      }

      // Récupérer le compteur de non lus
      const statsRes = await fetch('/api/admin/stats')
      if (statsRes.ok) {
        const statsData = await statsRes.json()
        setUnreadCount(statsData.stats.unread || 0)
      }
    } catch (error) {
      console.error('Error fetching requests:', error)
    } finally {
      setIsLoading(false)
    }
  }, [pagination.page, pagination.limit, search, status, priority, isRead])

  useEffect(() => {
    if (user) {
      fetchRequests()
    }
  }, [user, fetchRequests])

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-primary-accent" />
      </div>
    )
  }

  if (!user) return null

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

  const getPriorityBadge = (priority: string) => {
    const styles: Record<string, string> = {
      urgent: 'bg-red-100 text-red-700',
      high: 'bg-orange-100 text-orange-700',
      normal: 'bg-gray-100 text-gray-700',
      low: 'bg-blue-100 text-blue-700',
    }
    return priority !== 'normal' ? (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[priority] || ''}`}>
        {priority === 'urgent' ? '⚡ Urgent' : priority === 'high' ? '↑ Haute' : '↓ Basse'}
      </span>
    ) : null
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPagination(p => ({ ...p, page: 1 }))
    fetchRequests()
  }

  const clearFilters = () => {
    setSearch('')
    setStatus('')
    setPriority('')
    setIsRead('')
    setPagination(p => ({ ...p, page: 1 }))
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar 
        user={user} 
        onLogout={logout} 
        unreadCount={unreadCount}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col">
        <AdminHeader 
          title="Demandes de contact"
          subtitle={`${pagination.total} demande${pagination.total > 1 ? 's' : ''}`}
          onMenuClick={() => setSidebarOpen(true)}
          onRefresh={fetchRequests}
          unreadCount={unreadCount}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* Filtres */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
            <div className="p-4 border-b border-gray-100">
              <form onSubmit={handleSearch} className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Rechercher par nom, email, téléphone..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-accent"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                  className={`px-4 py-2 border rounded-lg flex items-center gap-2 transition-colors ${
                    showFilters ? 'border-primary-accent text-primary-accent bg-primary-accent/5' : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  Filtres
                </button>
              </form>
            </div>

            {showFilters && (
              <div className="p-4 bg-gray-50 border-b border-gray-100">
                <div className="flex flex-wrap gap-4">
                  <select
                    value={status}
                    onChange={(e) => { setStatus(e.target.value); setPagination(p => ({ ...p, page: 1 })) }}
                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-accent"
                  >
                    {statusOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <select
                    value={priority}
                    onChange={(e) => { setPriority(e.target.value); setPagination(p => ({ ...p, page: 1 })) }}
                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-accent"
                  >
                    {priorityOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <select
                    value={isRead}
                    onChange={(e) => { setIsRead(e.target.value); setPagination(p => ({ ...p, page: 1 })) }}
                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-accent"
                  >
                    <option value="">Tous</option>
                    <option value="false">Non lus</option>
                    <option value="true">Lus</option>
                  </select>
                  {(search || status || priority || isRead) && (
                    <button
                      onClick={clearFilters}
                      className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
                    >
                      <X className="w-4 h-4" />
                      Effacer
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Liste des demandes */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-primary-accent" />
              </div>
            ) : requests.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>Aucune demande trouvée</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50/50">
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Contact
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                          Service
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Statut
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                          Date
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {requests.map((request) => (
                        <tr 
                          key={request.id}
                          className={`hover:bg-gray-50 transition-colors ${!request.is_read ? 'bg-blue-50/30' : ''}`}
                        >
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              {!request.is_read && (
                                <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                              )}
                              <div className="min-w-0">
                                <p className="font-semibold text-primary-dark truncate">
                                  {request.name}
                                </p>
                                <div className="flex flex-wrap gap-x-3 text-xs text-gray-500">
                                  <span className="flex items-center gap-1">
                                    <Mail className="w-3 h-3" />
                                    {request.email}
                                  </span>
                                  <span className="flex items-center gap-1 hidden sm:flex">
                                    <Phone className="w-3 h-3" />
                                    {request.phone}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 hidden md:table-cell">
                            <span className="text-sm text-gray-700">{request.service_type}</span>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex flex-col gap-1">
                              {getStatusBadge(request.status)}
                              {getPriorityBadge(request.priority)}
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 hidden sm:table-cell">
                            {formatDate(request.created_at)}
                          </td>
                          <td className="px-4 py-4 text-right">
                            <Link
                              href={`/admin/requests/${request.id}`}
                              className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-primary-accent hover:bg-primary-accent/10 rounded-lg transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                              <span className="hidden sm:inline">Voir</span>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                      Page {pagination.page} sur {pagination.totalPages}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setPagination(p => ({ ...p, page: p.page - 1 }))}
                        disabled={pagination.page === 1}
                        className="p-2 border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setPagination(p => ({ ...p, page: p.page + 1 }))}
                        disabled={pagination.page === pagination.totalPages}
                        className="p-2 border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

