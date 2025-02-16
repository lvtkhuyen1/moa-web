import DetailMovie from "@/components/DetailFilm";
import HomePage from "@/components/HomePage";

export default async function Movie({
  params,
}: {
  params: Promise<{ movie: string }>;
}) {
  const movie = (await params).movie;
  return (
    <HomePage className="pt-[80px]">
      <DetailMovie movie={movie} />
    </HomePage>
  );
}
