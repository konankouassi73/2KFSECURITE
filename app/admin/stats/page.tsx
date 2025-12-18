'use client'

import { useState, useEffect } from 'react'
import { useAdmin } from '@/hooks/useAdmin'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminHeader } from '@/components/admin/AdminHeader'
import { 
  TrendingUp,
  BarChart3,
  PieChart,
  Loader2
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

interface ServiceStats {
  [key: string]: { total: number; converted: number }
}

interface DailyStat {
  date: string
  count: number
}

export default function AdminStatsPage() {
  const { user, isLoading: authLoading, logout } = useAdmin()
  const [stats, setStats] = useState<Stats | null>(null)
  const [serviceStats, setServiceStats] = useState<ServiceStats>({})
  const [dailyStats, setDailyStats] = useState<DailyStat[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (user) {
      fetchStats()
    }
  }, [user])

  const fetchStats = async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/admin/stats')
      if (res.ok) {
        const data = await res.json()
        setStats(data.stats)
        setServiceStats(data.serviceStats || {})
        setDailyStats(data.dailyStats || [])
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
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

  const maxDaily = Math.max(...dailyStats.map(d => d.count), 1)
  const conversionRate = stats ? ((stats.converted / Math.max(stats.total, 1)) * 100).toFixed(1) : '0'

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
          title="Statistiques"
          subtitle="Analyse des demandes de contact"
          onMenuClick={() => setSidebarOpen(true)}
          onRefresh={fetchStats}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-primary-accent" />
            </div>
          ) : (
            <>
              {/* KPIs */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Total demandes</span>
                    <BarChart3 className="w-5 h-5 text-gray-400" />
                  </div>
                  <p className="text-3xl font-bold text-primary-dark">{stats?.total || 0}</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Ce mois</span>
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  </div>
                  <p className="text-3xl font-bold text-primary-dark">{stats?.thisMonth || 0}</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Taux de conversion</span>
                    <PieChart className="w-5 h-5 text-purple-500" />
                  </div>
                  <p className="text-3xl font-bold text-purple-600">{conversionRate}%</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Non lus</span>
                    <span className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                  </div>
                  <p className="text-3xl font-bold text-blue-600">{stats?.unread || 0}</p>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-6 mb-8">
                {/* Graphique des 7 derniers jours */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h2 className="text-lg font-display font-bold text-primary-dark mb-6">
                    Demandes (7 derniers jours)
                  </h2>
                  <div className="flex items-end justify-between gap-2 h-48">
                    {dailyStats.map((day) => {
                      const height = (day.count / maxDaily) * 100
                      const date = new Date(day.date)
                      const dayName = date.toLocaleDateString('fr-FR', { weekday: 'short' })
                      return (
                        <div key={day.date} className="flex-1 flex flex-col items-center gap-2">
                          <span className="text-xs text-gray-500">{day.count}</span>
                          <div 
                            className="w-full bg-primary-accent/80 rounded-t-lg transition-all duration-500 min-h-[4px]"
                            style={{ height: `${Math.max(height, 2)}%` }}
                          />
                          <span className="text-xs text-gray-500 capitalize">{dayName}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Répartition par statut */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h2 className="text-lg font-display font-bold text-primary-dark mb-6">
                    Répartition par statut
                  </h2>
                  <div className="space-y-4">
                    {[
                      { label: 'Nouveau', value: stats?.new || 0, color: 'bg-blue-500' },
                      { label: 'En attente', value: stats?.pending || 0, color: 'bg-yellow-500' },
                      { label: 'Contacté', value: stats?.contacted || 0, color: 'bg-green-500' },
                      { label: 'Converti', value: stats?.converted || 0, color: 'bg-purple-500' },
                    ].map((item) => {
                      const percentage = stats?.total ? (item.value / stats.total) * 100 : 0
                      return (
                        <div key={item.label}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">{item.label}</span>
                            <span className="font-medium text-gray-900">{item.value}</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${item.color} transition-all duration-500`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Par type de service */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-display font-bold text-primary-dark mb-6">
                  Par type de service
                </h2>
                {Object.keys(serviceStats).length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Aucune donnée disponible</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-100">
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Service</th>
                          <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Demandes</th>
                          <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Convertis</th>
                          <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Taux</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {Object.entries(serviceStats)
                          .sort((a, b) => b[1].total - a[1].total)
                          .map(([service, data]) => {
                            const rate = data.total ? ((data.converted / data.total) * 100).toFixed(1) : '0'
                            return (
                              <tr key={service} className="hover:bg-gray-50">
                                <td className="px-4 py-3 font-medium text-gray-900">{service}</td>
                                <td className="px-4 py-3 text-center text-gray-600">{data.total}</td>
                                <td className="px-4 py-3 text-center text-green-600 font-medium">{data.converted}</td>
                                <td className="px-4 py-3 text-center">
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    parseFloat(rate) >= 50 ? 'bg-green-100 text-green-700' :
                                    parseFloat(rate) >= 25 ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-gray-100 text-gray-700'
                                  }`}>
                                    {rate}%
                                  </span>
                                </td>
                              </tr>
                            )
                          })}
                      </tbody>
                    </table>
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

