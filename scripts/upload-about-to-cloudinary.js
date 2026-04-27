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

const publicDir = path.join(__dirname, '../public');

// Get engineering/about us images
const imageFiles = fs.readdirSync(publicDir).filter(file => 
  /^eng\d+\.png$/i.test(file)
);

console.log(`Found ${imageFiles.length} about us images to upload`);

async function uploadImage(filePath, fileName) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'construction/about',
      public_id: path.parse(fileName).name,
      transformation: [
        { quality: 'auto', fetch_format: 'auto' },
        { width: 1200, height: 800, crop: 'limit' }
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
    const filePath = path.join(publicDir, file);
    const cloudinaryUrl = await uploadImage(filePath, file);
    
    if (cloudinaryUrl) {
      uploadResults.push({
        originalFile: file,
        cloudinaryUrl: cloudinaryUrl
      });
    }
  }
  
  // Save results to a JSON file
  const outputPath = path.join(__dirname, '../data/about-cloudinary.json');
  fs.writeFileSync(outputPath, JSON.stringify(uploadResults, null, 2));
  console.log(`\n✓ Saved about us Cloudinary URLs to ${outputPath}`);
  console.log(`Summary: ${uploadResults.length} images uploaded`);
}

main().catch(console.error);
