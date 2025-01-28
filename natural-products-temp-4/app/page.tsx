import Hero from "./Components/Hero/Hero";

export default function Home() {
  const deviceType = "mobile";
  return (
    <>
      <div className="w-full min-h-screen">
        <Hero deviceType={deviceType} />
      </div>
    </>
  );
}
