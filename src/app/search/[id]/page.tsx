import HomePage from "@/components/HomePage";
import SearchMovie from "@/components/Movies/SearchMovie";

export default async function SearchFilm({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const search = (await params).id;

  return (
    <HomePage>
      <SearchMovie search={search} />
    </HomePage>
  );
}
