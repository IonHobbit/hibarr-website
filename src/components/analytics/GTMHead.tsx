import Script from 'next/script'
import React, { Fragment } from 'react'

type GTMHeadProps = {
  nonce?: string
}

export default function GTMHead({ nonce }: GTMHeadProps) {
  return (
    <Fragment>
      <Script
        id="gtm-head"
        strategy="afterInteractive"
        nonce={nonce}
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l] = w[l] || [];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MFTG9QBN');`
        }}
      />
    </Fragment>
  )
}
