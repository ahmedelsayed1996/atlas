function DistinguishCard({
    title,
    description,
    bgColor,
    icon,
    isRTL,
}: {
    title: string;
    description: string;
    bgColor: string;
    icon: React.ReactNode;
    isRTL: boolean;
}) {
    return (
        <div className="relative flex bg-white rounded-2xl border border-solid border-zinc-100 overflow-hidden">
            <div
                className={`absolute flex ${isRTL ? "left-[-70px]" : "left-[17px]"
                    } h-[163px] top-[-26px] w-[163px]`}
            >
                <div className="h-40 -rotate-45 bg-slate-100 rounded-[35px] w-[70px]" />
                <div
                    className={`flex absolute justify-center items-center p-3.5 shadow-lg h-[58px] rounded-[29px] top-[84px] w-[58px]`}
                    style={{
                        backgroundColor: bgColor,
                        left: isRTL ? "132px" : "39px",
                    }}
                >
                    {icon}
                </div>
            </div>

            <div className="flex flex-col gap-1 p-5 pt-40">
                <div className="text-xl font-bold text-zinc-900">{title}</div>
                <div className="text-base font-medium tracking-wide leading-6 text-zinc-800">
                    {description}
                </div>
            </div>
        </div>
    );
}
export default DistinguishCard;