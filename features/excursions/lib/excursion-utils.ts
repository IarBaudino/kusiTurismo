import type { Service } from "@/types";
import { resolveServiceForCatalog, getEnabledCatalogSeasons, resolveServiceForSeason } from "@/lib/seasons";
import { slotRemaining } from "@/features/excursions/lib/departures";

export function getServiceCategories(services: Service[]): string[] {
  const set = new Set<string>();
  for (const s of services) {
    if (s.category) set.add(s.category);
  }
  return Array.from(set).sort();
}

export function getServiceLocations(services: Service[]): string[] {
  const set = new Set<string>();
  for (const s of services) {
    const location = s.location?.trim();
    if (location) set.add(location);
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b, "es"));
}

export function getServiceDurations(services: Service[]): string[] {
  const set = new Set<string>();
  for (const s of services) {
    const seasons = getEnabledCatalogSeasons(s);
    if (seasons.length === 0) {
      const duration = resolveServiceForCatalog(s, null).duration?.trim();
      if (duration) set.add(duration);
      continue;
    }
    for (const season of seasons) {
      const duration = resolveServiceForSeason(s, season).duration?.trim();
      if (duration) set.add(duration);
    }
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b, "es"));
}

export function serviceHasDepartureOnDate(service: Service, ymd: string): boolean {
  const lists = [
    service.departures,
    service.seasonalVariants?.verano?.enabled ? service.seasonalVariants.verano.departures : undefined,
    service.seasonalVariants?.invierno?.enabled
      ? service.seasonalVariants.invierno.departures
      : undefined,
  ];

  for (const list of lists) {
    if (!list?.length) continue;
    for (const slot of list) {
      if (slot.active === false) continue;
      if (slotRemaining(slot) <= 0) continue;
      if (slot.date === ymd) return true;
    }
  }
  return false;
}

export function serviceHasDuration(service: Service, duration: string): boolean {
  const seasons = getEnabledCatalogSeasons(service);
  if (seasons.length === 0) {
    return resolveServiceForCatalog(service, null).duration?.trim() === duration;
  }
  return seasons.some(
    (season) => resolveServiceForSeason(service, season).duration?.trim() === duration
  );
}
