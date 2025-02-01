import ThemesPage from "@/app/Components/Themes/ThemesPage";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main>
        <ThemesPage />
        <Link href={"/customize"}>
          <button className="px-4 py-2 border mt-2 bg-gray-800 text-white font-semibold rounded-sm ml-2 hover:bg-gray-900 active:bg-gray-950">
            Customize themes
          </button>
        </Link>
      </main>
    </>
  );
}
