import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface CategoryItemType {
  id: number;
  title: string;
  subTitle: string;
  image: string;
}
interface ActorType {
  [actor: string]: string;
}
export interface CategoryType {
  cate_id: number;
  id: number;
  name: string;
}
export interface EpisodeType {
  ep_no: number;
  id: string;
  movie_id: string;
  progress: string | null;
  video_id: string;
  video_url: string;
}
export interface MovieType {
  id: string;
  actor: string;
  actor_images: ActorType[];
  author: string | null;
  cate_id: number;
  categories: CategoryType[];
  episodes: EpisodeType[];
  genre: string | null;
  image: string;
  number_ep: string;
  video_episode: number;
  des: string;
  title: string;
  createdDate: string;
}

export interface FooterCategory extends CategoryType {
  image: StaticImport;
  link?: string;
  title: string;
}

export interface FetchCategoriesResponse {
  data: CategoryType[];
  success: boolean;
}

export interface FetchCategoryDetailResponse {
  data: {
    id: number;
    name: string;
  };
  success: boolean;
}

export interface FetchMoviesResponse {
  data: {
    movies: MovieType[];
    limit: number;
    page: number;
    total: number;
  };
  success: boolean;
}

export interface FetchMovieDetailResponse {
  data: {
    id: string;
    des: string;
    actor: string | null;
    image: string;
    actor_images: string | null;
    episodes: EpisodeType[];
    cate_id: number;
  };
  success: boolean;
}
