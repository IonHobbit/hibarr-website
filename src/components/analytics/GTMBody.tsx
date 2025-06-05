import React, { Fragment } from 'react'

export default function GTMBody() {
  return (
    <Fragment>
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-MFTG9QBN"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        ></iframe>
      </noscript>
    </Fragment>
  )
}
