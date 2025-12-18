export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type ContactRequestStatus = 'new' | 'pending' | 'contacted' | 'converted' | 'archived'
export type ContactRequestPriority = 'low' | 'normal' | 'high' | 'urgent'

export interface Database {
  public: {
    Tables: {
      contact_requests: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          email: string
          phone: string
          company: string | null
          service_type: string
          message: string
          source: string
          status: ContactRequestStatus
          priority: ContactRequestPriority
          notes: string | null
          assigned_to: string | null
          ip_address: string | null
          user_agent: string | null
          is_read: boolean
          responded_at: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          email: string
          phone: string
          company?: string | null
          service_type: string
          message: string
          source?: string
          status?: ContactRequestStatus
          priority?: ContactRequestPriority
          notes?: string | null
          assigned_to?: string | null
          ip_address?: string | null
          user_agent?: string | null
          is_read?: boolean
          responded_at?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          email?: string
          phone?: string
          company?: string | null
          service_type?: string
          message?: string
          source?: string
          status?: ContactRequestStatus
          priority?: ContactRequestPriority
          notes?: string | null
          assigned_to?: string | null
          ip_address?: string | null
          user_agent?: string | null
          is_read?: boolean
          responded_at?: string | null
        }
      }
      admin_users: {
        Row: {
          id: string
          created_at: string
          email: string
          password_hash: string
          name: string
          role: 'admin' | 'manager' | 'viewer'
          is_active: boolean
          last_login: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          email: string
          password_hash: string
          name: string
          role?: 'admin' | 'manager' | 'viewer'
          is_active?: boolean
          last_login?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          password_hash?: string
          name?: string
          role?: 'admin' | 'manager' | 'viewer'
          is_active?: boolean
          last_login?: string | null
        }
      }
      activity_logs: {
        Row: {
          id: string
          created_at: string
          admin_id: string
          action: string
          entity_type: string
          entity_id: string | null
          details: Json | null
          ip_address: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          admin_id: string
          action: string
          entity_type: string
          entity_id?: string | null
          details?: Json | null
          ip_address?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          admin_id?: string
          action?: string
          entity_type?: string
          entity_id?: string | null
          details?: Json | null
          ip_address?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      contact_status: ContactRequestStatus
      contact_priority: ContactRequestPriority
      admin_role: 'admin' | 'manager' | 'viewer'
    }
  }
}

// Types utilitaires
export type ContactRequest = Database['public']['Tables']['contact_requests']['Row']
export type ContactRequestInsert = Database['public']['Tables']['contact_requests']['Insert']
export type ContactRequestUpdate = Database['public']['Tables']['contact_requests']['Update']

export type AdminUser = Database['public']['Tables']['admin_users']['Row']
export type AdminUserInsert = Database['public']['Tables']['admin_users']['Insert']

export type ActivityLog = Database['public']['Tables']['activity_logs']['Row']

