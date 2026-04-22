import { keyable } from "./keyable.interface";

export const SEARCH_URL = 'https://collectionapi.metmuseum.org/public/collection/v1/search';
export const OBJECT_URL = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/';

export const CATEGORY_FIELD: keyable = {
  'Artwork': 'title',
  'Artist': 'artistOrCulture',
};

export const DEFAULT_ARTIST_NAME = 'Unknown artist';
export const DEFAULT_ARTWORK_NAME = 'Unknown title';

export const RESULTS_PER_PAGE = 10;
export const RESULTS_LIMIT = 30;
