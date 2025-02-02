"use client";

import { SignIn } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

const SignInPage = () => {
    const searchParams = useSearchParams();

    // Get the "redirect_url" from query parameters
    const redirectUrl = useMemo(() => {
        const query = searchParams.get("redirect_url");
        return query || "/";
    }, [searchParams]);

    return (
        <section className="w-full pt-4 flex justify-center items-center">
            <SignIn redirectUrl={redirectUrl} />
        </section>
    );
};

export default SignInPage;
