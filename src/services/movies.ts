"use server";
import { fetchData } from "@/helper/fetch";

export const getMovies = async (group: number[]) => {
  try {
    const res = await fetchData(
      `/movies/categories?limit=10&categoryGroup=${group.join(",")}`
    );
    console.log("Response from fetchData:", res);
    return res.data;
  } catch (error) {
    console.error("Error in getMovies:", error);
    throw error;
  }
};
