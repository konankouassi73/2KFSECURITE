'use client'

import { useState, useEffect } from 'react'
import { useAdmin } from '@/hooks/useAdmin'
import { AdminHeader } from '@/components/admin/AdminHeader'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Settings, User, Lock, Bell, Shield, CheckCircle, XCircle, Eye, EyeOff } from 'lucide-react'

export default function SettingsPage() {
  const { user, isLoading, logout } = useAdmin()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')
  
  // État pour le changement de mot de passe
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  })
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [passwordMessage, setPasswordMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-dark mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader 
        title="Paramètres"
        subtitle="Gérez vos préférences"
        onMenuClick={() => setIsSidebarOpen(true)}
        unreadCount={0}
      />
      <AdminSidebar 
        user={user} 
        onLogout={logout}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      <main className="lg:pl-64 pt-16">
        <div className="p-6 md:p-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Paramètres</h1>
              <p className="text-gray-600">Gérez vos préférences et votre compte</p>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex -mb-px">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'profile'
                        ? 'border-primary-dark text-primary-dark'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <User className="w-4 h-4 inline mr-2" />
                    Profil
                  </button>
                  <button
                    onClick={() => setActiveTab('security')}
                    className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'security'
                        ? 'border-primary-dark text-primary-dark'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Lock className="w-4 h-4 inline mr-2" />
                    Sécurité
                  </button>
                  {user.role === 'admin' && (
                    <button
                      onClick={() => setActiveTab('notifications')}
                      className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === 'notifications'
                          ? 'border-primary-dark text-primary-dark'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <Bell className="w-4 h-4 inline mr-2" />
                      Notifications
                    </button>
                  )}
                </nav>
              </div>

              {/* Content */}
              <div className="p-6">
                {activeTab === 'profile' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 mb-4">Informations personnelles</h2>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nom
                          </label>
                          <input
                            type="text"
                            defaultValue={user.name}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent"
                            disabled
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            defaultValue={user.email}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent"
                            disabled
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Rôle
                          </label>
                          <input
                            type="text"
                            defaultValue={user.role}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'security' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 mb-4">Sécurité du compte</h2>
                      
                      {/* Message de statut */}
                      {passwordMessage && (
                        <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                          passwordMessage.type === 'success' 
                            ? 'bg-green-50 border border-green-200 text-green-800' 
                            : 'bg-red-50 border border-red-200 text-red-800'
                        }`}>
                          {passwordMessage.type === 'success' ? (
                            <CheckCircle className="w-5 h-5 flex-shrink-0" />
                          ) : (
                            <XCircle className="w-5 h-5 flex-shrink-0" />
                          )}
                          <p className="text-sm font-medium">{passwordMessage.text}</p>
                        </div>
                      )}

                      <form 
                        onSubmit={async (e) => {
                          e.preventDefault()
                          
                          // Validation côté client
                          if (!currentPassword || !newPassword || !confirmPassword) {
                            setPasswordMessage({
                              type: 'error',
                              text: 'Veuillez remplir tous les champs.'
                            })
                            return
                          }

                          if (newPassword.length < 8) {
                            setPasswordMessage({
                              type: 'error',
                              text: 'Le nouveau mot de passe doit contenir au moins 8 caractères.'
                            })
                            return
                          }

                          if (newPassword !== confirmPassword) {
                            setPasswordMessage({
                              type: 'error',
                              text: 'Les mots de passe ne correspondent pas.'
                            })
                            return
                          }

                          setIsChangingPassword(true)
                          setPasswordMessage(null)

                          try {
                            const response = await fetch('/api/admin/auth/change-password', {
                              method: 'POST',
                              headers: {
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                currentPassword,
                                newPassword,
                              }),
                            })

                            const data = await response.json()

                            if (response.ok) {
                              setPasswordMessage({
                                type: 'success',
                                text: data.message || 'Mot de passe modifié avec succès.'
                              })
                              // Réinitialiser le formulaire
                              setCurrentPassword('')
                              setNewPassword('')
                              setConfirmPassword('')
                            } else {
                              setPasswordMessage({
                                type: 'error',
                                text: data.error || 'Erreur lors du changement de mot de passe.'
                              })
                            }
                          } catch (error) {
                            setPasswordMessage({
                              type: 'error',
                              text: 'Une erreur est survenue. Veuillez réessayer.'
                            })
                          } finally {
                            setIsChangingPassword(false)
                          }
                        }}
                        className="space-y-4"
                      >
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Mot de passe actuel
                          </label>
                          <div className="relative">
                            <input
                              type={showPasswords.current ? 'text' : 'password'}
                              value={currentPassword}
                              onChange={(e) => setCurrentPassword(e.target.value)}
                              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent"
                              required
                              disabled={isChangingPassword}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                              {showPasswords.current ? (
                                <EyeOff className="w-5 h-5" />
                              ) : (
                                <Eye className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nouveau mot de passe
                          </label>
                          <div className="relative">
                            <input
                              type={showPasswords.new ? 'text' : 'password'}
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent"
                              required
                              minLength={8}
                              disabled={isChangingPassword}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                              {showPasswords.new ? (
                                <EyeOff className="w-5 h-5" />
                              ) : (
                                <Eye className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                          <p className="mt-1 text-xs text-gray-500">
                            Minimum 8 caractères
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Confirmer le nouveau mot de passe
                          </label>
                          <div className="relative">
                            <input
                              type={showPasswords.confirm ? 'text' : 'password'}
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent"
                              required
                              minLength={8}
                              disabled={isChangingPassword}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                              {showPasswords.confirm ? (
                                <EyeOff className="w-5 h-5" />
                              ) : (
                                <Eye className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                          {newPassword && confirmPassword && newPassword !== confirmPassword && (
                            <p className="mt-1 text-xs text-red-600">
                              Les mots de passe ne correspondent pas
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-4 pt-4">
                          <button
                            type="submit"
                            disabled={isChangingPassword || !currentPassword || !newPassword || !confirmPassword || newPassword !== confirmPassword}
                            className="px-6 py-2 bg-primary-dark text-white rounded-lg font-medium hover:bg-primary-dark/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                          >
                            {isChangingPassword ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Modification...
                              </>
                            ) : (
                              'Modifier le mot de passe'
                            )}
                          </button>
                          {(currentPassword || newPassword || confirmPassword) && (
                            <button
                              type="button"
                              onClick={() => {
                                setCurrentPassword('')
                                setNewPassword('')
                                setConfirmPassword('')
                                setPasswordMessage(null)
                              }}
                              className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                              disabled={isChangingPassword}
                            >
                              Annuler
                            </button>
                          )}
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                {activeTab === 'notifications' && user.role === 'admin' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 mb-4">Préférences de notifications</h2>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">Nouvelles demandes</p>
                            <p className="text-sm text-gray-500">Recevoir une notification pour chaque nouvelle demande</p>
                          </div>
                          <input type="checkbox" defaultChecked className="w-5 h-5 text-primary-dark" disabled />
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">Demandes urgentes</p>
                            <p className="text-sm text-gray-500">Notifications pour les demandes marquées comme urgentes</p>
                          </div>
                          <input type="checkbox" defaultChecked className="w-5 h-5 text-primary-dark" disabled />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

