export type GaleriSortBy = "latest" | "oldest" | "title_asc" | "title_desc";

export interface GaleriItem {
  id: string;
  title: string;
  link: string;
  imageUrl: string;
  takenAt: string;
}

export interface GaleriPagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface GaleriListResponse {
  items: GaleriItem[];
  pagination: GaleriPagination;
}

export interface GaleriDetailResponse {
  item: GaleriItem;
}

export interface GaleriListParams {
  page: number;
  limit: number;
  sortBy?: GaleriSortBy;
}

export interface UpsertGaleriPayload {
  title: string;
  link: string;
  takenAt: string;
  imageUrl?: string;
}
