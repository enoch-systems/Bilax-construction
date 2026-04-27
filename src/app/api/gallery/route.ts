import { NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('gallery_images')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching gallery data:", error);
      return NextResponse.json(
        { error: "Failed to fetch gallery data" },
        { status: 500 }
      );
    }

    // Transform data to match expected format
    const galleryData = data.map(item => ({
      src: item.src,
      title: item.title,
      category: item.category
    }));

    return NextResponse.json(galleryData, { status: 200 });
  } catch (error) {
    console.error("Error fetching gallery data:", error);
    return NextResponse.json(
      { error: "Failed to fetch gallery data" },
      { status: 500 }
    );
  }
}
