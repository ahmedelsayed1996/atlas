import { useTranslations } from 'next-intl';
import Counter from './Counter';
import FeedbackCard from './ui/FeedbackCard';

const FEEDBACKS = [
  { nameKey: "H1", textKey: "P1", avatarLetter: "F", avatarBg: "#64748b" },
  { nameKey: "H2", textKey: "P2", avatarLetter: "B", avatarBg: "#065f46" },
  { nameKey: "H3", textKey: "P3", avatarLetter: "H", avatarBg: "#075985" },
];

const STATS = [
  { end: 10, suffix: "K", label: "Students" },
  { end: 900, label: "Universities" },
  { end: 1500, label: "LanguageSchools" },
  { end: 100, suffix: "K", label: "Programs" },
];


function StudentsFeedback() {
  const f = useTranslations("StudentsFeedback");
  return (
    <section className="flex flex-col gap-8 items-center px-5 md:px-10 lg:px-24 xl:px-28 py-20 w-full bg-white ">
      <div className="flex flex-col gap-4 items-center w-full ">
        <div className="py-0 pr-1 ps-3.5 text-xl font-bold border-solid border-s-[5px] border-s-amber-500 text-zinc-900">
          {f("head")}
        </div>
        <div className="w-full text-3xl font-bold text-center text-zinc-900 max-sm:text-2xl">
          {f("title")}
        </div>
      </div>

      <div className="flex gap-4 lg:gap-8 justify-center flex-col lg:flex-row">
        {FEEDBACKS.map((item, i) => (
          <FeedbackCard key={i} {...item} />
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-10 place-items-center px-3 py-8 md:px-10 md:py-16 rounded-3xl border border-solid bg-neutral-50 border-zinc-100 w-full">
        {STATS.map((stat, i) => (
          <div key={i} className="flex flex-col gap-1 items-center">
            <div className="flex items-center text-4xl lg:text-6xl font-bold text-zinc-900">
              <Counter end={stat.end} suffix={stat.suffix} />
              <span>+</span>
            </div>
            <div className="text-base tracking-wide text-center text-zinc-800">
              {f(stat.label)}
            </div>
          </div>
        ))}
      </div>

    </section >
  )
}

export default StudentsFeedback
