require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function checkGalleryData() {
  console.log('Checking gallery data in Supabase...');
  
  const { data, error } = await supabase
    .from('gallery_images')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log(`Total images: ${data.length}`);
  
  const localImages = data.filter(item => item.src.startsWith('/'));
  const cloudinaryImages = data.filter(item => item.src.startsWith('https://'));
  
  console.log(`Local images: ${localImages.length}`);
  console.log(`Cloudinary images: ${cloudinaryImages.length}`);
  
  if (localImages.length > 0) {
    console.log('\nLocal images found:');
    localImages.forEach(item => {
      console.log(`- ${item.title}: ${item.src}`);
    });
  }
}

checkGalleryData();
