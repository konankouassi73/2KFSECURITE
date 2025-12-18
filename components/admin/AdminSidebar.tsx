'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { 
  LayoutDashboard, 
  MessageSquare, 
  Users, 
  Settings, 
  LogOut,
  Bell,
  BarChart3,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface AdminSidebarProps {
  user: { name: string; email: string; role: string } | null
  onLogout: () => void
  unreadCount?: number
  isOpen?: boolean
  onClose?: () => void
}

const navigation = [
  { name: 'Tableau de bord', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Demandes', href: '/admin/requests', icon: MessageSquare, badge: true },
  { name: 'Statistiques', href: '/admin/stats', icon: BarChart3 },
  { name: 'Paramètres', href: '/admin/settings', icon: Settings, adminOnly: true },
]

export function AdminSidebar({ user, onLogout, unreadCount = 0, isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Overlay mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-primary-dark transform transition-transform duration-300 lg:translate-x-0 flex flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <Link href="/admin/dashboard" className="flex items-center gap-3">
              <Image 
                src="/images/logo.png" 
                alt="2KF Sécurité" 
                width={36} 
                height={36}
              />
              <div>
                <span className="text-white font-display font-semibold text-sm tracking-wider">
                  2KF SÉCURITÉ
                </span>
                <span className="block text-[10px] text-white/50 uppercase tracking-wider">
                  Admin
                </span>
              </div>
            </Link>
            <button 
              onClick={onClose}
              className="lg:hidden p-2 text-white/60 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            if (item.adminOnly && user?.role !== 'admin') return null
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            const Icon = item.icon

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive 
                    ? "bg-primary-accent text-white shadow-lg shadow-primary-accent/25" 
                    : "text-white/60 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="flex-1">{item.name}</span>
                {item.badge && unreadCount > 0 && (
                  <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full font-bold">
                    {unreadCount}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-primary-accent/20 flex items-center justify-center text-primary-accent font-semibold">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.name}</p>
              <p className="text-xs text-white/50 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-red-500/10 transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            Déconnexion
          </button>
        </div>
      </aside>
    </>
  )
}

