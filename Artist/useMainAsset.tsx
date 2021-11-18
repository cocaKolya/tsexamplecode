import { Asset, Entry } from 'contentful'
import { IArtistFields } from 'framework/contentful/types'

export const useMainAsset = (
  artist: Entry<IArtistFields>
): Asset | undefined => {
  const { avatar, artworks } = artist.fields

  if (Array.isArray(artworks) && artworks.length > 0) {
    return artworks[0]
  }
  return avatar
}
