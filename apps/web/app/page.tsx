import React from "react";
import { client } from "@repo/db/client";

async function page() {
  const user = await client.user.findFirst();
  return (
    <div>
      {user?.username}
      {user?.email}
    </div>
  );
}

export default page;
