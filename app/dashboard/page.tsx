import {currentUser} from "@clerk/nextjs/server";

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    return <p>You must be signed in to view this page.</p>;
  }

  return <h1>Welcome {user.firstName}</h1>;
}
