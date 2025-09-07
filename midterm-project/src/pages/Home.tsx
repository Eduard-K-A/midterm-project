import { useState, useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import SpaceCard from '../components/SpaceCard'
import spaces from '../data/spaces.json'
import { Space } from '../types'

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
      <h2>Discover Study Spaces</h2>
      <SearchBar onSearch={setSearchQuery} />
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {filteredSpaces.map((space) => (
          <SpaceCard key={space.id} space={space} />
        ))}
      </div>
    </div>
  )
}