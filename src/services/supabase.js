import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://xbjtrlkyucjibnsbphqt.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhianRybGt5dWNqaWJuc2JwaHF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIwMTEwOTcsImV4cCI6MjAzNzU4NzA5N30.4wckd-1zU-eizIXvzDd3uEiQ-3qCUhaHKbvi7HVtZ8I";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
