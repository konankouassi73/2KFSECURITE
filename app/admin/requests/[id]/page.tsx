'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAdmin } from '@/hooks/useAdmin'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminHeader } from '@/components/admin/AdminHeader'
import Link from 'next/link'
import { 
  ArrowLeft,
  Mail, 
  Phone, 
  Building2, 
  Calendar,
  Clock,
  Globe,
  Save,
  Trash2,
  Loader2,
  CheckCircle,
  AlertCircle,
  ExternalLink
} from 'lucide-react'

interface Request {
  id: string
  name: string
  email: string
  phone: string
  company: string | null
  service_type: string
  message: string
  source: string
  status: string
  priority: string
  notes: string | null
  is_read: boolean
  created_at: string
  updated_at: string
  ip_address: string | null
  user_agent: string | null
  responded_at: string | null
}

const statusOptions = [
  { value: 'new', label: 'Nouveau', color: 'blue' },
  { value: 'pending', label: 'En attente', color: 'yellow' },
  { value: 'contacted', label: 'Contacté', color: 'green' },
  { value: 'converted', label: 'Converti', color: 'purple' },
  { value: 'archived', label: 'Archivé', color: 'gray' },
]

const priorityOptions = [
  { value: 'low', label: 'Basse', color: 'blue' },
  { value: 'normal', label: 'Normale', color: 'gray' },
  { value: 'high', label: 'Haute', color: 'orange' },
  { value: 'urgent', label: 'Urgent', color: 'red' },
]

export default function AdminRequestDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { user, isLoading: authLoading, logout, hasPermission } = useAdmin()
  const [request, setRequest] = useState<Request | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // États pour les modifications
  const [status, setStatus] = useState('')
  const [priority, setPriority] = useState('')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    if (user) {
      fetchRequest()
    }
  }, [user, params.id])

  const fetchRequest = async () => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/admin/requests/${params.id}`)
      if (res.ok) {
        const data = await res.json()
        setRequest(data.data)
        setStatus(data.data.status)
        setPriority(data.data.priority)
        setNotes(data.data.notes || '')
      } else {
        router.push('/admin/requests')
      }
    } catch (error) {
      console.error('Error fetching request:', error)
      router.push('/admin/requests')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    if (!hasPermission('manager')) {
      setMessage({ type: 'error', text: 'Permission insuffisante' })
      return
    }

    setIsSaving(true)
    setMessage(null)
    try {
      const updates: Record<string, string | null> = {}
      if (status !== request?.status) updates.status = status
      if (priority !== request?.priority) updates.priority = priority
      if (notes !== (request?.notes || '')) updates.notes = notes || null

      if (Object.keys(updates).length === 0) {
        setMessage({ type: 'success', text: 'Aucune modification à enregistrer' })
        return
      }

      // Si le statut passe à "contacté" ou plus, enregistrer la date de réponse
      if (updates.status && ['contacted', 'converted'].includes(updates.status) && !request?.responded_at) {
        updates.responded_at = new Date().toISOString()
      }

      const res = await fetch(`/api/admin/requests/${params.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })

      if (res.ok) {
        const data = await res.json()
        setRequest(data.data)
        setMessage({ type: 'success', text: 'Modifications enregistrées' })
      } else {
        throw new Error('Erreur lors de la sauvegarde')
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erreur lors de la sauvegarde' })
    } finally {
      setIsSaving(false)
    }
  }

  const handleArchive = async () => {
    if (!hasPermission('admin')) {
      setMessage({ type: 'error', text: 'Permission insuffisante' })
      return
    }

    if (!confirm('Êtes-vous sûr de vouloir archiver cette demande ?')) return

    try {
      const res = await fetch(`/api/admin/requests/${params.id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        router.push('/admin/requests')
      } else {
        throw new Error('Erreur lors de l\'archivage')
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erreur lors de l\'archivage' })
    }
  }

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-primary-accent" />
      </div>
    )
  }

  if (!user || !request) return null

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar 
        user={user} 
        onLogout={logout}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col">
        <AdminHeader 
          title="Détail de la demande"
          subtitle={request.name}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* Retour */}
          <Link 
            href="/admin/requests"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à la liste
          </Link>

          {/* Message */}
          {message && (
            <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
              message.type === 'success' 
                ? 'bg-green-50 text-green-700 border border-green-200' 
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {message.type === 'success' ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
              {message.text}
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Informations principales */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-display font-bold text-primary-dark mb-4">
                  Informations de contact
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider">Nom</label>
                    <p className="text-lg font-semibold text-primary-dark">{request.name}</p>
                  </div>
                  {request.company && (
                    <div>
                      <label className="text-xs text-gray-500 uppercase tracking-wider">Entreprise</label>
                      <p className="flex items-center gap-2 text-gray-700">
                        <Building2 className="w-4 h-4 text-gray-400" />
                        {request.company}
                      </p>
                    </div>
                  )}
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider">Email</label>
                    <a 
                      href={`mailto:${request.email}`}
                      className="flex items-center gap-2 text-primary-accent hover:underline"
                    >
                      <Mail className="w-4 h-4" />
                      {request.email}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider">Téléphone</label>
                    <a 
                      href={`tel:${request.phone}`}
                      className="flex items-center gap-2 text-primary-accent hover:underline"
                    >
                      <Phone className="w-4 h-4" />
                      {request.phone}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-display font-bold text-primary-dark mb-2">
                  Message
                </h2>
                <p className="text-sm text-gray-500 mb-4">Service demandé : {request.service_type}</p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 whitespace-pre-wrap">{request.message}</p>
                </div>
              </div>

              {/* Métadonnées */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-display font-bold text-primary-dark mb-4">
                  Informations techniques
                </h2>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider">Date de création</label>
                    <p className="flex items-center gap-2 text-gray-700">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {formatDate(request.created_at)}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider">Dernière modification</label>
                    <p className="flex items-center gap-2 text-gray-700">
                      <Clock className="w-4 h-4 text-gray-400" />
                      {formatDate(request.updated_at)}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider">Source</label>
                    <p className="text-gray-700">{request.source}</p>
                  </div>
                  {request.ip_address && (
                    <div>
                      <label className="text-xs text-gray-500 uppercase tracking-wider">Adresse IP</label>
                      <p className="flex items-center gap-2 text-gray-700">
                        <Globe className="w-4 h-4 text-gray-400" />
                        {request.ip_address}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-display font-bold text-primary-dark mb-4">
                  Gestion
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Statut
                    </label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      disabled={!hasPermission('manager')}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-accent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      {statusOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priorité
                    </label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      disabled={!hasPermission('manager')}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-accent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      {priorityOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notes internes
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      disabled={!hasPermission('manager')}
                      rows={4}
                      placeholder="Ajoutez des notes sur cette demande..."
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-accent resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>

                  {hasPermission('manager') && (
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary-accent text-white rounded-lg hover:bg-primary-accent/90 disabled:opacity-50 transition-colors"
                    >
                      {isSaving ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      Enregistrer
                    </button>
                  )}

                  {hasPermission('admin') && (
                    <button
                      onClick={handleArchive}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Archiver
                    </button>
                  )}
                </div>
              </div>

              {/* Actions rapides */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-display font-bold text-primary-dark mb-4">
                  Actions rapides
                </h2>
                <div className="space-y-2">
                  <a
                    href={`mailto:${request.email}?subject=Re: Votre demande de ${request.service_type} - 2KF SÉCURITÉ`}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    Envoyer un email
                  </a>
                  <a
                    href={`tel:${request.phone}`}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    Appeler
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

