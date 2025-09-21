import { useState, useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import SpaceCard from '../components/SpaceCard'
import spaces from '../data/spaces.json'
import type { Space } from '../types'

export default function Home() {
  const [filteredSpaces, setFilteredSpaces] = useState<Space[]>(spaces)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredSpaces(spaces)
    } else {
      const lowerQuery = searchQuery.toLowerCase()
      const filtered = spaces.filter(
        (space) =>
          space.name.toLowerCase().includes(lowerQuery) ||
          space.location.toLowerCase().includes(lowerQuery)
      )
      setFilteredSpaces(filtered)
    }
  }, [searchQuery])

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Discover Study Spaces</h2>
      <SearchBar onSearch={setSearchQuery} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSpaces.map((space) => (
          <SpaceCard key={space.id} space={space} />
        ))}
      </div>
    </div>
  )
}