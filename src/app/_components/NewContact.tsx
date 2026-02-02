import { useTranslations } from 'next-intl';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import useCurrentLang from '../_hooks/useCurrentLang';
import { LeftArrow, RightArrow } from './icons/Arrow';

function NewContact() {
    const c = useTranslations("CommonQuestion");
    const language = useCurrentLang();

    return (
        < section className="flex py-16 lg:px-16 xl:px-28" aria-labelledby="contact-heading">
            <article className="flex overflow-hidden relative flex-col justify-center  w-full rounded-3xl md:min-h-[332px] max-md:p-5 md:p-10 max-md:max-w-full">
                <Image src="/images/contactBanner.webp" width={800} height={500} alt="" aria-hidden="true"
                    className="object-cover absolute inset-0 size-full" />
                <div className="flex xl:gap-3 relative justify-between items-center flex-col lg:flex-row w-full">
                    <div className="flex flex-col my-auto font-bold ">
                        <div className="text-xl text-white ">
                            {c("ConnectWithUs")}
                        </div>
                        <div className="mt-6 text-xl md:text-3xl text-white lg:leading-[51px] ">
                            {c("Paragraph")}
                        </div>
                    </div>
                    <Link
                        href={`/${language}/contact`}
                        className="flex gap-1 w-1/2 xl:w-[626px] xl:h-[68px] justify-center items-center text-base font-medium tracking-wide text-white  bg-primary py-2 md:py-4 mt-5 lg:mt-0 rounded-[64px]"
                    >
                        <div className="self-stretch my-auto"> {c("UnderButton")}</div>
                        {language === "en" ?
                            <RightArrow />
                            :
                            <LeftArrow />}
                    </Link>
                </div>
            </article>
        </section >
    )
}

export default NewContact
