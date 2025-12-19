import { NextRequest, NextResponse } from 'next/server'
import { createApiSupabaseClient, typedUpdate, typedInsert } from '@/lib/supabase/server'
import { getAuthUserFromRequest, verifyPassword, hashPassword } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const user = getAuthUserFromRequest(request)
    if (!user) {
      return NextResponse.json(
        { error: 'Non authentifié.' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { currentPassword, newPassword } = body

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Mot de passe actuel et nouveau mot de passe requis.' },
        { status: 400 }
      )
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: 'Le nouveau mot de passe doit contenir au moins 8 caractères.' },
        { status: 400 }
      )
    }

    const supabase = createApiSupabaseClient()

    // Récupérer l'utilisateur avec le hash actuel
    const { data: adminUserData, error: fetchError } = await supabase
      .from('admin_users')
      .select('password_hash')
      .eq('id', user.id)
      .single()

    if (fetchError || !adminUserData) {
      return NextResponse.json(
        { error: 'Utilisateur non trouvé.' },
        { status: 404 }
      )
    }

    // Type assertion pour TypeScript
    const adminUser = adminUserData as { password_hash: string }

    // Vérifier le mot de passe actuel
    const isValid = await verifyPassword(currentPassword, adminUser.password_hash)
    if (!isValid) {
      return NextResponse.json(
        { error: 'Mot de passe actuel incorrect.' },
        { status: 401 }
      )
    }

    // Hasher le nouveau mot de passe
    const newPasswordHash = await hashPassword(newPassword)

    // Mettre à jour le mot de passe
    const { error: updateError } = await typedUpdate(supabase, 'admin_users', {
      password_hash: newPasswordHash,
    })
      .eq('id', user.id)

    if (updateError) {
      console.error('Error updating password:', updateError)
      return NextResponse.json(
        { error: 'Erreur lors de la mise à jour du mot de passe.' },
        { status: 500 }
      )
    }

    // Logger l'action
    await typedInsert(supabase, 'activity_logs', {
      admin_id: user.id,
      action: 'change_password',
      entity_type: 'admin_user',
      entity_id: user.id,
      ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
    })

    return NextResponse.json({
      success: true,
      message: 'Mot de passe modifié avec succès.',
    })
  } catch (error) {
    console.error('Change password error:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue lors du changement de mot de passe.' },
      { status: 500 }
    )
  }
}
