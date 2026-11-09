"use client";

import { useEffect, useRef, useState } from "react";

type GoogleAddressInputProps = {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export function GoogleAddressInput({
  name,
  value,
  onChange,
  placeholder = "Search for an address",
  className = "",
}: GoogleAddressInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState(value || "");
  const [coordinates, setCoordinates] = useState({
    latitude: "",
    longitude: "",
    placeId: "",
  });

  const currentValue = value ?? text;

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;

    if (!key || !inputRef.current) return;

    const scriptId = "google-maps-places-script";

    const attachAutocomplete = () => {
      const googleMaps = (window as any).google;

      if (!inputRef.current || !googleMaps?.maps?.places) return;

      const autocomplete =
        new googleMaps.maps.places.Autocomplete(inputRef.current, {
          fields: ["formatted_address", "geometry", "place_id"],
          componentRestrictions: {
            country: "ng",
          },
        });

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();

        const address =
          place.formatted_address ||
          inputRef.current?.value ||
          "";

        setText(address);
        onChange?.(address);

        setCoordinates({
          latitude:
            place.geometry?.location?.lat?.()?.toString() || "",
          longitude:
            place.geometry?.location?.lng?.()?.toString() || "",
          placeId: place.place_id || "",
        });
      });
    };

    const existingScript = document.getElementById(scriptId);

    if (existingScript) {
      attachAutocomplete();
      return;
    }

    const script = document.createElement("script");

    script.id = scriptId;
    script.async = true;
    script.defer = true;
    script.src =
      `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
        key,
      )}&libraries=places`;

    script.onload = attachAutocomplete;

    document.head.appendChild(script);
  }, [onChange]);

  function handleChange(nextValue: string) {
    setText(nextValue);
    onChange?.(nextValue);

    // Clear old coordinates if the user edits the selected address.
    setCoordinates({
      latitude: "",
      longitude: "",
      placeId: "",
    });
  }

  return (
    <>
      <input
        ref={inputRef}
        name={name}
        type="text"
        required
        value={currentValue}
        onChange={(event) =>
          handleChange(event.target.value)
        }
        placeholder={placeholder}
        className={className}
      />

      <input
        type="hidden"
        name={`${name}_latitude`}
        value={coordinates.latitude}
      />

      <input
        type="hidden"
        name={`${name}_longitude`}
        value={coordinates.longitude}
      />

      <input
        type="hidden"
        name={`${name}_place_id`}
        value={coordinates.placeId}
      />
    </>
  );
}