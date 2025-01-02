"use client"

// import { Metadata } from "next";
import { FortForm } from "@/components/FortForm";
import { Card } from "@/components/ui/card";
import { Mountain, ArrowLeft } from "lucide-react";
import Link from "next/link";

// const metadata: Metadata = {
//   title: "Add New Fort | Maharashtra Forts",
//   description: "Add a new fort to the database",
// };

export default function NewFortPage() {
  return (
    <div className="container max-w-6xl py-8 m-auto">
      <div className="mb-8">
        <Link
          href="/forts"
          className="flex items-center text-muted-foreground hover:text-primary transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Forts
        </Link>
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Mountain className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Add New Fort</h1>
            <p className="text-muted-foreground">
              Add details about a historical fort in Maharashtra
            </p>
          </div>
        </div>
      </div>

      <Card className="p-6">
        <FortForm />
      </Card>

      <div className="mt-6 text-sm text-center text-muted-foreground">
        <p>
          Please ensure all information is accurate and verified before submission.
          Images and videos should be clear and relevant to the fort.
        </p>
      </div>
    </div>
  );
}