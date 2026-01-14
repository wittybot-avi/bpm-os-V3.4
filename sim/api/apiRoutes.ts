/**
 * Simulated API Route Registry
 * Initial scaffold with health check endpoint.
 * @foundation V34-FND-BP-04
 */

import { route, RouteDef } from "./apiRouter";

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
];
