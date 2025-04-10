'use client';

import React, { useEffect } from 'react'

type CalendlyEmbedProps = {
  url: string;
}

export default function CalendlyEmbed({ url }: CalendlyEmbedProps) {
  useEffect(() => {
    const head = document.querySelector("head");
    const script = document.createElement("script");
    script.setAttribute(
      "src",
      "https://assets.calendly.com/assets/external/widget.js"
    );
    head?.appendChild(script);
  }, []);

  return (
    <div
      className="calendly-inline-widget"
      data-url={url}
      style={{ height: "530px", width: "100%" }}
    ></div>
  )
}
