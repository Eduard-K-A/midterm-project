import { useState } from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }


  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 flex justify-center"
      role="search"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name or location..."
        className="w-full max-w-md p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Search study spaces"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white p-2 rounded-r-md hover:bg-blue-700 transition duration-200"
      >
        Search
      </button>
    </form>
  )
}