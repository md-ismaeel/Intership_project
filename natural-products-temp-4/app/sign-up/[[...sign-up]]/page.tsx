"use client";

import { SignUp } from '@clerk/nextjs';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export default function SignUpPage() {
  const searchParams = useSearchParams();

  // Ensure redirect_url is always a string
  const redirectUrl = useMemo(() => {
    const query = searchParams.get('redirect_url');
    return query || '/sign-in'; // Default to '/sign-up' if no redirect_url
  }, [searchParams]);

  return (
    <section className="w-full pt-4 flex justify-center items-center">
      <SignUp redirectUrl={redirectUrl} />
    </section>
  );
}
