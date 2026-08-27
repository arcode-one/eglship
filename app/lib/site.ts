const requestedBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? "";

export const basePath = requestedBasePath && requestedBasePath !== "/"
  ? `/${requestedBasePath.replace(/^\/+|\/+$/g, "")}`
  : "";

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const siteUrl = (configuredSiteUrl || "https://eglship.com").replace(/\/+$/, "");
export const siteName = "EGLSHIP";
export const siteTitle = "Доставка товаров из США в Россию и СНГ | EGLSHIP";
export const siteDescription =
  "EGLSHIP доставляет покупки из США в Россию, Беларусь, Казахстан, Кыргызстан, Узбекистан и Армению. Склады в США, объединение посылок и онлайн-расчёт стоимости.";

export function absoluteUrl(path = "/") {
  const normalizedPath = path === "/" ? "" : `/${path.replace(/^\/+/, "")}`;
  return `${siteUrl}${normalizedPath}`;
}
