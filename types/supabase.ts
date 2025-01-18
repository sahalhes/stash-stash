export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          username: string
          profile_image_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          username: string
          profile_image_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          username?: string
          profile_image_url?: string | null
          created_at?: string
        }
      }
      stashes: {
        Row: {
          id: string
          user_id: string
          title: string
          content: string
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          content: string
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          content?: string
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      comments: {
        Row: {
          id: string
          stash_id: string
          user_id: string
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          stash_id: string
          user_id: string
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          stash_id?: string
          user_id?: string
          content?: string
          created_at?: string
        }
      }
      likes: {
        Row: {
          id: string
          stash_id: string
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          stash_id: string
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          stash_id?: string
          user_id?: string
          created_at?: string
        }
      }
    }
  }
} 