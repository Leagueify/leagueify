import { redirect } from "@sveltejs/kit";
import type { Handle } from "@sveltejs/kit";

import database from "$lib/server/database";

export const handle = (async ({ event, resolve }) => {
  if (event.url.pathname === "/register") {
    const response = await resolve(event);
    return response;
  }

  const user = await database.user.findMany();

  if (user.length === 0) {
    throw redirect(307, "/register");
  }

  // Handle all other requests
  const response = await resolve(event);
  return response;
}) satisfies Handle;
