import React, { forwardRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import UseTitle from '@/hooks/useTitle';

type PageProps = {
  children: React.ReactNode;
  title?: string;
  meta?: any;
};

const Page = forwardRef(
  (
    { children, title = '', meta, ...other }: PageProps,
    ref?: React.LegacyRef<HTMLDivElement> | undefined
  ) => {
    UseTitle(title);

    useEffect(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }, [title]);

    return (
      <>
        <Helmet>
          <title>{`${title} | LMS`}</title>
          {meta}
        </Helmet>
        <div ref={ref} {...other} className="bg-gray-50 dark:bg-gray-900">
          {children}
        </div>
      </>
    );
  }
);

export default Page;
