import { FilterIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SearchFilterBarProps {
  placeholder?: string
  filterLabel?: string
  filterOptions?: { value: string; label: string }[]
  sortLabel?: string
  sortOptions?: { value: string; label: string }[]
}

export function SearchFilterBar({
  placeholder = "Search...",
  filterLabel = "Filter",
  filterOptions = [],
  sortLabel = "Sort",
  sortOptions = [],
}: SearchFilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 py-4">
      <div className="relative flex-1">
        <Input type="search" placeholder={placeholder} className="pl-4 pr-4 py-2 h-10 w-full" />
      </div>
      <div className="flex gap-2">
        <div className="w-40">
          <Button variant="outline" className="w-full flex items-center justify-between gap-2">
            <FilterIcon className="h-4 w-4" />
            <span>{filterLabel}</span>
            <span className="sr-only">Toggle filter menu</span>
          </Button>
        </div>
        <div className="w-40">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder={sortLabel} />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
