'use client';

import React, { useEffect } from 'react'

type CalendlyEmbedProps = {
  url: string;
  nonce?: string;
}

export default function CalendlyEmbed({ url, nonce }: CalendlyEmbedProps) {
  useEffect(() => {
    const script = document.createElement("script");
    script.setAttribute(
      "src",
      "https://assets.calendly.com/assets/external/widget.js"
    );
    if (nonce) {
      script.setAttribute("nonce", nonce);
    }
    document.head.appendChild(script);
  }, [nonce]);

  return (
    <div
      className="calendly-inline-widget"
      data-url={url}
      style={{ height: "530px", width: "100%" }}
    ></div>
  )
}
