import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";

const http = httpRouter();

// Define your route with CORS headers
http.route({
  path: "https://memoir-ashen.vercel.app/",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    // Your logic here

    // Return response with CORS headers
    return new Response(JSON.stringify({ message: "Success" }), {
      status: 200,
      headers: new Headers({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin":
          process.env.CLIENT_ORIGIN || "https://your-allowed-origin.com",
        Vary: "origin",
      }),
    });
  }),
});

// Handle preflight OPTIONS request for the same endpoint
http.route({
  path: "https://memoir-ashen.vercel.app/",
  method: "OPTIONS",
  handler: httpAction(async (_, request) => {
    const headers = request.headers;
    if (
      headers.get("Origin") !== null &&
      headers.get("Access-Control-Request-Method") !== null &&
      headers.get("Access-Control-Request-Headers") !== null
    ) {
      return new Response(null, {
        headers: new Headers({
          "Access-Control-Allow-Origin":
            process.env.CLIENT_ORIGIN || "https://your-allowed-origin.com",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Access-Control-Max-Age": "86400",
        }),
      });
    } else {
      return new Response();
    }
  }),
});

export default http;
