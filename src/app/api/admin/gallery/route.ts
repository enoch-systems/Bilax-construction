import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, readFile, unlink } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get("image") as File;
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;

    if (!image || !title || !category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create public/gallery directory if it doesn't exist
    const galleryDir = path.join(process.cwd(), "public", "gallery");
    if (!existsSync(galleryDir)) {
      await mkdir(galleryDir, { recursive: true });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const extension = path.extname(image.name);
    const filename = `g${timestamp}${extension}`;
    const filepath = path.join(galleryDir, filename);

    // Convert file to buffer and write to disk
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filepath, buffer);

    // Update gallery data JSON
    const dataPath = path.join(process.cwd(), "data", "gallery.json");
    const dataDir = path.join(process.cwd(), "data");
    
    if (!existsSync(dataDir)) {
      await mkdir(dataDir, { recursive: true });
    }

    let galleryData: any[] = [];
    if (existsSync(dataPath)) {
      const dataFile = await readFile(dataPath, "utf-8");
      galleryData = JSON.parse(dataFile);
    }

    galleryData.unshift({
      src: `/gallery/${filename}`,
      title,
      category,
    });

    await writeFile(dataPath, JSON.stringify(galleryData, null, 2));

    return NextResponse.json(
      { message: "Image uploaded successfully", filename },
      { status: 200 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { src } = await request.json();

    if (!src) {
      return NextResponse.json(
        { error: "Missing image src" },
        { status: 400 }
      );
    }

    // Update gallery data JSON to remove the image
    const dataPath = path.join(process.cwd(), "data", "gallery.json");
    
    if (!existsSync(dataPath)) {
      return NextResponse.json(
        { error: "Gallery data not found" },
        { status: 404 }
      );
    }

    const dataFile = await readFile(dataPath, "utf-8");
    let galleryData: any[] = JSON.parse(dataFile);

    // Remove the image from the array
    const originalLength = galleryData.length;
    galleryData = galleryData.filter(item => item.src !== src);

    if (galleryData.length === originalLength) {
      return NextResponse.json(
        { error: "Image not found in gallery" },
        { status: 404 }
      );
    }

    // Write updated data back to file
    await writeFile(dataPath, JSON.stringify(galleryData, null, 2));

    // Try to delete the physical file (optional, will continue if file doesn't exist)
    const filepath = path.join(process.cwd(), "public", src);
    if (existsSync(filepath)) {
      await unlink(filepath);
    }

    return NextResponse.json(
      { message: "Image deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete image" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { src, title, category } = await request.json();

    if (!src || !title || !category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Update gallery data JSON
    const dataPath = path.join(process.cwd(), "data", "gallery.json");
    
    if (!existsSync(dataPath)) {
      return NextResponse.json(
        { error: "Gallery data not found" },
        { status: 404 }
      );
    }

    const dataFile = await readFile(dataPath, "utf-8");
    let galleryData: any[] = JSON.parse(dataFile);

    // Find and update the image
    const imageIndex = galleryData.findIndex(item => item.src === src);
    
    if (imageIndex === -1) {
      return NextResponse.json(
        { error: "Image not found in gallery" },
        { status: 404 }
      );
    }

    galleryData[imageIndex] = {
      ...galleryData[imageIndex],
      title,
      category
    };

    // Write updated data back to file
    await writeFile(dataPath, JSON.stringify(galleryData, null, 2));

    return NextResponse.json(
      { message: "Image updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { error: "Failed to update image" },
      { status: 500 }
    );
  }
}
