import { Plus } from "lucide-react";
import UpdateButton from "../../../Components/UpdateButton/UpdateButton";

export default function banners() {
  return (
    <>
      <section className="w-[75%] h-[500px] flex flex-col justify-start items-start overflow-y-auto">
        <div className="bg-white rounded-lg w-full p-6 ">
          {/*tiles and desc*/}
          <div className="pb-2">
            <h1 className="text-xl font-bold text-gray-900 mb-2">
              Promotional banners
            </h1>
            <p className="text-gray-600">
              Grab your store visitors attention by promotional banners
              displayed your top of homepage
            </p>
          </div>

          {/* buttons */}
          <div className="flex items-center gap-3 mt-5">
            <button className="border border-black px-4 py-2 rounded-sm">
              Active
            </button>
            <button className="bg-gray-400 px-4 py-2 hover:bg-gray-500 text-white rounded-sm">
              Previously used
            </button>
          </div>

          {/* for mobile banner */}
          <div className="pt-5">
            <h1 className="text-lg font-semibold">For Mobile (0/6)</h1>
            <div className="w-72 h-64 border flex flex-col justify-center items-center gap-1">
              <Plus className="text-lg text-gray-400" />
              <p className="text-gray-400">Add to mobile banner</p>
            </div>
          </div>

          {/* for desktop banner */}
          <div className="pt-5">
            <h1 className="text-lg font-semibold">For Desktop (0/6)</h1>
            <div className="w-72 h-64 border flex flex-col justify-center items-center gap-1">
              <Plus className="text-lg text-gray-400" />
              <p className="text-gray-400">Add to desktop banner</p>
            </div>
          </div>
        </div>
        <UpdateButton selectedTheme={"true"} />
      </section>
    </>
  );
}
