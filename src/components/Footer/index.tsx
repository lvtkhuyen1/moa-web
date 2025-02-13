import Image from "next/image";
import React from "react";
import Logo from "@/assets/logo/logo.png";

export default function Footer() {
  return (
    <div className="p-4 text-xs bg-black border border-[#505050] border-t-1 border-b-0 border-x-0 mt-4">
      <Image src={Logo} alt="Logo" height={20} />
      <div className="gap-4 grid my-2">
        <span>MOA TV 다시보기 서비스 입니다</span>
        <span>
          MOA TV 링크 제공 사이트입니다. 이 웹 사이트에는 음악, 비디오,
          멀티미디어 파일을 저장하지 않습니다. 또한 이 사이트에서 제공되는
          콘텐츠는 링크된 콘텐츠 이므로 저작권, 적법성, 정확성, 규정 준수 또는
          기타 측면에 대해 TV888 책임이 없습니다. 저작권 등 법적 문제가 있는
          경우 적절한 미디어 파일 소유자 또는 호스팅 업체에 문의하십시오.
          연락처: @telegram
        </span>
        <span> Copyright © 티비몬 All rights reserved.</span>
      </div>
    </div>
  );
}
