import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectItem } from '@nextui-org/react'
import React from 'react'

const Addmusic = () => {
  return (
    <div>
        <form  className="space-y-6">
      <div className="flex items-center space-x-4">
        <Label htmlFor="name" className="w-24">Name</Label>
        <Input
          id="name"
          name="name"
          // value={formData.name}
          // onChange={handleInputChange}
          placeholder="Enter your name"
          className="p-2 border rounded-md shadow-sm w-full"
        />
      </div>

      {/* Genre Field (Multi-Select) */}
      <div className="flex items-center space-x-4">
        <Label className="w-24">Genre</Label>
        <Select
          multiple
          // value={formData.genre}
          // onChange={(selectedGenres) => handleMultiSelectChange('genre', selectedGenres)}
          className="p-2 border rounded-md shadow-sm w-full"
        >
          {[].map((genre) => (
            <SelectItem key={genre} value={genre}>
              {genre}
            </SelectItem>
          ))}
        </Select>
      </div>

      {/* Audio File Upload */}
      <div className="flex items-center space-x-4">
        <Label className="w-24">Audio File</Label>
        <Input
          type="file"
          id="audioFile"
          name="audioFile"
          // onChange={handleFileChange}
          accept="audio/*"
          className="p-2 border rounded-md shadow-sm w-full"
        />
      </div>

      {/* Image URL */}
      <div className="flex items-center space-x-4">
        <Label htmlFor="imageUrl" className="w-24">Image URL</Label>
        <Input
          id="imageUrl"
          name="imageUrl"
          // value={formData.imageUrl}
          // onChange={handleInputChange}
          placeholder="Enter image URL"
          className="p-2 border rounded-md shadow-sm w-full"
        />
      </div>

      {/* Artist Multi-Select */}
      <div className="flex items-center space-x-4">
        <Label className="w-24">Artists</Label>
        <Select
          multiple
          // value={formData.artists}
          // onChange={(selectedArtists) => handleMultiSelectChange('artists', selectedArtists)}
          className="p-2 border rounded-md shadow-sm w-full"
        >
          {[].map((artist) => (
            <SelectItem key={artist} value={artist}>
              {artist}
            </SelectItem>
          ))}
        </Select>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <Button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700">
          Submit
        </Button>
      </div>
    </form>
    </div>
  )
}

export default Addmusic