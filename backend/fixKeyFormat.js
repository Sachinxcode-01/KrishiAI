const fs = require('fs');
const path = require('path');

const serviceAccountPath = path.join(__dirname, 'config', 'serviceAccountKey.json');

if (fs.existsSync(serviceAccountPath)) {
  const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
  
  // Aggressively fix the private key
  let key = serviceAccount.private_key;
  
  // 1. Replace all literal \n (escaped) and actual newlines with a unique marker
  // 2. Clean up any weird spacing
  // 3. Reconstruct with standard newlines
  const lines = key.split(/\\n|\n/).map(l => l.trim()).filter(l => l.length > 0);
  const fixedKey = lines.join('\n');
  
  serviceAccount.private_key = fixedKey;
  
  fs.writeFileSync(serviceAccountPath, JSON.stringify(serviceAccount, null, 2));
  console.log('✅ serviceAccountKey.json has been re-formatted correctly.');
} else {
  console.error('❌ serviceAccountKey.json not found.');
}
