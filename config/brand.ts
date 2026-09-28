/**
 * Identidad de Kusi. Se puede overridear con NEXT_PUBLIC_BRAND_*.
 * Las claves de env van literales para que Next las inline igual en server y client.
 */
function trimEnv(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed || undefined;
}

function csv(raw: string | undefined, fallback: string[]): string[] {
  if (!raw?.trim()) return fallback;
  return raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function getAppUrl(): string {
  return (trimEnv(process.env.NEXT_PUBLIC_APP_URL) ?? "http://localhost:3000").replace(
    /\/$/,
    ""
  );
}

const agencyName = trimEnv(process.env.NEXT_PUBLIC_BRAND_NAME) ?? "Kusi Experiencias";
const shortName = trimEnv(process.env.NEXT_PUBLIC_BRAND_SHORT_NAME) ?? "Kusi";
const city = trimEnv(process.env.NEXT_PUBLIC_BRAND_CITY) ?? "Norte argentino";
const region = trimEnv(process.env.NEXT_PUBLIC_BRAND_REGION) ?? "Argentina";
const country = trimEnv(process.env.NEXT_PUBLIC_BRAND_COUNTRY) ?? "Argentina";
const countryCode = trimEnv(process.env.NEXT_PUBLIC_BRAND_COUNTRY_CODE) ?? "AR";
const slug = trimEnv(process.env.NEXT_PUBLIC_BRAND_SLUG) ?? "kusi";

export const brand = {
  agencyName,
  shortName,
  slug,
  logo: {
    src: trimEnv(process.env.NEXT_PUBLIC_BRAND_LOGO_SRC) ?? "/logoKusi.png",
    width: Number(trimEnv(process.env.NEXT_PUBLIC_BRAND_LOGO_WIDTH) ?? "381"),
    height: Number(trimEnv(process.env.NEXT_PUBLIC_BRAND_LOGO_HEIGHT) ?? "430"),
  },
  locale: trimEnv(process.env.NEXT_PUBLIC_BRAND_LOCALE) ?? "es_AR",
  htmlLang: trimEnv(process.env.NEXT_PUBLIC_BRAND_HTML_LANG) ?? "es",
  currency: trimEnv(process.env.NEXT_PUBLIC_BRAND_CURRENCY) ?? "ARS",
  countryCallingCode: trimEnv(process.env.NEXT_PUBLIC_BRAND_CALLING_CODE) ?? "54",
  whatsappNumber: trimEnv(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER) ?? "",
  email: trimEnv(process.env.NEXT_PUBLIC_BRAND_EMAIL) ?? "info@kusiturismo.com",
  phoneLabel: trimEnv(process.env.NEXT_PUBLIC_BRAND_PHONE_LABEL) ?? "Teléfono",
  phoneDigits: trimEnv(process.env.NEXT_PUBLIC_BRAND_PHONE_DIGITS) ?? "",
  location: {
    city,
    region,
    country,
    countryCode,
    address:
      trimEnv(process.env.NEXT_PUBLIC_BRAND_ADDRESS) ?? `${city}, ${region}, ${country}`,
    line: trimEnv(process.env.NEXT_PUBLIC_BRAND_LOCATION_LINE) ?? `${city} · ${region}`,
  },
  social: {
    instagramUrl: trimEnv(process.env.NEXT_PUBLIC_INSTAGRAM_URL) ?? "",
    instagramHandle: trimEnv(process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE) ?? "",
  },
  seo: {
    titleDefault:
      trimEnv(process.env.NEXT_PUBLIC_SEO_TITLE) ??
      `${agencyName} | Turismo comunitario en el ${city}`,
    titleTemplate:
      trimEnv(process.env.NEXT_PUBLIC_SEO_TITLE_TEMPLATE) ?? `%s | ${agencyName}`,
    description:
      trimEnv(process.env.NEXT_PUBLIC_SEO_DESCRIPTION) ??
      `Kusi significa alegría en quechua. Turismo comunitario: encuentros reales con comunidades indígenas, campesinas y locales del ${city}.`,
    keywords: csv(process.env.NEXT_PUBLIC_SEO_KEYWORDS, [
      "turismo comunitario",
      "Kusi",
      `experiencias ${city}`,
      "comunidades",
      shortName,
    ]),
  },
  theme: {
    primary: trimEnv(process.env.NEXT_PUBLIC_THEME_PRIMARY) ?? "#203d6c",
    primaryDark: trimEnv(process.env.NEXT_PUBLIC_THEME_PRIMARY_DARK) ?? "#203d6c",
    secondary: trimEnv(process.env.NEXT_PUBLIC_THEME_SECONDARY) ?? "#48638f",
    secondaryHover: trimEnv(process.env.NEXT_PUBLIC_THEME_SECONDARY_HOVER) ?? "#48638f",
    charcoal: trimEnv(process.env.NEXT_PUBLIC_THEME_CHARCOAL) ?? "#203d6c",
    charcoalMuted: trimEnv(process.env.NEXT_PUBLIC_THEME_CHARCOAL_MUTED) ?? "#48638f",
    sand: trimEnv(process.env.NEXT_PUBLIC_THEME_SAND) ?? "#d0c1a9",
    ice: trimEnv(process.env.NEXT_PUBLIC_THEME_ICE) ?? "#ebe3d6",
    surface: trimEnv(process.env.NEXT_PUBLIC_THEME_SURFACE) ?? "#faf6f0",
    border: trimEnv(process.env.NEXT_PUBLIC_THEME_BORDER) ?? "#c5b7a0",
  },
  developerCredit: {
    enabled: process.env.NEXT_PUBLIC_DEVELOPER_CREDIT !== "false",
    name: trimEnv(process.env.NEXT_PUBLIC_DEVELOPER_NAME) ?? "Iara Baudino",
    url:
      trimEnv(process.env.NEXT_PUBLIC_DEVELOPER_URL) ??
      "https://www.iarabaudinodev.com.ar",
  },
  cartStorageKey: trimEnv(process.env.NEXT_PUBLIC_CART_STORAGE_KEY) ?? `${slug}-cart-v10`,
} as const;

export function brandLogoAlt(): string {
  return brand.agencyName;
}

export function brandEmailSignatureHtml(): string {
  return `Equipo ${brand.agencyName}<br>${brand.location.city}, ${brand.location.region}`;
}

export function brandEmailSignatureText(): string {
  return `Equipo ${brand.agencyName} — ${brand.location.city}, ${brand.location.region}`;
}

export function brandLogoHtml(width = 120): string {
  const src = `${getAppUrl()}${brand.logo.src}`;
  return `<img src="${src}" alt="${brand.agencyName}" width="${width}" style="display:block;margin:0 0 20px 0" />`;
}

export function brandThemeCssVars(): Record<string, string> {
  const { theme } = brand;
  return {
    "--color-brand-primary": theme.primary,
    "--color-brand-primary-dark": theme.primaryDark,
    "--color-brand-secondary": theme.secondary,
    "--color-brand-secondary-hover": theme.secondaryHover,
    "--color-brand-accent": theme.primary,
    "--color-brand-forest": theme.primary,
    "--color-brand-charcoal": theme.charcoal,
    "--color-brand-charcoal-muted": theme.charcoalMuted,
    "--color-brand-muted": theme.charcoalMuted,
    "--color-brand-sand": theme.sand,
    "--color-brand-ice": theme.ice,
    "--color-brand-surface": theme.surface,
    "--color-brand-border": theme.border,
  };
}

export function formatPhoneHref(digits: string): { tel: string; whatsapp: string } {
  const cleaned = digits.replace(/\D/g, "");
  const code = brand.countryCallingCode;
  const national = cleaned.startsWith(code) ? cleaned.slice(code.length) : cleaned;
  return {
    tel: `tel:+${code}${national}`,
    whatsapp: `https://wa.me/${code}${national}`,
  };
}
