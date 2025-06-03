export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      user_roles: {
        Row: {
          id: string
          role: "admin" | "editor" | "viewer"
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          role: "admin" | "editor" | "viewer"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          role?: "admin" | "editor" | "viewer"
          created_at?: string
          updated_at?: string
        }
      }
      articles: {
        Row: {
          id: string
          title: string
          slug: string
          content: Json
          excerpt: string | null
          featured_image: string | null
          author_id: string | null
          category_id: string | null
          status: "draft" | "published" | "archived"
          created_at: string
          updated_at: string
          published_at: string | null
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content: Json
          excerpt?: string | null
          featured_image?: string | null
          author_id?: string | null
          category_id?: string | null
          status?: "draft" | "published" | "archived"
          created_at?: string
          updated_at?: string
          published_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: Json
          excerpt?: string | null
          featured_image?: string | null
          author_id?: string | null
          category_id?: string | null
          status?: "draft" | "published" | "archived"
          created_at?: string
          updated_at?: string
          published_at?: string | null
        }
      }
      infographics: {
        Row: {
          id: string
          title: string
          slug: string
          description: string | null
          image_url: string
          category_id: string | null
          status: "draft" | "published" | "archived"
          created_at: string
          updated_at: string
          published_at: string | null
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description?: string | null
          image_url: string
          category_id?: string | null
          status?: "draft" | "published" | "archived"
          created_at?: string
          updated_at?: string
          published_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string | null
          image_url?: string
          category_id?: string | null
          status?: "draft" | "published" | "archived"
          created_at?: string
          updated_at?: string
          published_at?: string | null
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      tags: {
        Row: {
          id: string
          name: string
          slug: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          created_at?: string
        }
      }
      article_tags: {
        Row: {
          article_id: string
          tag_id: string
        }
        Insert: {
          article_id: string
          tag_id: string
        }
        Update: {
          article_id?: string
          tag_id?: string
        }
      }
      countries: {
        Row: {
          id: string
          name: string
          slug: string
          summary: string
          key_considerations: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          summary: string
          key_considerations: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          summary?: string
          key_considerations?: Json
          created_at?: string
          updated_at?: string
        }
      }
      country_regions: {
        Row: {
          id: string
          country_id: string
          name: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          country_id: string
          name: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          country_id?: string
          name?: string
          created_at?: string
          updated_at?: string
        }
      }
      regulations: {
        Row: {
          id: string
          region_id: string
          title: string
          description: string
          details: string
          status: "Compliant" | "Review Needed" | "Attention Required"
          last_updated: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          region_id: string
          title: string
          description: string
          details: string
          status: "Compliant" | "Review Needed" | "Attention Required"
          last_updated: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          region_id?: string
          title?: string
          description?: string
          details?: string
          status?: "Compliant" | "Review Needed" | "Attention Required"
          last_updated?: string
          created_at?: string
          updated_at?: string
        }
      }
      country_resources: {
        Row: {
          id: string
          country_id: string
          title: string
          type: string
          size: string
          url: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          country_id: string
          title: string
          type: string
          size: string
          url: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          country_id?: string
          title?: string
          type?: string
          size?: string
          url?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

export type UserRole = Database["public"]["Tables"]["user_roles"]["Row"]
export type Article = Database["public"]["Tables"]["articles"]["Row"]
export type Infographic = Database["public"]["Tables"]["infographics"]["Row"]
export type Category = Database["public"]["Tables"]["categories"]["Row"]
export type Tag = Database["public"]["Tables"]["tags"]["Row"]
export type ArticleTag = Database["public"]["Tables"]["article_tags"]["Row"]
export type Country = Database["public"]["Tables"]["countries"]["Row"]
export type CountryRegion = Database["public"]["Tables"]["country_regions"]["Row"]
export type Regulation = Database["public"]["Tables"]["regulations"]["Row"]
export type CountryResource = Database["public"]["Tables"]["country_resources"]["Row"]
