import Image from "next/image";
import React, { useEffect, useState } from "react";
import Logo from "@/assets/logo/logo.png";
import { FooterCategory } from "@/types";
import { useRouter } from "next/navigation";
import { getCategoryMovies } from "@/services/movies";
import home from "@/assets/icons/home.png";
import drama from "@/assets/icons/drama.png";
import show from "@/assets/icons/show.png";
import movie from "@/assets/icons/movie.png";
import more from "@/assets/icons/more.png";
import Menu from "../Menu";

const Category = ({ category }: { category: FooterCategory }) => {
  const router = useRouter();

  const handleNavigate = () => {
    if (!category.link) return;
    router.push(`${category.link}`);
  };
  return (
    <div
      onClick={handleNavigate}
      className="flex flex-col gap-1 text-xl leading-6 font-normal justify-center items-center relative"
    >
      <div className="relative">
        <Image src={category.image} alt={category.title} />
      </div>
      <span className="text-xs md:text-base">{category.title}</span>
    </div>
  );
};

export default function Footer() {
  const [categories, setCategories] = useState<FooterCategory[]>([]);
  const [showMore, setShowMore] = useState(false);
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const categories = await getCategoryMovies();
        setCategories(categories);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchCategory();
  }, []);
  const selectedCategories = categories
    .filter((category) => [1, 7, 2].includes(category.id))
    .map((category) => {
      switch (category.id) {
        case 1:
          return {
            ...category,
            title: "드라마",
            image: drama,
            link: `/${category.name.replace("/", "-")}-${category.id}`,
          };
        case 7:
          return {
            ...category,
            title: "예능",
            image: show,
            link: `/${category.name.replace("/", "-")}-${category.id}`,
          };
        case 2:
          return {
            ...category,
            title: "영화",
            image: movie,
            link: `/${category.name.replace("/", "-")}-${category.id}`,
          };
        default:
          return category;
      }
    });
  selectedCategories.unshift({
    title: "홈",
    image: home,
    link: "/",
    id: 0,
    name: "home",
    cate_id: 0,
  });

  const handleShowMore = () => {
    setShowMore(!showMore);
  };
  return (
    <>
      <div className="p-0 md:p-6 border-t border-[#505050] space-y-3 font-medium text-xs md:text-sm mb-16 md:mb-0 mt-8 md:mt-6 pt-2">
        <Image src={Logo} alt="Logo" />
        <div className="gap-4 grid my-2">
          <span>MOA TV 다시보기 서비스 입니다</span>
          <span>
            MOA TV 링크 제공 사이트입니다. 이 웹 사이트에는 음악, 비디오,
            멀티미디어 파일을 저장하지 않습니다. 또한 이 사이트에서 제공되는
            콘텐츠는 링크된 콘텐츠 이므로 <br />
            저작권, 적법성, 정확성, 규정 준수 또는 기타 측면에 대해 TV888 책임이
            없습니다. 저작권 등 법적 문제가 있는 경우 적절한 미디어 파일 소유자
            또는 호스팅 업체에 문의하십시오.
            <br />
            연락처: @telegram
          </span>
          <span> Copyright © 티비몬 All rights reserved.</span>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 flex items-center  md:hidden gap-8 sm:gap-14 bg-black justify-between py-3 px-4 z-50">
        {selectedCategories.map((category, index) => (
          <Category key={index} category={category} />
        ))}
        <div
          onClick={handleShowMore}
          className="flex flex-col gap-1 text-xl leading-6 font-normal justify-center items-center relative cursor-pointer"
        >
          <div className="relative">
            <Image src={more} alt="show more" />
          </div>
          <span className="text-xs md:text-base">기타</span>
        </div>
        {showMore && (
          <Menu
            setShowMore={setShowMore}
            listCategory={categories.filter(
              (category) => ![1, 7, 2].includes(category.id)
            )}
          />
        )}
      </div>
    </>
  );
}
