import { NextRequest, NextResponse } from 'next/server'
import { createApiSupabaseClient } from '@/lib/supabase/server'
import { getAuthUserFromRequest, hasPermission } from '@/lib/auth'

// GET: Récupérer toutes les demandes avec filtres et pagination
export async function GET(request: NextRequest) {
  try {
    const user = getAuthUserFromRequest(request)
    if (!user || !hasPermission(user, 'viewer')) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const status = searchParams.get('status')
    const priority = searchParams.get('priority')
    const search = searchParams.get('search')
    const serviceType = searchParams.get('serviceType')
    const isRead = searchParams.get('isRead')
    const sortBy = searchParams.get('sortBy') || 'created_at'
    const sortOrder = searchParams.get('sortOrder') || 'desc'

    const offset = (page - 1) * limit

    const supabase = createApiSupabaseClient()

    let query = supabase
      .from('contact_requests')
      .select('*', { count: 'exact' })

    // Appliquer les filtres
    if (status) {
      query = query.eq('status', status)
    }
    if (priority) {
      query = query.eq('priority', priority)
    }
    if (serviceType) {
      query = query.eq('service_type', serviceType)
    }
    if (isRead !== null && isRead !== '') {
      query = query.eq('is_read', isRead === 'true')
    }
    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,company.ilike.%${search}%,phone.ilike.%${search}%`)
    }

    // Tri et pagination
    query = query
      .order(sortBy, { ascending: sortOrder === 'asc' })
      .range(offset, offset + limit - 1)

    const { data, error, count } = await query

    if (error) {
      console.error('Error fetching requests:', error)
      return NextResponse.json({ error: 'Erreur lors de la récupération des demandes' }, { status: 500 })
    }

    return NextResponse.json({
      data,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

