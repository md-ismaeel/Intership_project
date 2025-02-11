
export default function UpdateButton({ selectedTheme }: { selectedTheme: string | null }) {
    return (
        <div className="w-full flex justify-end items-center">
            <button
                className={`px-4 py-2 rounded-md text-white transition-colors duration-300 ${selectedTheme ? "bg-blue-600 hover:bg-blue-700 active:bg-blue-800" : "bg-gray-400 cursor-not-allowed"}`}
                disabled={!selectedTheme}
            >
                Update
            </button>
        </div>
    );
}
