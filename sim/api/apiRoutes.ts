/**
 * Simulated API Route Registry
 * Initial scaffold with health check, flow registry, and static flow skeletons.
 * @foundation V34-FND-BP-04
 * @foundation V34-FND-BP-06
 * @foundation V34-FND-BP-09
 */

import { route, RouteDef } from "./apiRouter";
import { getFlowRegistry } from "./handlers/flowRegistryHandler";
import { 
  getSkuFlowStatic, 
  getBatchFlowStatic, 
  getInboundFlowStatic, 
  getFinalQaFlowStatic, 
  getDispatchFlowStatic 
} from "./handlers/flowsStaticSkeleton";

export const SIM_API_ROUTES: RouteDef[] = [
  /**
   * GET /api/health
   * Connectivity check for the in-app simulator.
   */
  route("GET", "EXACT", "/api/health", async () => ({
    status: 200,
    body: {
      ok: true,
      data: {
        status: "ok",
        mode: "sim-inapp",
        timestamp: new Date().toISOString()
      }
    }
  })),

  /**
   * GET /api/flows/registry
   * Returns the list of planned MES Pilot flows.
   */
  route("GET", "EXACT", "/api/flows/registry", getFlowRegistry),

  /**
   * Static Flow Skeletons (V34 Phase A)
   */
  route("GET", "EXACT", "/api/flows/sku", getSkuFlowStatic),
  route("GET", "EXACT", "/api/flows/batch", getBatchFlowStatic),
  route("GET", "EXACT", "/api/flows/inbound", getInboundFlowStatic),
  route("GET", "EXACT", "/api/flows/final-qa", getFinalQaFlowStatic),
  route("GET", "EXACT", "/api/flows/dispatch", getDispatchFlowStatic),
];
