import { useTranslations } from "next-intl";
import Image from "next/image";

function ResultNotFound() {
  const d = useTranslations("UniversityDetails");

  return (
    <div className="w-full max-w-5xl mx-auto px-5 sm:px-8 py-10 flex flex-col items-center">
      <Image
        src="/images/searchNotFound.webp"
        alt="Page Not Found"
        width={1000}
        height={300}
        className="w-full h-auto max-h-[300px] sm:max-h-[360px] md:max-h-[420px] object-contain"
        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 800px"
        priority={false}
      />

      <h1 className="mt-6 text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
        {d("searchNotFound")}
      </h1>
    </div>
  );
}

export default ResultNotFound;
