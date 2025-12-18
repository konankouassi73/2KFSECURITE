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

    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)

    const stats = {
      total: allRequests?.length || 0,
      new: allRequests?.filter(r => r.status === 'new').length || 0,
      pending: allRequests?.filter(r => r.status === 'pending').length || 0,
      contacted: allRequests?.filter(r => r.status === 'contacted').length || 0,
      converted: allRequests?.filter(r => r.status === 'converted').length || 0,
      archived: allRequests?.filter(r => r.status === 'archived').length || 0,
      unread: allRequests?.filter(r => !r.is_read).length || 0,
      today: allRequests?.filter(r => new Date(r.created_at) >= today).length || 0,
      thisWeek: allRequests?.filter(r => new Date(r.created_at) >= weekAgo).length || 0,
      thisMonth: allRequests?.filter(r => new Date(r.created_at) >= monthAgo).length || 0,
    }

    // Statistiques par type de service
    const serviceStats = allRequests?.reduce((acc, r) => {
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
      const count = allRequests?.filter(r => {
        const created = new Date(r.created_at)
        return created >= date && created < nextDate
      }).length || 0
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

