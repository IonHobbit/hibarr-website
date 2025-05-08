import React, { Fragment } from 'react';
import Form from './_components/form'
import { Locale } from '@/lib/i18n-config'


export default async function webinarPlayback(
  props: {
    params: Promise<{ lang: Locale }>;
  }
) {
  const { lang } = await props.params;



    return (
      <Fragment>
        <section className='bg-primary/20  overflow-x-hidden'>
                <Form lang='lang'/>
          </section>
      </Fragment>
    );
  }
