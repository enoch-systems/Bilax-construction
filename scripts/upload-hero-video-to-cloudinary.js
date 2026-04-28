require('dotenv').config({ path: '.env.local' });
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function uploadHeroVideo() {
  try {
    console.log('Starting hero video upload to Cloudinary...');
    
    // Path to the local hero video
    const videoPath = path.join(__dirname, '../public/herovideo.mp4');
    
    // Check if file exists
    if (!fs.existsSync(videoPath)) {
      throw new Error('Hero video file not found at: ' + videoPath);
    }
    
    console.log('Uploading file:', videoPath);
    
    // Upload to Cloudinary with optimizations
    const result = await cloudinary.uploader.upload(videoPath, {
      resource_type: 'video',
      public_id: 'hero-videos/hero-video-optimized',
      folder: 'hero-videos',
      overwrite: true,
      // Apply some basic optimizations during upload
      quality: 'auto:good',
      format: 'mp4',
      video_codec: 'auto'
    });
    
    console.log('✅ Hero video uploaded successfully!');
    console.log('Public ID:', result.public_id);
    console.log('URL:', result.secure_url);
    console.log('File size:', result.bytes, 'bytes');
    console.log('Format:', result.format);
    
    // Generate optimized URLs
    const optimizedUrl = cloudinary.url(result.public_id, {
      resource_type: 'video',
      quality: 'auto:good',
      format: 'mp4',
      video_codec: 'auto'
    });
    
    console.log('\nOptimized URL for Hero component:');
    console.log(optimizedUrl);
    
    return result;
    
  } catch (error) {
    console.error('❌ Error uploading hero video:', error);
    throw error;
  }
}

// Run the upload
if (require.main === module) {
  uploadHeroVideo()
    .then(() => {
      console.log('\n🎉 Hero video upload completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Upload failed:', error);
      process.exit(1);
    });
}

module.exports = uploadHeroVideo;
