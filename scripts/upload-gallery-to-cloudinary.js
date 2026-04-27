require('dotenv').config({ path: '.env.local' });
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const galleryDir = path.join(__dirname, '../public/gallery');
const galleryJsonPath = path.join(__dirname, '../data/gallery.json');

// Read existing gallery data
let galleryData = [];
try {
  galleryData = JSON.parse(fs.readFileSync(galleryJsonPath, 'utf8'));
} catch (error) {
  console.error('Error reading gallery.json:', error);
  process.exit(1);
}

// Get all image files
const imageFiles = fs.readdirSync(galleryDir).filter(file => 
  /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
);

console.log(`Found ${imageFiles.length} images to upload`);

async function uploadImage(filePath, fileName) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'construction/gallery',
      public_id: path.parse(fileName).name,
      transformation: [
        { quality: 'auto', fetch_format: 'auto' },
        { width: 1200, height: 1200, crop: 'limit' }
      ]
    });
    
    console.log(`✓ Uploaded ${fileName} -> ${result.secure_url}`);
    return result.secure_url;
  } catch (error) {
    console.error(`✗ Error uploading ${fileName}:`, error);
    return null;
  }
}

async function main() {
  const uploadResults = [];
  
  for (const file of imageFiles) {
    const filePath = path.join(galleryDir, file);
    const cloudinaryUrl = await uploadImage(filePath, file);
    
    if (cloudinaryUrl) {
      // Find corresponding entry in gallery data
      const existingEntry = galleryData.find(item => item.src.includes(file));
      
      if (existingEntry) {
        // Update existing entry
        existingEntry.src = cloudinaryUrl;
        uploadResults.push({
          originalFile: file,
          cloudinaryUrl: cloudinaryUrl,
          updated: true
        });
      } else {
        // Create new entry
        uploadResults.push({
          originalFile: file,
          cloudinaryUrl: cloudinaryUrl,
          updated: false
        });
      }
    }
  }
  
  // Save updated gallery.json
  fs.writeFileSync(galleryJsonPath, JSON.stringify(galleryData, null, 2));
  console.log(`\n✓ Updated gallery.json with ${uploadResults.length} Cloudinary URLs`);
  
  // Report summary
  const updated = uploadResults.filter(r => r.updated).length;
  const newEntries = uploadResults.filter(r => !r.updated).length;
  console.log(`Summary: ${updated} updated, ${newEntries} new entries`);
}

main().catch(console.error);
