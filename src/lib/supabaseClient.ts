import { createClient } from '@supabase/supabase-js'
import { supabaseConfig } from './config'

/*
  SUPABASE SETUP INSTRUCTIONS:
  
  The database table needs to be created in Supabase. Go to SQL Editor and run:
     
     CREATE TABLE rsvps (
       id SERIAL PRIMARY KEY,
       name TEXT NOT NULL,
       bringing TEXT NOT NULL,
       created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
     );
     
     -- Enable Row Level Security (RLS)
     ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;
     
     -- Create a policy to allow anyone to read and insert
     CREATE POLICY "Allow public read access" ON rsvps FOR SELECT USING (true);
     CREATE POLICY "Allow public insert access" ON rsvps FOR INSERT WITH CHECK (true);
*/

export const supabase = createClient(supabaseConfig.url, supabaseConfig.anonKey)

// Type definitions for our RSVP data
export interface RSVP {
  id: number
  name: string
  bringing: string
  created_at: string
}
