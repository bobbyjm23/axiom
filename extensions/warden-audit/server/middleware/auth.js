const path = require("path");

function serverRoot() {
  return process.env.ANYTHINGLLM_SERVER_ROOT || "/app/server";
}

function loadMiddleware() {
  const root = serverRoot();
  return {
    validatedRequest: require(path.join(
      root,
      "utils/middleware/validatedRequest"
    )).validatedRequest,
    flexUserRoleValid: require(path.join(
      root,
      "utils/middleware/multiUserProtected"
    )).flexUserRoleValid,
    ROLES: require(path.join(root, "utils/middleware/multiUserProtected")).ROLES,
  };
}

function auditRoleGuard(allowedRoles) {
  const { flexUserRoleValid, ROLES } = loadMiddleware();
  const roleList = allowedRoles.map((r) => ROLES[r] || r);
  return flexUserRoleValid(roleList);
}

function getUserFromResponse(response) {
  return response.locals?.user || null;
}

function getUserRole(user) {
  if (!user) return null;
  return user.role || "default";
}

module.exports = {
  loadMiddleware,
  auditRoleGuard,
  getUserFromResponse,
  getUserRole,
  serverRoot,
};
