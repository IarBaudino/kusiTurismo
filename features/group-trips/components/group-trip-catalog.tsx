"use client";

import { useMemo, useState } from "react";
import { GroupTripCard } from "@/features/group-trips/components/group-trip-card";
import { defaultDurationLabel } from "@/features/group-trips/lib/dates";
import type { GroupTrip } from "@/types/catalog";

type Props = {
  trips: GroupTrip[];
};

const fieldClass =
  "mt-1.5 w-full rounded-lg border border-brand-border bg-white px-3 py-2.5 text-brand-charcoal";

export function GroupTripCatalog({ trips }: Props) {
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState("");

  const destinationOptions = useMemo(() => {
    const set = new Set<string>();
    for (const trip of trips) {
      const value = trip.destination?.trim();
      if (value) set.add(value);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b, "es"));
  }, [trips]);

  const durationOptions = useMemo(() => {
    const set = new Set<string>();
    for (const trip of trips) {
      const value =
        trip.durationLabel?.trim() ||
        defaultDurationLabel(trip.startDate, trip.endDate);
      if (value) set.add(value);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b, "es"));
  }, [trips]);

  const filtered = useMemo(() => {
    return trips.filter((trip) => {
      if (destination && trip.destination?.trim() !== destination) return false;
      const tripDuration =
        trip.durationLabel?.trim() ||
        defaultDurationLabel(trip.startDate, trip.endDate);
      if (duration && tripDuration !== duration) return false;
      if (date) {
        const starts = trip.startDate;
        const ends = trip.endDate || trip.startDate;
        if (date < starts || date > ends) return false;
      }
      return true;
    });
  }, [trips, destination, duration, date]);

  if (trips.length === 0) {
    return (
      <p className="mt-12 rounded-xl border border-dashed border-brand-border bg-white py-16 text-center text-brand-muted">
        No hay viajes grupales publicados por ahora.
      </p>
    );
  }

  return (
    <div className="mt-10">
      <div className="flex flex-col gap-4 rounded-xl border border-brand-border bg-white p-4 shadow-sm sm:flex-row sm:flex-wrap sm:items-end">
        <div className="min-w-[160px] flex-1">
          <label htmlFor="trip-destination" className="block text-sm font-medium text-brand-charcoal">
            Destino
          </label>
          <select
            id="trip-destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className={fieldClass}
          >
            <option value="">Todos</option>
            {destinationOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="min-w-[160px] flex-1">
          <label htmlFor="trip-duration" className="block text-sm font-medium text-brand-charcoal">
            Duración
          </label>
          <select
            id="trip-duration"
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
          <label htmlFor="trip-date" className="block text-sm font-medium text-brand-charcoal">
            Fecha
          </label>
          <input
            id="trip-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={fieldClass}
          />
        </div>
        <button
          type="button"
          onClick={() => {
            setDestination("");
            setDuration("");
            setDate("");
          }}
          className="rounded-lg border border-brand-border px-4 py-2.5 text-sm font-medium text-brand-charcoal hover:bg-brand-ice"
        >
          Limpiar filtros
        </button>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-12 rounded-xl border border-dashed border-brand-border bg-white py-16 text-center text-brand-muted">
          No hay viajes grupales con esos filtros.
        </p>
      ) : (
        <ul className="mt-10 grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((trip) => (
            <li key={trip.id}>
              <GroupTripCard trip={trip} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
