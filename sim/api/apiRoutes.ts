/**
 * Simulated API Route Registry
 * Initial scaffold with health check and flow registry endpoints.
 * @foundation V34-FND-BP-04
 * @foundation V34-FND-BP-06
 */

import { route, RouteDef } from "./apiRouter";
import { getFlowRegistry } from "./handlers/flowRegistryHandler";

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
];
