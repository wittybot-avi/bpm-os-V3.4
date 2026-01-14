/**
 * V3.4 API Interceptor Harness
 * Provides an exported apiFetch wrapper instead of patching window.fetch.
 * Required for compatibility with AI Studio sandbox.
 * @hotfix V34-HOTFIX-BP-00
 */

import { handleFlowRequest } from './flowHandlers';

export type ApiFetch = typeof fetch;

const nativeFetch: ApiFetch = (...args) => fetch(...args);

/**
 * apiFetch Wrapper
 * Use this instead of global fetch for MES Pilot flow calls.
 */
export const apiFetch: ApiFetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
  const url = typeof input === 'string' ? input : 
              input instanceof URL ? input.toString() : 
              input.url;

  // Intercept only /api flows requests
  if (url.includes('/api/flows/')) {
    console.debug(`[BPM-API] Routing to simulator: ${init?.method || 'GET'} ${url}`);
    // Simulate network latency for pilot feel
    await new Promise(resolve => setTimeout(resolve, 400 + Math.random() * 400));
    return handleFlowRequest(url, init);
  }

  // Pass through all other requests
  return nativeFetch(input, init);
};

/**
 * NO-OP initializer for backward compatibility.
 * Global patching is blocked by sandbox environment.
 */
export const initApiHarness = () => {
  console.info('BPM-OS: API Harness initialized in wrapper-mode (Sandbox restricted global fetch).');
  return { installed: false, reason: "Sandbox blocks overriding window.fetch. Use apiFetch wrapper instead." };
};
