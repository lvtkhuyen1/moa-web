import HomePage from "@/components/HomePage";
import ListFilmCategory from "@/components/ListFilmCategory";

export default async function Category({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const category = (await params).category;
  return (
    <HomePage>
      <ListFilmCategory category={category} />
    </HomePage>
  );
}
