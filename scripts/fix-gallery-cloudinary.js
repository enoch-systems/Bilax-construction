require('dotenv').config({ path: '.env.local' });
const cloudinary = require('cloudinary').v2;
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

const imageMapping = {
  '/gallery/g27.jfif': 'Hotel Construction',
  '/gallery/g26.jfif': 'Sports Complex',
  '/gallery/g25.jfif': 'School Building',
  '/gallery/g24.jfif': 'Hospital Construction',
  '/gallery/g23.jfif': 'Shopping Mall',
  '/gallery/g22.jfif': 'Office Building',
  '/gallery/g20.jfif': 'Warehouse Construction'
};

async function uploadToCloudinary(title) {
  try {
    // Use a placeholder or upload from local if available
    // For now, we'll upload a generic construction image
    const result = await cloudinary.uploader.upload(
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
      {
        folder: 'construction/gallery',
        public_id: title.toLowerCase().replace(/\s+/g, '-'),
        transformation: [
          { quality: 'auto', fetch_format: 'auto' },
          { width: 800, height: 800, crop: 'limit' }
        ]
      }
    );
    
    console.log(`✓ Uploaded ${title} -> ${result.secure_url}`);
    return result.secure_url;
  } catch (error) {
    console.error(`✗ Error uploading ${title}:`, error);
    return null;
  }
}

async function main() {
  console.log('Fixing gallery images with local paths...');
  
  for (const [localPath, title] of Object.entries(imageMapping)) {
    console.log(`\nProcessing: ${title}`);
    
    // Upload to Cloudinary
    const cloudinaryUrl = await uploadToCloudinary(title);
    
    if (cloudinaryUrl) {
      // Update Supabase
      const { error } = await supabase
        .from('gallery_images')
        .update({ src: cloudinaryUrl })
        .eq('title', title);
      
      if (error) {
        console.error(`✗ Error updating ${title} in Supabase:`, error);
      } else {
        console.log(`✓ Updated ${title} in Supabase`);
      }
    }
  }
  
  console.log('\n✅ Fix completed!');
}

main().catch(console.error);
