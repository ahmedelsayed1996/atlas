import { useTranslations } from "next-intl";
import { FillStar } from "../icons/Star";

type FeedbackCardProps = {
    nameKey: string;
    textKey: string;
    avatarLetter: string;
    avatarBg: string;
};

function FeedbackCard({
    nameKey,
    textKey,
    avatarLetter,
    avatarBg,
}: FeedbackCardProps) {
    const f = useTranslations("StudentsFeedback");

    return (
        <div className="flex flex-col flex-1 gap-8 p-5 bg-white rounded-3xl border border-solid border-gray max-sm:w-full">
            <div className="flex gap-5 items-start">
                <div
                    className="h-[82px] w-[82px] flex justify-center items-center text-5xl text-white rounded-lg"
                    style={{ backgroundColor: avatarBg }}
                >
                    <span>{avatarLetter}</span>
                </div>

                <div className="flex flex-col gap-2.5">
                    <div className="text-xl font-bold text-slate-900 line-clamp-1">
                        {f(nameKey)}
                    </div>
                    <div className="flex gap-0.5">
                        <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, index: number) => <FillStar key={index} />)}

                        </div>
                    </div>

                </div>
            </div>

            <div className="text-lg tracking-wide text-zinc-900 line-clamp-5">
                {f(textKey)}
            </div>
        </div>
    );
}
export default FeedbackCard;