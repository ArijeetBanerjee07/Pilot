import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { DashboardStyle2 } from "@/components/dashboard/DashboardStyle2";

// Always render at request time — requires auth session + runtime env vars
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth");
  }

  return (
    <div className="min-h-screen">
      <DashboardStyle2
        userName={session.user.name ?? "User"}
        userImage={session.user.image ?? null}
      />
    </div>
  );
}
