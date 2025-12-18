import { NextRequest, NextResponse } from 'next/server'
import { createApiSupabaseClient } from '@/lib/supabase/server'
import { getAuthUserFromRequest, hasPermission } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const user = getAuthUserFromRequest(request)
    if (!user || !hasPermission(user, 'viewer')) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const supabase = createApiSupabaseClient()

    // Statistiques générales
    const { data: allRequests } = await supabase
      .from('contact_requests')
      .select('id, status, is_read, created_at, service_type')

    // Type pour les données retournées
    type RequestData = {
      id: string
      status: string
      is_read: boolean
      created_at: string
      service_type: string | null
    }

    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)

    const requests: RequestData[] = allRequests || []

    const stats = {
      total: requests.length,
      new: requests.filter((r: RequestData) => r.status === 'new').length,
      pending: requests.filter((r: RequestData) => r.status === 'pending').length,
      contacted: requests.filter((r: RequestData) => r.status === 'contacted').length,
      converted: requests.filter((r: RequestData) => r.status === 'converted').length,
      archived: requests.filter((r: RequestData) => r.status === 'archived').length,
      unread: requests.filter((r: RequestData) => !r.is_read).length,
      today: requests.filter((r: RequestData) => new Date(r.created_at) >= today).length,
      thisWeek: requests.filter((r: RequestData) => new Date(r.created_at) >= weekAgo).length,
      thisMonth: requests.filter((r: RequestData) => new Date(r.created_at) >= monthAgo).length,
    }

    // Statistiques par type de service
    const serviceStats = requests.reduce((acc, r: RequestData) => {
      const service = r.service_type || 'Autre'
      if (!acc[service]) {
        acc[service] = { total: 0, converted: 0 }
      }
      acc[service].total++
      if (r.status === 'converted') acc[service].converted++
      return acc
    }, {} as Record<string, { total: number; converted: number }>)

    // Tendances des 7 derniers jours
    const dailyStats = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000)
      const nextDate = new Date(date.getTime() + 24 * 60 * 60 * 1000)
      const count = requests.filter((r: RequestData) => {
        const created = new Date(r.created_at)
        return created >= date && created < nextDate
      }).length
      dailyStats.push({
        date: date.toISOString().split('T')[0],
        count,
      })
    }

    return NextResponse.json({
      stats,
      serviceStats,
      dailyStats,
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

