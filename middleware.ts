// redirect user to login page
export { default } from "next-auth/middleware";

// config object - which routes it should be applied to
export const config = {
  matcher: ["/issues/new", "/issues/edit/:id+"],
};
