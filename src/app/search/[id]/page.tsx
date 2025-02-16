import HomePage from "@/components/HomePage";
import SearchMovie from "@/components/SearchFilm";

export default async function SearchFilm({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const search = (await params).id;

  return (
    <HomePage className="pt-[80px]">
      <SearchMovie search={search} />
    </HomePage>
  );
}
