import { NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching projects data:", error);
      return NextResponse.json(
        { error: "Failed to fetch projects data" },
        { status: 500 }
      );
    }

    // Transform data to match expected format
    const projectsData = data.map(item => ({
      title: item.title,
      description: item.description,
      videoId: item.video_id
    }));

    return NextResponse.json(projectsData, { status: 200 });
  } catch (error) {
    console.error("Error fetching projects data:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects data" },
      { status: 500 }
    );
  }
}
