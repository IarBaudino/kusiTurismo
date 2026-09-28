import { brand } from "@/config/brand";
import type { SiteSettings } from "@/types/site-settings";

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  hero: {
    eyebrow: "Turismo Comunitario",
    title: "Kusi significa alegría",
    subtitle:
      "Unimos viajeros con comunidades indígenas, campesinas y locales de cada territorio.",
    ctaPrimaryLabel: "Ver experiencias",
    ctaPrimaryHref: "/#excursiones",
    ctaSecondaryLabel: "Consultanos",
    ctaSecondaryHref: "/#consulta",
    backgroundImages: [],
    backgroundMedia: [],
  },
  excursionsPreview: {
    title: "Nuestras experiencias",
    description:
      "El viajero no solo observa: convive, aprende saberes ancestrales y comparte la vida cotidiana. El objetivo es sumergirse en la cultura, no solo pasar por el lugar.",
  },
  packagesPreview: {
    title: "Nuestros paquetes",
    description:
      "Estadías para convivir con familias anfitrionas, con calidez, cuidado y respeto por sus tiempos y costumbres.",
  },
  groupTripsPreview: {
    title: "Viajes grupales",
    description:
      "Ediciones con fechas fijas para recorrer el territorio juntas y compartir la vida cotidiana de las comunidades.",
  },
  about: {
    title: "Quiénes somos",
    quote:
      "El turismo comunitario no es solo una forma de viajar: es una herramienta de transformación social real.",
    values: [
      {
        title: "Preservación",
        text: "Valoramos la sabiduría tradicional y protegemos los recursos naturales de cada ecosistema local. Las familias anfitrionas cuidan la tierra que las sostiene.",
      },
      {
        title: "Comunidad",
        text: "Las propias familias gestionan la acogida y la planificación. Los recursos se quedan en la localidad e impulsan desarrollo y calidad de vida.",
      },
      {
        title: "Autenticidad",
        text: "Creamos intercambios culturales genuinos. El viajero es invitado, no espectador. Nada se hace sin permiso de la comunidad.",
      },
    ],
    closingText:
      "Kusi nace de unir viajeros con ganas de experiencias reales y comunidades indígenas, campesinas y locales. En cada encuentro hay calidez, cuidado y respeto absoluto por los tiempos y las costumbres de quienes reciben.",
  },
  inquiry: {
    title: "¿Viajamos en modo Kusi?",
    subtitle:
      "Contanos qué estás buscando y te proponemos un encuentro real, con respeto y calidez.",
  },
  footer: {
    brandName: brand.agencyName,
    tagline:
      "Kusi significa alegría. Turismo comunitario que se queda en la comunidad.",
    address: brand.location.address,
    email: brand.email,
    phoneLabel: brand.phoneLabel,
    phoneNumber: brand.phoneDigits,
  },
  social: {
    instagramUrl: brand.social.instagramUrl,
    instagramHandle: brand.social.instagramHandle,
  },
  googleReviews: {
    enabled: false,
    placeId: "",
    title: "Lo que dicen en Google",
  },
  booking: {
    orderHoldHours: 48,
    hoursBeforeDeparture: 2,
    holdWarningMessage: "",
  },
  payments: {
    bankName: "",
    accountHolder: "",
    cbu: "",
    alias: "",
    notes: "",
  },
};
