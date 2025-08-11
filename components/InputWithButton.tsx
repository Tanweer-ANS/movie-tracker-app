import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function InputWithButton() {
  return (
    <div className="flex flex-col sm:flex-row w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl items-center gap-2 sm:gap-3 lg:gap-4">
      <Input 
        type="text" 
        placeholder="Enter your genre" 
        className="w-full bg-white text-black text-sm sm:text-base md:text-lg p-3 sm:p-4 lg:p-5 rounded-lg border-2 border-gray-300 focus:border-red-500 transition-colors duration-200" 
      />
      <Button 
        type="submit" 
        variant="outline" 
        className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white border-red-500 hover:border-red-600 text-sm sm:text-base md:text-lg lg:text-xl px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 rounded-lg font-semibold transition-all duration-200 whitespace-nowrap"
      >
        Search Movie
      </Button>
    </div>
  )
}