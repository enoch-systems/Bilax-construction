require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Initialize Supabase client with service role key for migration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials in .env.local');
  console.error('Please add SUPABASE_SERVICE_ROLE_KEY to your .env.local file');
  console.error('You can get it from: https://supabase.com/dashboard/project/bbdfeljiumfliuxymbxx/settings/api');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function migrateGallery() {
  console.log('Migrating gallery images...');
  
  const galleryPath = path.join(__dirname, '../data/gallery.json');
  const galleryData = JSON.parse(fs.readFileSync(galleryPath, 'utf8'));
  
  for (const image of galleryData) {
    const { error } = await supabase
      .from('gallery_images')
      .insert({
        src: image.src,
        title: image.title,
        category: image.category
      });
    
    if (error) {
      console.error(`Error inserting gallery image ${image.title}:`, error);
    } else {
      console.log(`✓ Inserted gallery image: ${image.title}`);
    }
  }
}

async function migrateProjects() {
  console.log('\nMigrating projects...');
  
  const projectsPath = path.join(__dirname, '../data/projects.json');
  const projectsData = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));
  
  for (const project of projectsData) {
    const { error } = await supabase
      .from('projects')
      .insert({
        title: project.title,
        description: project.description,
        video_id: project.videoId
      });
    
    if (error) {
      console.error(`Error inserting project ${project.title}:`, error);
    } else {
      console.log(`✓ Inserted project: ${project.title}`);
    }
  }
}

async function migrateTeam() {
  console.log('\nMigrating team members...');
  
  const teamPath = path.join(__dirname, '../data/team-cloudinary.json');
  const teamData = JSON.parse(fs.readFileSync(teamPath, 'utf8'));
  
  const teamNames = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Williams', 'David Brown', 'Emily Davis'];
  const teamRoles = ['Project Manager', 'Lead Architect', 'Civil Engineer', 'Structural Engineer', 'Site Supervisor', 'Quality Manager'];
  
  for (let i = 0; i < teamData.length; i++) {
    const { error } = await supabase
      .from('team_members')
      .insert({
        name: teamNames[i] || `Team Member ${i + 1}`,
        role: teamRoles[i] || 'Team Member',
        image_url: teamData[i].cloudinaryUrl
      });
    
    if (error) {
      console.error(`Error inserting team member ${i}:`, error);
    } else {
      console.log(`✓ Inserted team member: ${teamNames[i]}`);
    }
  }
}

async function migrateServices() {
  console.log('\nMigrating services...');
  
  const servicesPath = path.join(__dirname, '../data/services-cloudinary.json');
  const servicesData = JSON.parse(fs.readFileSync(servicesPath, 'utf8'));
  
  const serviceNames = ['Commercial Construction', 'Consulting Services', 'Industrial Building', 'Project Management', 'Renovation & Remodeling', 'Residential Construction'];
  const serviceDescriptions = [
    'Large-scale commercial building projects for businesses and organizations.',
    'Expert consulting services for construction planning and project management.',
    'Industrial building construction including factories and warehouses.',
    'Comprehensive project management services for construction projects.',
    'Renovation and remodeling services for existing structures.',
    'Residential construction for homes and apartment buildings.'
  ];
  
  for (let i = 0; i < servicesData.length; i++) {
    const { error } = await supabase
      .from('services')
      .insert({
        title: serviceNames[i] || `Service ${i + 1}`,
        description: serviceDescriptions[i] || 'Professional construction service.',
        image_url: servicesData[i].cloudinaryUrl
      });
    
    if (error) {
      console.error(`Error inserting service ${i}:`, error);
    } else {
      console.log(`✓ Inserted service: ${serviceNames[i]}`);
    }
  }
}

async function migrateAbout() {
  console.log('\nMigrating about us images...');
  
  const aboutPath = path.join(__dirname, '../data/about-cloudinary.json');
  const aboutData = JSON.parse(fs.readFileSync(aboutPath, 'utf8'));
  
  const aboutTitles = ['Engineering Excellence', 'Quality Standards', 'Innovation', 'Safety First', 'Sustainable Building'];
  
  for (let i = 0; i < aboutData.length; i++) {
    const { error } = await supabase
      .from('about_images')
      .insert({
        image_url: aboutData[i].cloudinaryUrl,
        title: aboutTitles[i] || `About Image ${i + 1}`,
        description: 'Showcasing our commitment to excellence in construction.'
      });
    
    if (error) {
      console.error(`Error inserting about image ${i}:`, error);
    } else {
      console.log(`✓ Inserted about image: ${aboutTitles[i]}`);
    }
  }
}

async function main() {
  try {
    await migrateGallery();
    await migrateProjects();
    await migrateTeam();
    await migrateServices();
    await migrateAbout();
    
    console.log('\n✅ Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

main();
