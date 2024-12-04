import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xrlyglsamtxrktavilgj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhybHlnbHNhbXR4cmt0YXZpbGdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMyNzE1MjYsImV4cCI6MjA0ODg0NzUyNn0.Jmga4RrB_suZdlnMNgktAx_tWc5TirDTDnOugSJnxpI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);