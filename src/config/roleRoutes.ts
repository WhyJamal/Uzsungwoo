export type Role = "Delivery" | "Security";

export const roleRoutes: Record<Role, string> = {
  Delivery: "/shipment",
  Security: "/security",
};
