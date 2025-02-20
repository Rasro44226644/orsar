
import { createClient } from '@supabase/supabase-js';

// Since we're moving to SQLite3 later, we'll use temporary values here
export const supabase = createClient(
  'https://your-project.supabase.co',
  'your-anon-key'
);
