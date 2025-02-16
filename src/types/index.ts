export interface IFilmCategory {
  id: number;
  title: string;
  subTitle: string;
  image: string;
}
interface IActor {
  [actor: string]: string;
}
export interface ICategory {
  cate_id: number;
  id: string;
  name: string;
}
export interface IEpisodes {
  ep_no: number;
  id: string;
  movie_id: string;
  progress: string | null;
  video_id: string;
  video_url: string;
}
export interface IMovies {
  id: string;
  actor: string;
  actor_images: IActor[];
  author: string | null;
  cate_id: number;
  categories: ICategory[];
  episodes: IEpisodes[];
  genre: string | null;
  image: string;
  number_ep: string;
  video_episode: number;
  des: string;
  title: string;
  createdDate: string;
}
