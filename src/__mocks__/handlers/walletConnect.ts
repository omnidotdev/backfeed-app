import { http, HttpResponse } from "msw";

/**
 * Mock [WalletConnect](https://walletconnect.network) handlers.
 */
const mockWalletConnectHandlers = [
  http.post("https://pulse.walletconnect.org/batch", () => {
    return HttpResponse.json({});
  }),
];

export default mockWalletConnectHandlers;
