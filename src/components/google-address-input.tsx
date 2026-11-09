"use client";

import { useEffect, useRef, useState } from "react";

type GoogleAddressInputProps = {
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  placeholder?: string;
  className?: string;
};

export function GoogleAddressInput({ value, onChange, name, placeholder = "Search for an address", className = "" }: GoogleAddressInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [coordinates, setCoordinates] = useState({ latitude: "", longitude: "", placeId: "" });
  const isControlled = value !== undefined;

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
    if (!key || !inputRef.current) return;
    const scriptId = "google-maps-places-script";
    const attach = () => {
      const googleMaps = (window as any).google;
      if (!inputRef.current || !googleMaps?.maps?.places) return;
      const autocomplete = new googleMaps.maps.places.Autocomplete(inputRef.current, {
        fields: ["formatted_address", "geometry", "place_id"],
        componentRestrictions: { country: "ng" },
      });
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        const address = place.formatted_address || inputRef.current?.value || "";
        if (inputRef.current && !isControlled) inputRef.current.value = address;
        onChange?.(address);
        setCoordinates({
          latitude: place.geometry?.location?.lat?.()?.toString() || "",
          longitude: place.geometry?.location?.lng?.()?.toString() || "",
          placeId: place.place_id || "",
        });
      });
    };
    const existing = document.getElementById(scriptId);
    if (existing) { attach(); return; }
    const script = document.createElement("script");
    script.id = scriptId;
    script.async = true;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&libraries=places`;
    script.onload = attach;
    document.head.appendChild(script);
  }, [isControlled, onChange]);

  return (
    <>
      <input
        ref={inputRef}
        name={name}
        {...(isControlled ? { value, onChange: (event) => onChange?.(event.target.value) } : { defaultValue: value })}
        placeholder={placeholder}
        className={className}
      />
      {name && <>
        <input type="hidden" name={`${name}_latitude`} value={coordinates.latitude} />
        <input type="hidden" name={`${name}_longitude`} value={coordinates.longitude} />
        <input type="hidden" name={`${name}_place_id`} value={coordinates.placeId} />
      </>}
    </>
  );
}
