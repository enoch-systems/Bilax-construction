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

const teamDir = path.join(__dirname, '../public/ourteam');

// Get all image files
const imageFiles = fs.readdirSync(teamDir).filter(file => 
  /\.(jpg|jpeg|png|gif|webp|jfif)$/i.test(file)
);

console.log(`Found ${imageFiles.length} team images to upload`);

async function uploadImage(filePath, fileName) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'construction/team',
      public_id: path.parse(fileName).name,
      transformation: [
        { quality: 'auto', fetch_format: 'auto' },
        { width: 800, height: 800, crop: 'limit' }
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
    const filePath = path.join(teamDir, file);
    const cloudinaryUrl = await uploadImage(filePath, file);
    
    if (cloudinaryUrl) {
      uploadResults.push({
        originalFile: file,
        cloudinaryUrl: cloudinaryUrl
      });
    }
  }
  
  // Save results to a JSON file
  const outputPath = path.join(__dirname, '../data/team-cloudinary.json');
  fs.writeFileSync(outputPath, JSON.stringify(uploadResults, null, 2));
  console.log(`\n✓ Saved team Cloudinary URLs to ${outputPath}`);
  console.log(`Summary: ${uploadResults.length} images uploaded`);
}

main().catch(console.error);
