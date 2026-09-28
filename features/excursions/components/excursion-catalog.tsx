"use client";

import { useMemo, useState } from "react";
import type { Service } from "@/types";
import { ExcursionCard } from "@/features/excursions/components/excursion-card";
import {
  getServiceCategories,
  getServiceDurations,
  getServiceLocations,
  serviceHasDepartureOnDate,
  serviceHasDuration,
} from "@/features/excursions/lib/excursion-utils";
import { resolveServiceForCatalog } from "@/lib/seasons";

type Props = {
  services: Service[];
};

const fieldClass =
  "mt-1.5 w-full rounded-lg border border-brand-border bg-white px-3 py-2.5 text-brand-charcoal";

export function ExcursionCatalog({ services }: Props) {
  const categoryOptions = useMemo(() => getServiceCategories(services), [services]);
  const locationOptions = useMemo(() => getServiceLocations(services), [services]);
  const durationOptions = useMemo(() => getServiceDurations(services), [services]);

  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const maxInCatalog = useMemo(
    () => (services.length ? Math.max(...services.map((s) => s.price)) : 0),
    [services]
  );

  const filtered = useMemo(() => {
    let list = services;
    if (location) {
      list = list.filter((s) => s.location?.trim() === location);
    }
    if (duration) {
      list = list.filter((s) => serviceHasDuration(s, duration));
    }
    if (date) {
      list = list.filter((s) => serviceHasDepartureOnDate(s, date));
    }
    if (category) {
      list = list.filter((s) => s.category === category);
    }
    if (maxPrice.trim()) {
      const n = Number(maxPrice);
      if (!Number.isNaN(n) && n > 0) {
        list = list.filter((s) => resolveServiceForCatalog(s, null).price <= n);
      }
    }
    return list;
  }, [services, location, duration, date, category, maxPrice]);

  function clearFilters() {
    setLocation("");
    setDuration("");
    setDate("");
    setCategory("");
    setMaxPrice("");
  }

  return (
    <div>
      <div className="flex flex-col gap-4 rounded-xl border border-brand-border bg-white p-4 shadow-sm sm:flex-row sm:flex-wrap sm:items-end">
        <div className="min-w-[160px] flex-1">
          <label htmlFor="filter-location" className="block text-sm font-medium text-brand-charcoal">
            Destino
          </label>
          <select
            id="filter-location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={fieldClass}
          >
            <option value="">Todos</option>
            {locationOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="min-w-[160px] flex-1">
          <label htmlFor="filter-duration" className="block text-sm font-medium text-brand-charcoal">
            Duración
          </label>
          <select
            id="filter-duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className={fieldClass}
          >
            <option value="">Todas</option>
            {durationOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="min-w-[160px] flex-1">
          <label htmlFor="filter-date" className="block text-sm font-medium text-brand-charcoal">
            Fecha
          </label>
          <input
            id="filter-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={fieldClass}
          />
        </div>
        <div className="min-w-[160px] flex-1">
          <label htmlFor="filter-category" className="block text-sm font-medium text-brand-charcoal">
            Categoría
          </label>
          <select
            id="filter-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={fieldClass}
          >
            <option value="">Todas</option>
            {categoryOptions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="min-w-[160px] flex-1">
          <label htmlFor="filter-price" className="block text-sm font-medium text-brand-charcoal">
            Precio máximo (ARS)
          </label>
          <input
            id="filter-price"
            type="number"
            min={0}
            placeholder={maxInCatalog ? `Ej. ${maxInCatalog}` : "Sin tope"}
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className={`${fieldClass} placeholder:text-brand-muted/60`}
          />
        </div>
        <button
          type="button"
          onClick={clearFilters}
          className="rounded-lg border border-brand-border px-4 py-2.5 text-sm font-medium text-brand-charcoal hover:bg-brand-ice"
        >
          Limpiar filtros
        </button>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-12 rounded-xl border border-dashed border-brand-border bg-white py-16 text-center text-brand-muted">
          No hay experiencias con esos filtros. Probá otro destino, fecha o precio.
        </p>
      ) : (
        <ul className="mt-10 grid list-none gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((service) => (
            <li key={service.id}>
              <ExcursionCard service={service} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
