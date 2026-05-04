const supabase = require('../config/supabase');

async function testConnection() {
  console.log('🚀 Testing Supabase Connection...');
  console.log('URL:', process.env.SUPABASE_URL || 'Not Set');
  
  try {
    // Attempt to select from the diagnoses table
    const { data, error } = await supabase
      .from('diagnoses')
      .select('count', { count: 'exact', head: true });

    if (error) {
      if (error.code === 'PGRST116') {
        console.log('✅ Connection OK, but table "diagnoses" does not exist yet.');
        console.log('👉 Please run the SQL schema provided in README.md');
      } else if (error.message.includes('fetch')) {
        console.error('❌ Connection Failed: Invalid URL or Network Error.');
      } else {
        console.error('❌ Supabase Error:', error.message);
      }
      return;
    }

    console.log('✅ Supabase Connected Successfully!');
    console.log('📊 Current records in diagnoses table:', data === null ? 0 : data);
  } catch (err) {
    console.error('💥 Unexpected Error:', err.message);
  }
}

testConnection();
