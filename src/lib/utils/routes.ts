const protectedRoutes = ["/settings"];

export async function protectedRoute(route: string) {
  return protectedRoutes.includes(route);
}
