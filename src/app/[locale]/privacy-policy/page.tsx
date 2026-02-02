"use client"
import BannerSection from "@/app/_components/BannerSection";
import HeadTittle from "@/app/_components/HeadTittle";
import { useTranslations } from "next-intl";
import { useEffect } from "react";



function PrivacyPolicy() {
  const t = useTranslations("privacyPolicy");

  useEffect(() => {
    document.title = "PrivacyPolicy"
  }, [])


  return (
    <>
      <section className="bg-secondColor">
        <BannerSection
          head={t("head")}
          breadcrumb={t("breadcrumb2")}
          urlImage="/images/BannerInstitute.png"
        />

        <HeadTittle
          head={t("head")}
          headLine={t("section1")}
          summary={t("section2")}
        />
        <section className="mx-3">
          <div className="max-w-[1300px] mx-auto py-7 grid grid-cols-1 md:grid-cols-2  gap-5 ">
            <div className="container bg-white rounded-3xl shadow-2xl p-8 text-zinc-500 text-lg font-medium tracking-normal leading-7">
              <hgroup>
                <h2 className="text-2xl text-black py-2 font-semibold">{t("section3")}</h2>
                <p className="text-zinc-500">{t("section4")}</p>
                <ul className='list-disc ps-8'>
                  <li className='py-2'><span className=" text-base text-zinc-500">
                    <strong>{t("section5")} </strong>
                    {t("section6")}</span>
                  </li>
                  <li className='py-2'><span className=" text-base text-zinc-500">
                    <strong>{t("section7")} </strong>
                    {t("section8")}</span>
                  </li>
                  <li className='py-2'><span className=" text-base text-zinc-500">
                    <strong>{t("section9")} </strong>
                    {t("section10")}</span>
                  </li>
                  <li className='py-2'><span className=" text-base text-zinc-500">
                    <strong>{t("section11")} </strong>
                    {t("section12")}</span>
                  </li>
                  <li className='py-2'><span className=" text-base text-zinc-500">
                    <strong>{t("section13")} </strong>
                    {t("section14")}</span>
                  </li>
                </ul>
              </hgroup>
            </div>
            <div className="container bg-white rounded-3xl shadow-2xl p-8 text-zinc-500 text-lg font-medium tracking-normal leading-7">
              <hgroup>
                <h2 className="text-2xl text-black py-2 font-semibold">{t("section15")}</h2>
                <p className="text-zinc-500">{t("section16")}</p>
                <ul className='list-disc ps-8'>
                  <li className='py-2'><span className=" text-base text-zinc-500">
                    <strong>{t("section17")} </strong>
                    {t("section18")}</span>
                  </li>
                  <li className='py-2'><span className=" text-base text-zinc-500">
                    <strong>{t("section19")} </strong>
                    {t("section20")}</span>
                  </li>
                  <li className='py-2'><span className=" text-base text-zinc-500">
                    <strong>{t("section21")} </strong>
                    {t("section22")}</span>
                  </li>
                  <li className='py-2'><span className=" text-base text-zinc-500">
                    <strong>{t("section23")} </strong>
                    {t("section24")}</span>
                  </li>
                  <li className='py-2'><span className=" text-base text-zinc-500">
                    <strong>{t("section25")} </strong>
                    {t("section26")}</span>
                  </li>
                </ul>
              </hgroup>
            </div>
            <div className="container bg-white rounded-3xl shadow-2xl p-8 text-zinc-500 text-lg font-medium tracking-normal leading-7">
              <hgroup>
                <h2 className="text-2xl text-black py-2 font-semibold">{t("section27")}</h2>
                <p className="text-zinc-500">{t("section28")}</p>
                <ul className='list-disc ps-8'>
                  <li className='py-2'><span className=" text-base text-zinc-500">
                    <strong>{t("section29")} </strong>
                    {t("section30")}</span>
                  </li>
                  <li className='py-2'><span className=" text-base text-zinc-500">
                    <strong>{t("section31")} </strong>
                    {t("section32")}</span>
                  </li>
                  <li className='py-2'><span className=" text-base text-zinc-500">
                    <strong>{t("section33")} </strong>
                    {t("section34")}</span>
                  </li>
                  <li className='py-2'><span className=" text-base text-zinc-500">
                    <strong>{t("section35")} </strong>
                    {t("section36")}</span>
                  </li>
                </ul>
              </hgroup>
            </div>
            <div className="container bg-white rounded-3xl shadow-2xl p-8 text-zinc-500 text-lg font-medium tracking-normal leading-7">
              <hgroup>
                <h2 className="text-2xl text-black py-2 font-semibold">{t("section37")}</h2>
                <p className="text-zinc-500">{t("section38")}</p>
              </hgroup>
              <hgroup>
                <h2 className="text-2xl text-black py-2 font-semibold">{t("section39")}</h2>
                <p className="text-zinc-500">{t("section40")}</p>
              </hgroup>
              <ul className='list-disc ps-8'>
                <li className='py-2'><span className=" text-base text-zinc-500">
                  <strong>{t("section41")} </strong>
                  {t("section42")}</span>
                </li>
                <li className='py-2'><span className=" text-base text-zinc-500">
                  <strong>{t("section43")} </strong>
                  {t("section44")}</span>
                </li>
                <li className='py-2'><span className=" text-base text-zinc-500">
                  <strong>{t("section45")} </strong>
                  {t("section46")}</span>
                </li>
                <li className='py-2'><span className=" text-base text-zinc-500">
                  <strong>{t("section47")} </strong>
                  {t("section48")}</span>
                </li>
                <li className='py-2'><span className=" text-base text-zinc-500">
                  <strong>{t("section49")} </strong>
                  {t("section50")}</span>
                </li>
              </ul>
            </div>
            <div className="container bg-white rounded-3xl shadow-2xl p-8 text-zinc-500 text-lg font-medium tracking-normal leading-7 md:col-span-2">
              <hgroup>
                <h2 className="text-2xl text-black py-2 font-semibold">{t("section51")}</h2>
                <p className="text-zinc-500">{t("section52")}</p>
                <p className="text-zinc-500">{t("section53")}</p>
              </hgroup>
            </div>
          </div>
        </section>
      </section>
    </>
  )
}

export default PrivacyPolicy

