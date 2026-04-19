export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      annotations: {
        Row: {
          color: string | null
          created_at: string | null
          document_id: string
          end_offset: number | null
          id: string
          note: string | null
          page: number | null
          selected_text: string | null
          start_offset: number | null
          type: string
          user_id: string
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          document_id: string
          end_offset?: number | null
          id?: string
          note?: string | null
          page?: number | null
          selected_text?: string | null
          start_offset?: number | null
          type: string
          user_id: string
        }
        Update: {
          color?: string | null
          created_at?: string | null
          document_id?: string
          end_offset?: number | null
          id?: string
          note?: string | null
          page?: number | null
          selected_text?: string | null
          start_offset?: number | null
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "annotations_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "annotations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "annotations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_total_stats"
            referencedColumns: ["user_id"]
          },
        ]
      }
      document_images: {
        Row: {
          created_at: string | null
          document_id: string
          id: string
          mime_type: string
          size_bytes: number | null
          storage_path: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          document_id: string
          id?: string
          mime_type: string
          size_bytes?: number | null
          storage_path: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          document_id?: string
          id?: string
          mime_type?: string
          size_bytes?: number | null
          storage_path?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "document_images_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_images_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_images_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_total_stats"
            referencedColumns: ["user_id"]
          },
        ]
      }
      document_word_events: {
        Row: {
          action: string
          created_at: string | null
          document_id: string
          german_word: string
          id: string
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string | null
          document_id: string
          german_word: string
          id?: string
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string | null
          document_id?: string
          german_word?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "document_word_events_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_word_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_word_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_total_stats"
            referencedColumns: ["user_id"]
          },
        ]
      }
      documents: {
        Row: {
          content: Json | null
          created_at: string | null
          file_path: string | null
          file_size_bytes: number | null
          id: string
          last_opened_at: string | null
          page_count: number | null
          title: string
          type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content?: Json | null
          created_at?: string | null
          file_path?: string | null
          file_size_bytes?: number | null
          id?: string
          last_opened_at?: string | null
          page_count?: number | null
          title: string
          type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content?: Json | null
          created_at?: string | null
          file_path?: string | null
          file_size_bytes?: number | null
          id?: string
          last_opened_at?: string | null
          page_count?: number | null
          title?: string
          type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "documents_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_total_stats"
            referencedColumns: ["user_id"]
          },
        ]
      }
      feature_events: {
        Row: {
          created_at: string | null
          event: string
          id: string
          metadata: Json | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          event: string
          id?: string
          metadata?: Json | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          event?: string
          id?: string
          metadata?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "feature_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feature_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_total_stats"
            referencedColumns: ["user_id"]
          },
        ]
      }
      feedback: {
        Row: {
          created_at: string | null
          id: string
          message: string
          page_path: string | null
          telegram_sent: boolean | null
          type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          page_path?: string | null
          telegram_sent?: boolean | null
          type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          page_path?: string | null
          telegram_sent?: boolean | null
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "feedback_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feedback_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_total_stats"
            referencedColumns: ["user_id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      reading_texts: {
        Row: {
          ai_prompt: string | null
          content: string
          created_at: string | null
          id: string
          last_opened_at: string | null
          source: string
          title: string
          user_id: string
          word_count: number | null
        }
        Insert: {
          ai_prompt?: string | null
          content: string
          created_at?: string | null
          id?: string
          last_opened_at?: string | null
          source: string
          title: string
          user_id: string
          word_count?: number | null
        }
        Update: {
          ai_prompt?: string | null
          content?: string
          created_at?: string | null
          id?: string
          last_opened_at?: string | null
          source?: string
          title?: string
          user_id?: string
          word_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "reading_texts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reading_texts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_total_stats"
            referencedColumns: ["user_id"]
          },
        ]
      }
      reading_word_events: {
        Row: {
          action: string
          created_at: string | null
          german_word: string
          id: string
          reading_text_id: string
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string | null
          german_word: string
          id?: string
          reading_text_id: string
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string | null
          german_word?: string
          id?: string
          reading_text_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reading_word_events_reading_text_id_fkey"
            columns: ["reading_text_id"]
            isOneToOne: false
            referencedRelation: "reading_texts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reading_word_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reading_word_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_total_stats"
            referencedColumns: ["user_id"]
          },
        ]
      }
      settings: {
        Row: {
          companion_name: string | null
          created_at: string | null
          daily_goal: number | null
          id: string
          onboarding_completed: boolean | null
          target_language: string | null
          tour_completed: boolean | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          companion_name?: string | null
          created_at?: string | null
          daily_goal?: number | null
          id?: string
          onboarding_completed?: boolean | null
          target_language?: string | null
          tour_completed?: boolean | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          companion_name?: string | null
          created_at?: string | null
          daily_goal?: number | null
          id?: string
          onboarding_completed?: boolean | null
          target_language?: string | null
          tour_completed?: boolean | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "settings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "settings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "user_total_stats"
            referencedColumns: ["user_id"]
          },
        ]
      }
      streaks: {
        Row: {
          current_streak: number | null
          id: string
          last_activity_date: string | null
          longest_streak: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          current_streak?: number | null
          id?: string
          last_activity_date?: string | null
          longest_streak?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          current_streak?: number | null
          id?: string
          last_activity_date?: string | null
          longest_streak?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "streaks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "streaks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "user_total_stats"
            referencedColumns: ["user_id"]
          },
        ]
      }
      study_results: {
        Row: {
          created_at: string | null
          exercise_type: string
          id: string
          quality_score: number
          session_id: string
          was_correct: boolean
          word_id: string
        }
        Insert: {
          created_at?: string | null
          exercise_type: string
          id?: string
          quality_score: number
          session_id: string
          was_correct: boolean
          word_id: string
        }
        Update: {
          created_at?: string | null
          exercise_type?: string
          id?: string
          quality_score?: number
          session_id?: string
          was_correct?: boolean
          word_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "study_results_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "study_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "study_results_word_id_fkey"
            columns: ["word_id"]
            isOneToOne: false
            referencedRelation: "words"
            referencedColumns: ["id"]
          },
        ]
      }
      study_sessions: {
        Row: {
          companion_prompt: string | null
          completed: boolean | null
          correct_count: number | null
          ended_at: string | null
          id: string
          mode: string
          started_at: string | null
          tag_filter: string[] | null
          user_id: string
          words_reviewed: number | null
        }
        Insert: {
          companion_prompt?: string | null
          completed?: boolean | null
          correct_count?: number | null
          ended_at?: string | null
          id?: string
          mode: string
          started_at?: string | null
          tag_filter?: string[] | null
          user_id: string
          words_reviewed?: number | null
        }
        Update: {
          companion_prompt?: string | null
          completed?: boolean | null
          correct_count?: number | null
          ended_at?: string | null
          id?: string
          mode?: string
          started_at?: string | null
          tag_filter?: string[] | null
          user_id?: string
          words_reviewed?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "study_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "study_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_total_stats"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_tags: {
        Row: {
          created_at: string | null
          id: string
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_tags_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_tags_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_total_stats"
            referencedColumns: ["user_id"]
          },
        ]
      }
      word_buffer: {
        Row: {
          created_at: string | null
          custom_sentence: string | null
          german_word: string
          id: string
          notes: string | null
          raw_user_tags: string[] | null
          translation: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          custom_sentence?: string | null
          german_word: string
          id?: string
          notes?: string | null
          raw_user_tags?: string[] | null
          translation?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          custom_sentence?: string | null
          german_word?: string
          id?: string
          notes?: string | null
          raw_user_tags?: string[] | null
          translation?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "word_buffer_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "word_buffer_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_total_stats"
            referencedColumns: ["user_id"]
          },
        ]
      }
      word_user_tags: {
        Row: {
          tag_id: string
          word_id: string
        }
        Insert: {
          tag_id: string
          word_id: string
        }
        Update: {
          tag_id?: string
          word_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "word_user_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "user_tags"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "word_user_tags_word_id_fkey"
            columns: ["word_id"]
            isOneToOne: false
            referencedRelation: "words"
            referencedColumns: ["id"]
          },
        ]
      }
      words: {
        Row: {
          ai_tags: string[] | null
          alt_translations: Json | null
          comparative: string | null
          conjugation_type: string | null
          conjugations: Json | null
          date_added: string | null
          easiness_factor: number | null
          example_sentences: Json | null
          gender: string | null
          german_word: string
          id: string
          interval_days: number | null
          is_separable: boolean | null
          last_reviewed: string | null
          next_review_date: string | null
          plural_form: string | null
          review_count: number | null
          search_vector: unknown
          source: string | null
          source_ref_id: string | null
          superlative: string | null
          takes_case: string | null
          translation: string | null
          updated_at: string | null
          user_id: string
          verification_source: string | null
          verified_at: string | null
          word_type: string | null
        }
        Insert: {
          ai_tags?: string[] | null
          alt_translations?: Json | null
          comparative?: string | null
          conjugation_type?: string | null
          conjugations?: Json | null
          date_added?: string | null
          easiness_factor?: number | null
          example_sentences?: Json | null
          gender?: string | null
          german_word: string
          id?: string
          interval_days?: number | null
          is_separable?: boolean | null
          last_reviewed?: string | null
          next_review_date?: string | null
          plural_form?: string | null
          review_count?: number | null
          search_vector?: unknown
          source?: string | null
          source_ref_id?: string | null
          superlative?: string | null
          takes_case?: string | null
          translation?: string | null
          updated_at?: string | null
          user_id: string
          verification_source?: string | null
          verified_at?: string | null
          word_type?: string | null
        }
        Update: {
          ai_tags?: string[] | null
          alt_translations?: Json | null
          comparative?: string | null
          conjugation_type?: string | null
          conjugations?: Json | null
          date_added?: string | null
          easiness_factor?: number | null
          example_sentences?: Json | null
          gender?: string | null
          german_word?: string
          id?: string
          interval_days?: number | null
          is_separable?: boolean | null
          last_reviewed?: string | null
          next_review_date?: string | null
          plural_form?: string | null
          review_count?: number | null
          search_vector?: unknown
          source?: string | null
          source_ref_id?: string | null
          superlative?: string | null
          takes_case?: string | null
          translation?: string | null
          updated_at?: string | null
          user_id?: string
          verification_source?: string | null
          verified_at?: string | null
          word_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "words_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "words_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_total_stats"
            referencedColumns: ["user_id"]
          },
        ]
      }
    }
    Views: {
      user_daily_stats: {
        Row: {
          activity_date: string | null
          correct_count: number | null
          sessions_count: number | null
          study_time_seconds: number | null
          user_id: string | null
          words_added: number | null
          words_reviewed: number | null
        }
        Relationships: [
          {
            foreignKeyName: "study_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "study_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_total_stats"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_total_stats: {
        Row: {
          mastered_words: number | null
          total_correct: number | null
          total_sessions: number | null
          total_study_seconds: number | null
          total_words: number | null
          total_words_reviewed: number | null
          user_id: string | null
        }
        Relationships: []
      }
      word_stage_breakdown: {
        Row: {
          almost: number | null
          growing: number | null
          mastered: number | null
          planted: number | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "words_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "words_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_total_stats"
            referencedColumns: ["user_id"]
          },
        ]
      }
      words_due_today: {
        Row: {
          due_count: number | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "words_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "words_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_total_stats"
            referencedColumns: ["user_id"]
          },
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
