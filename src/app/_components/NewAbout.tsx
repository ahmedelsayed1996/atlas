import React from 'react'
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from 'next-intl';
import useCurrentLang from '../_hooks/useCurrentLang';
import { LeftArrow, RightArrow } from './icons/Arrow';



function NewAbout() {

    const n = useTranslations("newHome");
    const language = useCurrentLang();

    return (
        <div className="overflow-hidden py-10 px-5 md:px-12 lg:px-20 xl:py-10 xl:px-28">
            <div className="flex gap-5 flex-col lg:flex-row">
                <div className="flex flex-col w-full lg:w-[69%] relative">
                    {/* <Image src="/images/home.webp" alt="About Eduxa" width={1400} height={600} /> */}
                    <Image src="https://api.eduxa.com/upload/home.webp" alt="About Eduxa" width={1400} height={600} />
                </div>
                <div className="flex flex-col w-full lg:w-[31%]">
                    <div className="flex flex-col self-stretch my-auto w-full max-md:mt-10">
                        <div className="flex flex-col w-full">
                            <div className="overflow-hidden px-3.5 w-full text-xl border-amber-500 border-s-[5px] text-zinc-900 max-md:pr-5">
                                {n("AboutEduxa")}
                            </div>
                            <div className="flex flex-col mt-2 w-full">
                                <div className="text-3xl font-bold text-zinc-900">
                                    {n("AboutEduxah1")}
                                </div>
                                <div className="flex flex-col mt-4 w-full text-base font-medium tracking-normal leading-7 text-zinc-500">
                                    <div>{n("AboutEduxap1")}</div>
                                    <div className="mt-6">{n("AboutEduxap2")}</div>
                                </div>
                            </div>
                        </div>
                        <Link
                            href={`/${language}/about`}
                            className="flex overflow-hidden gap-1 justify-center items-center px-4 mt-9 max-w-full text-base font-medium tracking-wide text-white border border-solid bg-primary border-primary py-2 rounded-[64px] w-[230px]"
                        >
                            <span>{n("UncoverOurJourney")}</span>
                            {language === "en" ? <RightArrow /> : <LeftArrow />}
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewAbout
