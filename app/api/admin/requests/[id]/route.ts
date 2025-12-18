import { NextRequest, NextResponse } from 'next/server'
import { createApiSupabaseClient } from '@/lib/supabase/server'
import { getAuthUserFromRequest, hasPermission } from '@/lib/auth'
import { ContactRequestUpdate } from '@/lib/supabase/types'

// GET: Récupérer une demande spécifique
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = getAuthUserFromRequest(request)
    if (!user || !hasPermission(user, 'viewer')) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const supabase = createApiSupabaseClient()

    const { data, error } = await supabase
      .from('contact_requests')
      .select('*')
      .eq('id', params.id)
      .single()

    if (error) {
      return NextResponse.json({ error: 'Demande non trouvée' }, { status: 404 })
    }

    // Marquer comme lu si ce n'est pas déjà fait
    if (!data.is_read) {
      await supabase
        .from('contact_requests')
        .update({ is_read: true } as any)
        .eq('id', params.id)
    }

    return NextResponse.json({ data: { ...data, is_read: true } })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// PATCH: Mettre à jour une demande
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = getAuthUserFromRequest(request)
    if (!user || !hasPermission(user, 'manager')) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const body = await request.json()
    const { status, priority, notes, assigned_to, responded_at } = body

    const updateData: ContactRequestUpdate = {}
    if (status) updateData.status = status
    if (priority) updateData.priority = priority
    if (notes !== undefined) updateData.notes = notes
    if (assigned_to !== undefined) updateData.assigned_to = assigned_to
    if (responded_at !== undefined) updateData.responded_at = responded_at

    const supabase = createApiSupabaseClient()

    const { data, error } = await supabase
      .from('contact_requests')
      .update(updateData as any)
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
      console.error('Error updating request:', error)
      return NextResponse.json({ error: 'Erreur lors de la mise à jour' }, { status: 500 })
    }

    // Logger l'action
    await supabase.from('activity_logs').insert({
      admin_id: user.id,
      action: 'update',
      entity_type: 'contact_request',
      entity_id: params.id,
      details: { changes: updateData },
      ip_address: request.headers.get('x-forwarded-for') || 'unknown',
    } as any)

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// DELETE: Supprimer une demande (ou archiver)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = getAuthUserFromRequest(request)
    if (!user || !hasPermission(user, 'admin')) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const supabase = createApiSupabaseClient()

    // Archiver plutôt que supprimer définitivement
    const { error } = await supabase
      .from('contact_requests')
      .update({ status: 'archived' } as any)
      .eq('id', params.id)

    if (error) {
      console.error('Error archiving request:', error)
      return NextResponse.json({ error: 'Erreur lors de l\'archivage' }, { status: 500 })
    }

    // Logger l'action
    await supabase.from('activity_logs').insert({
      admin_id: user.id,
      action: 'archive',
      entity_type: 'contact_request',
      entity_id: params.id,
      ip_address: request.headers.get('x-forwarded-for') || 'unknown',
    } as any)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

