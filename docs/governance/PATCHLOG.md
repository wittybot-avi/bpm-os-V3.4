# BPM-OS Frontend PATCHLOG

## V3.4 Active

| Patch ID | Patch Type | Intent | Status | Notes | Date |
|:---|:---|:---|:---|:---|:---|
| **V34-FND-BP-07** | Foundation | Add Flow UI Harness shells (FlowShell/FlowStep/FlowFooter) | **STABLE** | PLAN: Phase A Step 3 (V34-FND-BP-03). Not used anywhere yet. Zero runtime change. | 2026-01-27 13:45 (IST) |
| **V34-FND-BP-06** | Foundation | Add GET /api/flows/registry route backed by FLOW_REGISTRY_SEED | **STABLE** | No UI wiring; still uses apiFetch wrapper only | 2026-01-27 13:10 (IST) |
| **V34-FND-BP-05** | Foundation | Route apiFetch("/api/*") to in-app simulated router (health endpoint available) | **STABLE** | No UI wiring; no global fetch patching; AI Studio safe | 2026-01-27 12:45 (IST) |
| **V34-FND-BP-04** | Foundation | Add in-app API router scaffold (types + dispatch + 1 health route) | **STABLE** | No UI wiring, no global fetch patching | 2026-01-27 12:10 (IST) |
| **V34-FND-BP-03** | Foundation | Add Flow Registry Seed (typed list, not yet rendered) | **STABLE** | Data-only; no runtime change | 2026-01-27 11:45 (IST) |
| **V34-HOTFIX-BP-00** | Hotfix | Prevent crash by removing window.fetch monkey-patch; introduce apiFetch wrapper | **STABLE** | AI Studio sandbox blocks assigning window.fetch | 2026-01-27 11:30 (IST) |
| **V34-API-BP-03** | Foundation | Option-B API Harness Scaffolding | **STABLE** | Global fetch patched; flowHandlers initialized | 2026-01-27 11:15 (IST) |
| **V34-FND-BP-02** | Foundation | Add Flow Contract Types (shared flow + API envelope types) | **STABLE** | Types-only; no runtime change | 2026-01-27 10:45 (IST) |
| **V34-FND-BP-01** | Foundation | Add Flow Inventory registry (docs only) + bump version to V3.4 | **STABLE** | No UI/runtime change | 2026-01-27 10:20 (IST) |

## V3.1-EXT Archive (Frozen)
...