import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

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

    // Save to Supabase
    const { error } = await supabase
      .from('projects')
      .insert({
        title,
        description,
        video_id: videoId
      });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to save to database" },
        { status: 500 }
      );
    }

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

export async function DELETE(request: NextRequest) {
  try {
    const { videoId } = await request.json();

    if (!videoId) {
      return NextResponse.json(
        { error: "Missing video ID" },
        { status: 400 }
      );
    }

    // Delete from Supabase
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('video_id', videoId);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to delete from database" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Project deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { videoId, title, description } = await request.json();

    if (!videoId || !title || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Update in Supabase
    const { error } = await supabase
      .from('projects')
      .update({ title, description })
      .eq('video_id', videoId);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to update project" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Project updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}
