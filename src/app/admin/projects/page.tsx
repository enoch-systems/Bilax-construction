"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminProjectsPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to admin dashboard with projects tab active
    router.replace("/admin/dashboard?tab=projects");
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
        <p className="text-slate-400">Loading Projects Management...</p>
      </div>
    </div>
  );
}
