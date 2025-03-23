import { YoutubeIcon } from "lucide-react";

interface RecipeInstructionsProps {
  instructions: string[];
  videoUrl?: string;
  title?: string;
}

export function RecipeInstructions({
  instructions,
  videoUrl,
  title,
}: RecipeInstructionsProps) {
  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
          Instructions
        </h2>
        <ol className="space-y-8">
          {instructions.map((instruction, index) => (
            <li key={index} className="flex">
              <span className="flex-shrink-0 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 h-8 w-8 rounded-full flex items-center justify-center font-semibold mr-4 mt-0.5">
                {index + 1}
              </span>
              <div>
                <p className="text-gray-700 dark:text-gray-300">
                  {instruction}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Video Tutorial */}
      {videoUrl && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mt-8">
          <div className="flex items-center mb-4">
            <YoutubeIcon className="h-5 w-5 text-red-600 mr-2" />
            <h2 className="text-xl font-semibold">Video Tutorial</h2>
          </div>
          <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={videoUrl}
              title={`How to make ${title || ""}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
}
