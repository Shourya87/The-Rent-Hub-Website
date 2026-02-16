const ADMIN_TOKEN = process.env.ADMIN_TOKEN?.trim() || "renthub-admin-token";

export const createAuthToken = () => ADMIN_TOKEN;

export const requireAdminAuth = (request, response, next) => {
  const authorization = request.headers.authorization || "";
  const token = authorization.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length).trim()
    : "";

  if (!token || token !== ADMIN_TOKEN) {
    response.status(401).json({ message: "Unauthorized" });
    return;
  }

  next();
};
