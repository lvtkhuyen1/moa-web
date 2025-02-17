import DetailMovie from "@/components/DetailMovie";
import HomePage from "@/components/HomePage";

export default async function Movie({
  params,
}: {
  params: Promise<{ movie: string }>;
}) {
  const movie = (await params).movie;
  return (
    <HomePage>
      <DetailMovie movie={movie} />
    </HomePage>
  );
}
