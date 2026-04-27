import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, videoId } = body;

    if (!title || !description || !videoId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Update projects data JSON
    const dataPath = path.join(process.cwd(), "data", "projects.json");
    const dataDir = path.join(process.cwd(), "data");
    
    if (!existsSync(dataDir)) {
      await mkdir(dataDir, { recursive: true });
    }

    let projectsData: any[] = [];
    if (existsSync(dataPath)) {
      const dataFile = await readFile(dataPath, "utf-8");
      projectsData = JSON.parse(dataFile);
    }

    projectsData.unshift({
      title,
      description,
      videoId,
    });

    await writeFile(dataPath, JSON.stringify(projectsData, null, 2));

    return NextResponse.json(
      { message: "Project added successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding project:", error);
    return NextResponse.json(
      { error: "Failed to add project" },
      { status: 500 }
    );
  }
}
