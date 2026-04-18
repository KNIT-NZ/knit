// app/api/site-preview/route.ts
import { NextRequest } from "next/server";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium-min";

export const runtime = "nodejs";

const CHROMIUM_PACK_URL = process.env.CHROMIUM_PACK_URL!;

export async function GET(req: NextRequest) {
  const target = req.nextUrl.searchParams.get("url");

  if (!target) {
    return new Response("Missing url", { status: 400 });
  }

  let browser;
  try {
    browser = await puppeteer.launch({
      args: puppeteer.defaultArgs({
        args: chromium.args,
        headless: "shell",
      }),
      executablePath: await chromium.executablePath(CHROMIUM_PACK_URL),
      headless: "shell",
      defaultViewport: {
        width: 1440,
        height: 960,
        deviceScaleFactor: 1,
      },
    });

    const page = await browser.newPage();

    await page.goto(target, {
      waitUntil: "networkidle2",
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