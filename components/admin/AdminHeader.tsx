'use client'

import { Bell, Menu, RefreshCw } from 'lucide-react'

interface AdminHeaderProps {
  title: string
  subtitle?: string
  onMenuClick?: () => void
  onRefresh?: () => void
  unreadCount?: number
}

export function AdminHeader({ title, subtitle, onMenuClick, onRefresh, unreadCount = 0 }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-100">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-display font-bold text-primary-dark">
                {title}
              </h1>
              {subtitle && (
                <p className="text-sm text-primary-gray/60 mt-0.5">{subtitle}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onRefresh && (
              <button
                onClick={onRefresh}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                title="Actualiser"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            )}
            <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

