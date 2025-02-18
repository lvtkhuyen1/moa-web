import HomePage from "@/components/HomePage";
import ListCategory from "@/components/ListCategory";

export default async function Category({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const category = (await params).category;
  return (
    <HomePage>
      <ListCategory category={category} />
    </HomePage>
  );
}
