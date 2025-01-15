import { http, HttpResponse } from "msw";
import { ports } from "./ports";

export const handlers = [
  http.get("http://api.zeronorth.app/api/v1/ports", ({ request }) => {
    const url = new URL(request.url);
    const pageStr = url.searchParams.get("page") ?? "1";
    const sizeStr = url.searchParams.get("size") ?? "100";

    // Convert to numbers and validate
    const page = Number(pageStr);
    const size = Number(sizeStr);

    if (isNaN(page) || isNaN(size)) {
      return new HttpResponse(null, {
        status: 400,
        statusText: "Page and size parameters must be numeric",
      });
    }

    if (size > 499 || size < 1) {
      return new HttpResponse(null, {
        status: 400,
        statusText: "Size parameter must be between 1 and 500",
      });
    }

    if (page < 1) {
      return new HttpResponse(null, {
        status: 400,
        statusText: "Page parameter must be greater than 0",
      });
    }

    const data = ports.slice(page * size, page * size + size);

    return HttpResponse.json({
      total: ports.length,
      page,
      size,
      data,
    });
  }),
];
