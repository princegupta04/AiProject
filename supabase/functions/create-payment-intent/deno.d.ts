declare namespace Deno {
  export const env: {
    get(key: string): string | undefined;
  };
}

declare module "https://deno.land/std@0.168.0/http/server.ts" {
  export function serve(handler: (req: Request) => Promise<Response>): void;
}

declare module "stripe" {
  export default class Stripe {
    constructor(apiKey: string, config?: { apiVersion: string });
    paymentIntents: {
      create(params: {
        amount: number;
        currency: string;
        metadata?: Record<string, string>;
      }): Promise<{ client_secret: string }>;
    };
  }
} 