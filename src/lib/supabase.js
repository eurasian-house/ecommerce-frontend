import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://anpucpdmwbtjhixewwfv.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFucHVjcGRtd2J0amhpeGV3d2Z2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5OTk0NDgsImV4cCI6MjA4OTU3NTQ0OH0.P2A3mSAI5TqY-Q04e2bnGJrOHvAJvR0sPCRK1SLG94E";

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});