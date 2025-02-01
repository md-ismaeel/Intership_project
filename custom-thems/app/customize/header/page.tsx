"use client";
import ToggleButton from "@/app/Components/ToggleButton/ToggleButton";
import UpdateButton from "@/app/Components/UpdateButton/UpdateButton";
import Image from "next/image";
import React, { useState } from "react";
import { MdOutlineImageNotSupported } from "react-icons/md";

export default function HeadersAndFav() {
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const [faviconImage, setFaviconImage] = useState<string | null>(null);
  const [logoError, setLogoError] = useState<string | null>(null);
  const [faviconError, setFaviconError] = useState<string | null>(null);

  const handleLogoImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (!file.type.startsWith("image/")) {
        setLogoError("Please upload a valid image file.");
        return;
      }

      setLogoError(null);
      const reader = new FileReader();
      reader.onloadend = () => setLogoImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleFaviconImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (!file.type.startsWith("image/")) {
        setLogoError("Please upload a valid image file.");
        return;
      }

      if (file) {
        setFaviconError(null);
        const reader = new FileReader();
        reader.onloadend = () => setFaviconImage(reader.result as string);
        reader.readAsDataURL(file);
      }
    }
  };
  return (
    <section className="w-[75%] h-[500px] flex flex-col gap-5 justify-start items-center overflow-y-auto">
      {/* Store Logo Section */}
      <div className="bg-white w-full shadow-md p-5 rounded-lg">
        <h1 className="text-gray-900 font-semibold text-lg mb-3">Store Logo</h1>

        <div className="flex items-center justify-start gap-4">
          <div className="relative w-20 h-20 group">
            {logoImage ? (
              <Image
                src={logoImage}
                alt="Uploaded Logo"
                fill
                className="object-cover rounded-md"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-20 h-20 flex justify-center items-center bg-gray-100 border border-gray-300 rounded-md">
                <MdOutlineImageNotSupported className="text-gray-500" />
              </div>
            )}
          </div>

          <label className="cursor-pointer text-white text-md px-4 py-2 rounded-md bg-gray-400 hover:bg-gray-500">
            Upload Image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleLogoImageChange}
            />
          </label>
        </div>

        {logoError && <p className="text-red-500 text-sm mt-2">{logoError}</p>}
      </div>

      {/* Toggle Button */}
      <ToggleButton
        title="Show store name"
        description="Show store name alongside the store logo in the navigation bar"
      />

      {/* Favicon Section */}
      <div className="w-full p-5 shadow-md rounded-lg bg-white">
        <h2 className="text-gray-900 font-semibold text-lg mb-3">Favicon</h2>
        <p className="text-md text-gray-400 mb-3">
          Favicon should be a square and at least 48x48 pixels
        </p>

        <div className="flex items-center justify-start gap-5">
          <div className="relative w-20 h-20 group">
            {faviconImage ? (
              <Image
                src={faviconImage}
                alt="Uploaded Favicon"
                fill
                className="object-cover rounded-md"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-20 h-20 flex justify-center items-center bg-gray-100 border border-gray-300 rounded-md">
                <MdOutlineImageNotSupported className="text-gray-500" />
              </div>
            )}
          </div>

          <label className="cursor-pointer text-white text-md px-4 py-2 rounded-md bg-gray-400 hover:bg-gray-500">
            Change Image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFaviconImageChange}
            />
          </label>
        </div>
      </div>

      {faviconError && (
        <p className="text-red-500 text-sm mt-2">{faviconError}</p>
      )}

      {/* update button */}
      <UpdateButton selectedTheme={"true"} />

    </section >
  );
}
