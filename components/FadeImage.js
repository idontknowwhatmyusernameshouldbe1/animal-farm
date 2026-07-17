"use client";

export default function FadeImage({ src, alt, className = "" }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onLoad={(event) => {
        event.currentTarget.classList.add("is-loaded");
      }}
    />
  );
}
