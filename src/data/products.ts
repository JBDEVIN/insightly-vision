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
  ]},
  { id: "mobile-app", name: "Mobile App", teams: [
    { id: "mobile-ios", name: "iOS Team" },
    { id: "mobile-android", name: "Android Team" },
    { id: "mobile-shared", name: "Shared Components" },
  ]},
  { id: "data-pipeline", name: "Data Pipeline", teams: [
    { id: "data-ingestion", name: "Ingestion" },
    { id: "data-processing", name: "Processing" },
  ]},
  { id: "auth-service", name: "Auth Service", teams: [
    { id: "auth-core", name: "Auth Core" },
  ]},
  { id: "analytics-engine", name: "Analytics Engine", teams: [
    { id: "analytics-frontend", name: "Analytics Frontend" },
    { id: "analytics-backend", name: "Analytics Backend" },
  ]},
  { id: "api-gateway", name: "API Gateway", teams: [
    { id: "gateway-team", name: "Gateway Team" },
  ]},
  { id: "admin-portal", name: "Admin Portal", teams: [
    { id: "admin-ui", name: "Admin UI" },
    { id: "admin-backend", name: "Admin Backend" },
  ]},
  { id: "notification-svc", name: "Notification Svc", teams: [
    { id: "notif-team", name: "Notifications Team" },
  ]},
  { id: "search-platform", name: "Search Platform", teams: [
    { id: "search-indexing", name: "Indexing" },
    { id: "search-ranking", name: "Ranking" },
  ]},
  { id: "billing-system", name: "Billing System", teams: [
    { id: "billing-payments", name: "Payments" },
    { id: "billing-invoicing", name: "Invoicing" },
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
