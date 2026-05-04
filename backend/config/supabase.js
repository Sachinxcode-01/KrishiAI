const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

let supabase = null;

if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('your_supabase_url_here')) {
  console.warn('⚠️ Supabase credentials missing or invalid. History features will be disabled.');
} else {
  try {
    supabase = createClient(supabaseUrl, supabaseKey);
    console.log('✅ Supabase client initialized.');
  } catch (err) {
    console.error('❌ Failed to initialize Supabase:', err.message);
  }
}

module.exports = supabase;
