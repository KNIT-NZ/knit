// app/api/site-preview/route.ts
import { NextRequest } from "next/server";
import { chromium as playwright } from "playwright-core";
import chromium from "@sparticuz/chromium";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const target = req.nextUrl.searchParams.get("url");

  if (!target) {
    return new Response("Missing url", { status: 400 });
  }

  let browser;
  try {
    browser = await playwright.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true,
    });

    const page = await browser.newPage({
      viewport: { width: 1440, height: 960 },
      deviceScaleFactor: 1,
    });

    await page.goto(target, {
      waitUntil: "networkidle",
      timeout: 20000,
    });

    const buffer = await page.screenshot({
      type: "png",
      fullPage: false,
    });

    return new Response(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    const details =
      error instanceof Error
        ? `${error.name}: ${error.message}\n${error.stack ?? ""}`
        : typeof error === "string"
          ? error
          : JSON.stringify(error, null, 2);

    console.error("site-preview failed\n", details);

    return new Response(details, {
      status: 500,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } finally {
    await browser?.close();
  }
}
