const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadLogo() {
  try {
    const logoPath = path.join(__dirname, '../public/logo.png');
    
    console.log('Uploading logo to Cloudinary...');
    
    const result = await cloudinary.uploader.upload(logoPath, {
      folder: 'construction',
      public_id: 'construction/logo',
      resource_type: 'image',
    });
    
    console.log('Logo uploaded successfully!');
    console.log('Cloudinary URL:', result.secure_url);
    
    // Save to data file
    const logoData = [
      {
        originalFile: 'logo.png',
        cloudinaryUrl: result.secure_url
      }
    ];
    
    fs.writeFileSync(
      path.join(__dirname, '../data/logo-cloudinary.json'),
      JSON.stringify(logoData, null, 2)
    );
    
    console.log('Logo data saved to data/logo-cloudinary.json');
  } catch (error) {
    console.error('Error uploading logo:', error);
  }
}

uploadLogo();
