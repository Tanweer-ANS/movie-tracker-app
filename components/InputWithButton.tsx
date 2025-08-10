import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function InputWithButton() {
  return (
    <div className="flex w-full max-w-sm items-center gap-2">
      <Input type="value" placeholder="Enter your genra" className="bg-white text-black p-4 rounded-lg " />
      <Button type="submit" variant="outline" className="bg-red-500 text-xl text-white">
        Search movie
      </Button>
    </div>
  )
}
