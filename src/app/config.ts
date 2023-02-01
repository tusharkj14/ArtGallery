import { keyable } from "./keyable.interface";

export const INFO_URL = 'https://api.artic.edu/api/v1/artworks/search?params=';
export const IMAGE_URL = 'https://www.artic.edu/iiif/2/';
export const IMAGE_API = ' https://api.artic.edu/api/v1/artworks/';
export const LARGE_IMAGE_PART_URL = '/full/843,/0/default.jpg';
export const SMALL_IMAGE_PART_URL = '/full/200,/0/default.jpg';
export const ARTWORK_FIELDS = `
  id,
  title,
  date_display,
  artist_display,
  artist_title,
  place_of_origin,
  dimensions,
  medium_display,
  inscriptions,
  is_public_domain,
  style_title,
  classification_title,
  image_id,
  config
`;

export const CATEGORY_FIELD : keyable = {
  'Artwork': 'title',
  'Artist': 'artist_title',
};

export const DEFAULT_ARTIST_NAME = 'Unknown artist';
export const DEFAULT_ARTWORK_NAME = 'Unknown title';

export const RESULTS_PER_PAGE = 10;
export const RESULTS_LIMIT = 50;

export const REQUEST_HEADER_IDENTIFY_FIELD = 'AIC-User-Agent';
export const REQUEST_HEADER_PROJECT_INFO = 'ArtGallery (karanwalia2001@gmail.com)';
