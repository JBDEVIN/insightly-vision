export interface Team {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  teams: Team[];
}

export const products: Product[] = [
  { id: "platform-core", name: "Platform Core", teams: [
    { id: "core-backend", name: "Core Backend" },
    { id: "core-infra", name: "Core Infrastructure" },
    { id: "core-frontend", name: "Core Frontend" },
    { id: "core-devex", name: "Developer Experience" },
  ]},
  { id: "mobile-app", name: "Mobile App", teams: [
    { id: "mobile-ios", name: "iOS Team" },
    { id: "mobile-android", name: "Android Team" },
    { id: "mobile-shared", name: "Shared Components" },
  ]},
  { id: "data-pipeline", name: "Data Pipeline", teams: [
    { id: "data-ingestion", name: "Ingestion" },
    { id: "data-processing", name: "Processing" },
    { id: "data-quality", name: "Data Quality" },
    { id: "data-platform", name: "Platform Services" },
    { id: "data-analytics", name: "Analytics" },
  ]},
  { id: "api-gateway", name: "API Gateway", teams: [
    { id: "gateway-core", name: "Gateway Core" },
    { id: "gateway-auth", name: "Auth & Security" },
    { id: "gateway-perf", name: "Performance" },
    { id: "gateway-dx", name: "Developer Portal" },
    { id: "gateway-infra", name: "Infrastructure" },
    { id: "gateway-monitoring", name: "Monitoring" },
  ]},
  { id: "billing-system", name: "Billing System", teams: [
    { id: "billing-payments", name: "Payments" },
    { id: "billing-invoicing", name: "Invoicing" },
    { id: "billing-subs", name: "Subscriptions" },
    { id: "billing-reporting", name: "Financial Reporting" },
  ]},
];
export function getProduct(productId: string): Product | undefined {
  return products.find(p => p.id === productId);
}

export function getTeam(productId: string, teamId: string): { product: Product; team: Team } | undefined {
  const product = getProduct(productId);
  if (!product) return undefined;
  const team = product.teams.find(t => t.id === teamId);
  if (!team) return undefined;
  return { product, team };
}
