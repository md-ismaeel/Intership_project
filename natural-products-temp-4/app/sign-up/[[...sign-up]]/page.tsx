import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <section className="w-full pt-4 flex justify-center items-center">
        <SignUp />
      </section>
    </>
  );
}
