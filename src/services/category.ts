import { fetchData } from "@/helper/fetch";
import { FetchCategoriesResponse, FetchCategoryDetailResponse } from "@/types";

export const handleFetchCategories =
  async (): Promise<FetchCategoriesResponse> => {
    try {
      const res = await fetchData(`/categories/`);
      return res.data;
    } catch (error) {
      throw error;
    }
  };

export const handleCategoriesByID = async (
  id: number
): Promise<FetchCategoryDetailResponse> => {
  try {
    const res = await fetchData(`/categories/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
