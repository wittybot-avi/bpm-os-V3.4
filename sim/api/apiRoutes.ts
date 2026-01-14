/**
 * Simulated API Route Registry
 * Initial scaffold with health check, flow registry, and static flow skeletons.
 * @foundation V34-FND-BP-04
 * @foundation V34-FND-BP-06
 * @foundation V34-FND-BP-09
 * @foundation V34-S1-FLOW-001-PP-05
 * @foundation V34-S2-FLOW-002-PP-03
 */

import { route, RouteDef } from "./apiRouter";
import { getFlowRegistry } from "./handlers/flowRegistryHandler";
import { 
  getInboundFlowStatic, 
  getFinalQaFlowStatic, 
  getDispatchFlowStatic 
} from "./handlers/flowsStaticSkeleton";
import { 
  createSkuFlow, 
  submitSkuForReview, 
  reviewSku, 
  approveSku, 
  getSkuFlow, 
  listSkuFlows 
} from "./handlers/skuFlowHandlers";
import {
  createBatchFlow,
  approveBatchFlow,
  startBatchFlow,
  completeBatchFlow,
  cancelBatchFlow,
  getBatchFlow,
  listBatchFlows
} from "./handlers/batchFlowHandlers";

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
   * SKU Flow (FLOW-001) - Live Simulated Handlers
   */
  route("POST", "EXACT", "/api/flows/sku/create", createSkuFlow),
  route("POST", "EXACT", "/api/flows/sku/submit", submitSkuForReview),
  route("POST", "EXACT", "/api/flows/sku/review", reviewSku),
  route("POST", "EXACT", "/api/flows/sku/approve", approveSku),
  route("GET", "EXACT", "/api/flows/sku/get", getSkuFlow),
  route("GET", "EXACT", "/api/flows/sku/list", listSkuFlows),

  /**
   * Batch Flow (FLOW-002) - Live Simulated Handlers
   */
  route("POST", "EXACT", "/api/flows/batch/create", createBatchFlow),
  route("POST", "EXACT", "/api/flows/batch/approve", approveBatchFlow),
  route("POST", "EXACT", "/api/flows/batch/start", startBatchFlow),
  route("POST", "EXACT", "/api/flows/batch/complete", completeBatchFlow),
  route("POST", "EXACT", "/api/flows/batch/cancel", cancelBatchFlow),
  route("GET", "EXACT", "/api/flows/batch/get", getBatchFlow),
  route("GET", "EXACT", "/api/flows/batch/list", listBatchFlows),

  /**
   * Static Flow Skeletons (V34 Phase A)
   */
  route("GET", "EXACT", "/api/flows/inbound", getInboundFlowStatic),
  route("GET", "EXACT", "/api/flows/final-qa", getFinalQaFlowStatic),
  route("GET", "EXACT", "/api/flows/dispatch", getDispatchFlowStatic),
];