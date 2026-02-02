import useCurrentLang from '@/app/_hooks/useCurrentLang';
import { selectCountries } from '@/app/reduxTool-kit/selectors/countriesSelectors';
import { selectStates } from '@/app/reduxTool-kit/selectors/stateSelectors';
import { selectCities } from '@/app/reduxTool-kit/selectors/citiesSelectors';
import { selectMajors } from '@/app/reduxTool-kit/selectors/majorsSelectors';
import { getAllCountries } from '@/app/reduxTool-kit/slices/countriesSlice';
import { getAllStates } from '@/app/reduxTool-kit/slices/statesSlice';
import { getAllCities } from '@/app/reduxTool-kit/slices/citiesSlice';
import { getAllMajors } from '@/app/reduxTool-kit/slices/majorSlice';
import { getAllUniversities } from '@/app/reduxTool-kit/slices/universitiesSlice';
import { AppDispatch } from '@/app/store';
import { City, Country, State } from '@/app/types/country';
import { Majors } from '@/app/types/major';
import { useTranslations } from 'next-intl';
import { parseCookies } from 'nookies';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function FilterUniversity() {
    const dispatch = useDispatch<AppDispatch>();
    const u = useTranslations("Universities");
    const n = useTranslations("newHome");
    const countries = useSelector(selectCountries);
    const states = useSelector(selectStates);
    const cities = useSelector(selectCities);
    const majors = useSelector(selectMajors);
    const language = useCurrentLang();
    const { tokenMainSite } = parseCookies();

    const langCountryRef = useRef("");
    const langMajerRef = useRef("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    const [filterValue, setFilterValue] = useState({
        searchValue: "",
        countryValue: "",
        stateValue: "",
        cityValue: "",
        major: "",
        recommended: "",
    });
    const [recommended, setRecommended] = useState<string>("");
    const [rating, setRating] = useState<string>("");

    const [isCountryOpen, setIsCountryOpen] = useState<boolean>(false);
    const [selectedCountry, setSelectedCountry] = useState<Country>();
    const [searchCountry, setSearchCountry] = useState<string>("");

    const [isStateOpen, setIsStateOpen] = useState<boolean>(false);
    const [selectedState, setSelectedState] = useState<State>();
    const [searchState, setSearchState] = useState<string>("");

    const [isCityOpen, setIsCityOpen] = useState<boolean>(false);
    const [selectedCity, setSelectedCity] = useState<City>();
    const [searchCity, setSearchCity] = useState<string>("");

    const [isMajorsOpen, setIsMajorsOpen] = useState<boolean>(false);
    const [selectedMajors, setSelectedMajors] = useState<Majors>();
    const [searchMajor, setSearchMajor] = useState<string>("");

    const [searchValue, setSearchValue] = useState<string>("");

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);

    const filteredCountries = countries?.countries?.filter((country: any) =>
        country.name.toLowerCase().includes(searchCountry.toLowerCase())
    );

    const filteredState = states?.states?.filter((state: any) =>
        state.name.toLowerCase().includes(searchState.toLowerCase())
    );
    const filteredCity = cities?.cities?.filter((city: any) =>
        city.name.toLowerCase().includes(searchCity.toLowerCase())
    );

    const filteredMajors = majors?.majors?.filter((major: any) =>
        major.name.toLowerCase().includes(searchMajor.toLowerCase())
    );


    const scrollToTop = () => {
        const el = document.getElementById("filters");
        if (el) {
            const header = document.getElementById("siteHeader");
            const headerH = header?.offsetHeight ?? 0;
            const vpOffset = window.visualViewport?.offsetTop ?? 0;
            const y = el.getBoundingClientRect().top + window.scrollY - headerH - 90;
            window.scrollTo({ top: y - vpOffset, behavior: "smooth" });
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsCountryOpen(false);
                setIsCityOpen(false)
                setIsMajorsOpen(false)
                setIsStateOpen(false)
                // setIsFieldsOpen(false)
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                if (
                    selectedCountry ||
                    // selectedAcademicDegree ||
                    // selectedLanguage ||
                    selectedMajors ||
                    selectedState ||
                    searchValue ||
                    rating ||
                    recommended
                ) {
                    // handleSubmit(e);
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [
        selectedCountry,
        // selectedAcademicDegree,
        // selectedLanguage,
        selectedMajors,
        selectedState,
        searchValue,
        rating,
        recommended,
    ]);

    return (
        <div>
            <form
                // onSubmit={handleSubmit}
                className="flex flex-col self-stretch my-auto w-full"
            >
                <div
                    ref={dropdownRef}
                    className="flex flex-col pb-4 w-full text-base tracking-wide border-b border-solid border-b-zinc-100">
                    <div className="flex gap-3  w-full  flex-col max-md:gap-4">
                        {/* Filter By  Text */}
                        <div className="flex flex-col gap-2 items-start w-full  xl:flex-1">
                            <div className="text-base font-bold tracking-normal leading-7 text-slate-900 max-sm:text-sm">
                                {n("searchButton")}
                            </div>
                            <div className=" flex flex-col gap-2 w-full">
                                <div className="relative">
                                    {!searchValue ?
                                        <svg
                                            className="absolute top-1/2 -translate-y-1/2 start-4 "
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                opacity="0.3"
                                                d="M17.9172 16.1836L15.2755 13.6836C14.7733 14.3302 14.1713 14.8928 13.4922 15.3503L16.2089 17.9336C16.3231 18.067 16.4643 18.1747 16.6232 18.2495C16.7822 18.3243 16.9551 18.3645 17.1308 18.3675C17.3064 18.3705 17.4806 18.3362 17.642 18.2669C17.8034 18.1976 17.9482 18.0949 18.067 17.9654C18.1857 17.836 18.2757 17.6829 18.3308 17.5161C18.386 17.3494 18.4052 17.1728 18.3871 16.9981C18.369 16.8234 18.314 16.6545 18.2259 16.5026C18.1377 16.3507 18.0183 16.2193 17.8755 16.1169L17.9172 16.1836Z"
                                                fill="#A1A5B7"
                                            />
                                            <path
                                                d="M9.28516 1.66797C7.8018 1.66797 6.35175 2.10784 5.11838 2.93195C3.88501 3.75606 2.92372 4.9274 2.35606 6.29784C1.78841 7.66829 1.63988 9.17629 1.92927 10.6311C2.21866 12.086 2.93296 13.4224 3.98186 14.4713C5.03075 15.5202 6.36712 16.2345 7.82198 16.5239C9.27684 16.8132 10.7848 16.6647 12.1553 16.0971C13.5257 15.5294 14.6971 14.5681 15.5212 13.3347C16.3453 12.1014 16.7852 10.6513 16.7852 9.16797C16.7852 7.17885 15.995 5.27119 14.5885 3.86467C13.1819 2.45814 11.2743 1.66797 9.28516 1.66797ZM9.28516 14.468C8.23892 14.468 7.21616 14.1578 6.34613 13.5767C5.47611 12.9956 4.79786 12.1697 4.3971 11.2033C3.99634 10.2368 3.89106 9.17327 4.09457 8.14701C4.29807 7.12076 4.80123 6.17786 5.54045 5.43747C6.27967 4.69709 7.22177 4.19245 8.24771 3.98733C9.27364 3.78221 10.3374 3.88582 11.3044 4.28505C12.2715 4.68429 13.0985 5.36124 13.681 6.23035C14.2634 7.09946 14.5752 8.12173 14.5768 9.16797C14.579 9.86389 14.4437 10.5534 14.1787 11.1969C13.9136 11.8403 13.524 12.4251 13.0323 12.9176C12.5406 13.4101 11.9565 13.8005 11.3134 14.0666C10.6704 14.3327 9.98108 14.4691 9.28516 14.468V14.468Z"
                                                fill="#A1A5B7"
                                            />
                                        </svg>
                                        :
                                        <svg
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                dispatch(getAllUniversities({
                                                    country: selectedCountry?.id,
                                                    state: selectedState?.id,
                                                    city: selectedCity?.id,
                                                    majors: selectedMajors?.id,
                                                    // fields: selectedFields?.id,
                                                    recommended,
                                                    page: 1,
                                                    limit: limit,
                                                    language
                                                }));
                                                scrollToTop();
                                                setSearchValue("")
                                                setCurrentPage(1)
                                                setLimit(10)
                                            }}
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="size-5 absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer bg-white rounded-md"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6 18 18 6M6 6l12 12"
                                            />
                                        </svg>
                                    }


                                    <input
                                        type="text"
                                        name="schoolName"
                                        id="schoolName"
                                        value={searchValue}
                                        onChange={(e) => setSearchValue(e.target.value)}
                                        placeholder={`Ex: American University`}
                                        // placeholder={`${n("searchButton")}`}
                                        className="w-full py-1 ps-11 placeholder:text-[#A5A5A5] bg-[#FAFAFA] border border-[#EEEEEE] rounded-full focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Filter By Country */}
                        <div className="flex flex-col gap-2 items-start  w-full  relative">
                            <div
                                className="text-base font-bold tracking-normal leading-7 text-slate-900 max-sm:text-sm">
                                {n("searchFilters1")}
                            </div>
                            <div
                                onClick={() => {
                                    const currentCountryLang = langCountryRef.current !== language;
                                    if (!countries?.countries?.length || currentCountryLang) {

                                        dispatch(getAllCountries({ language, entity: "universities" }));
                                        langCountryRef.current = language;
                                    }
                                    setIsStateOpen(false);
                                    setIsCityOpen(false);
                                    setIsCountryOpen(!isCountryOpen)
                                    // setIsAcademicDegreeOpen(false);
                                    setIsStateOpen(false);
                                    setIsCityOpen(false);
                                }}
                                className="flex justify-between items-center py-1 px-6 w-full border border-solid bg-neutral-50 border-zinc-100 rounded-[64px] cursor-pointer max-sm:px-4"
                            >
                                <span className="text-base tracking-wide text-neutral-600 max-sm:text-sm">
                                    {selectedCountry?.name || n("searchFiltersDrd1")}
                                </span>
                                {selectedCountry?.name ? (
                                    <svg
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedCountry(undefined);
                                            setSelectedState(undefined);
                                            setSelectedCity(undefined);
                                            setCurrentPage(1);
                                            dispatch(getAllUniversities({
                                                state: "",
                                                city: "",
                                                majors: selectedMajors?.id,
                                                // fields: selectedFields?.id,
                                                recommended,
                                                page: 1,
                                                limit: limit,
                                                language
                                            }));
                                            scrollToTop();
                                        }}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="size-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18 18 6M6 6l12 12"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className={`transition-transform duration-500 ease-in-out ${isCountryOpen ? "rotate-180" : ""} `}
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M11.69 8.67993H17.92C18.433 8.67993 18.6939 9.30178 18.3349 9.66788C18.3346 9.66825 18.3342 9.66863 18.3338 9.66901L15.1264 12.8764L13.1564 14.8464C12.5217 15.4811 11.4883 15.4811 10.8535 14.8464L5.67355 9.66638C5.3076 9.30043 5.56675 8.67993 6.07999 8.67993H11.69Z"
                                            fill="#666666"
                                            stroke="white"
                                        />
                                    </svg>
                                )}
                            </div>
                            {isCountryOpen && (
                                <div
                                    className="absolute top-[90%] mt-2 w-full bg-white border border-zinc-100 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                                    {/* حقل البحث */}
                                    <div className="px-4 py-2">
                                        <input
                                            type="text"
                                            placeholder={n("searchFiltersDrd8")}
                                            value={searchCountry}
                                            onChange={(e) => setSearchCountry(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    {/* قائمة النتائج بعد الفلترة */}
                                    {!countries.loading ? (
                                        filteredCountries?.length > 0 ? (
                                            filteredCountries.map((country: any) => (
                                                <div
                                                    key={country?.id}
                                                    onClick={() => {
                                                        setSelectedCountry(country);
                                                        setSelectedState({ id: 0, name: "" });
                                                        setSelectedCity({ id: 0, name: "" });
                                                        setIsCountryOpen(false);
                                                        setIsStateOpen(false);
                                                        setIsCityOpen(false);
                                                        // setIsAcademicDegreeOpen(false);
                                                        setIsMajorsOpen(false);
                                                        setSearchCountry("");
                                                        setCurrentPage(1);
                                                        dispatch(getAllUniversities({
                                                            country: country?.id,
                                                            state: selectedState?.id,
                                                            city: selectedCity?.id,
                                                            majors: selectedMajors?.id,
                                                            // fields: selectedFields?.id,
                                                            page: 1,
                                                            limit: limit,
                                                            language,
                                                            recommended
                                                        }));
                                                        dispatch(getAllStates({ language: language, countryId: country?.id }));
                                                        scrollToTop();
                                                    }}
                                                    className="px-6 py-3 hover:bg-gray-100 cursor-pointer"
                                                >
                                                    {country.name}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="px-6 py-3 text-gray-400">
                                                {n("searchFiltersDrd5")}
                                            </div>
                                        )
                                    ) : (
                                        <div className="px-6 py-3 text-gray-400">
                                            {n("searchFiltersDrd6")}...
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Filter By State */}
                        <div className="flex flex-col gap-2 items-start  w-full  relative">
                            <div className="text-base font-bold tracking-normal leading-7 text-slate-900 max-sm:text-sm">
                                {n("searchFiltersDrd2")}
                            </div>
                            <div
                                onClick={() => {
                                    setIsStateOpen(!isStateOpen);
                                    setIsCountryOpen(false);
                                    setIsCityOpen(false);
                                    // setIsAcademicDegreeOpen(false);
                                    setIsMajorsOpen(false);
                                    // setIsLanguageOpen(false);
                                    setIsCountryOpen(false);
                                }}
                                className="flex justify-between items-center py-1 px-6 w-full border border-solid bg-neutral-50 border-zinc-100 rounded-[64px] cursor-pointer max-sm:px-4"
                            >
                                <span className="text-base tracking-wide text-neutral-600 max-sm:text-sm">
                                    {selectedState?.name || n("searchFiltersDrd2+")}
                                </span>
                                {selectedState?.name ? (
                                    <svg
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setCurrentPage(1);
                                            dispatch(getAllUniversities({
                                                country: selectedCountry?.id,
                                                majors: selectedMajors?.id,
                                                // fields: selectedFields?.id,
                                                page: 1,
                                                limit: limit,
                                                language, recommended
                                            }));
                                            scrollToTop();
                                            setSelectedState(undefined)
                                            setIsStateOpen(false);
                                            setIsCityOpen(false);
                                            setSelectedCity(undefined)
                                        }}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="size-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18 18 6M6 6l12 12"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className={`transition-transform duration-500 ease-in-out ${isStateOpen ? "rotate-180" : ""} `}
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M11.69 8.67993H17.92C18.433 8.67993 18.6939 9.30178 18.3349 9.66788C18.3346 9.66825 18.3342 9.66863 18.3338 9.66901L15.1264 12.8764L13.1564 14.8464C12.5217 15.4811 11.4883 15.4811 10.8535 14.8464L5.67355 9.66638C5.3076 9.30043 5.56675 8.67993 6.07999 8.67993H11.69Z"
                                            fill="#666666"
                                            stroke="white"
                                        />
                                    </svg>
                                )}

                            </div>
                            {isStateOpen && (
                                <div className="absolute top-[90%] mt-2 w-full bg-white border border-zinc-100 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                                    {/* حقل البحث */}
                                    <div className="px-4 py-2">
                                        <input
                                            type="text"
                                            placeholder={n("searchFiltersDrd7")}
                                            value={searchCountry}
                                            onChange={(e) => setSearchState(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    {/* قائمة النتائج بعد الفلترة */}
                                    {!states.loading ? (
                                        filteredState?.length > 0 ? (
                                            filteredState.map((state: any) => (
                                                <div
                                                    key={state?.id}
                                                    onClick={() => {
                                                        setSelectedState(state);
                                                        setSelectedCity({ id: 0, name: "" });
                                                        setIsCountryOpen(false);
                                                        setIsStateOpen(false);
                                                        setIsCityOpen(false);
                                                        // setIsAcademicDegreeOpen(false);
                                                        setIsMajorsOpen(false);
                                                        setSearchCountry("");
                                                        dispatch(getAllUniversities({
                                                            country: selectedCountry?.id,
                                                            state: state?.id,
                                                            city: selectedCity?.id,
                                                            majors: selectedMajors?.id,
                                                            // fields: selectedFields?.id,
                                                            page: currentPage,
                                                            limit: limit,
                                                            language, recommended
                                                        }));
                                                        dispatch(getAllCities({ language: language, countryId: selectedCountry?.id, stateId: state?.id }));
                                                        scrollToTop();
                                                    }}
                                                    className="px-6 py-3 hover:bg-gray-100 cursor-pointer"
                                                >
                                                    {state.name}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="px-6 py-3 text-gray-400">
                                                {n("searchFiltersDrd5")}
                                            </div>
                                        )
                                    ) : (
                                        <div className="px-6 py-3 text-gray-400">
                                            {n("searchFiltersDrd6")}...
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Filter By City */}
                        <div className="flex flex-col gap-2 items-start  w-full  relative">
                            <div className="text-base font-bold tracking-normal leading-7 text-slate-900 max-sm:text-sm">
                                {n("searchFiltersDrd11")}
                            </div>
                            <div
                                onClick={() => {
                                    setIsCityOpen(!isCityOpen);
                                    setIsCountryOpen(false);
                                    setIsStateOpen(false);
                                    // setIsAcademicDegreeOpen(false);
                                    setIsMajorsOpen(false);
                                    // setIsLanguageOpen(false);
                                    setIsCountryOpen(false);
                                    setIsStateOpen(false);
                                }}
                                className="flex justify-between items-center py-1 px-6 w-full border border-solid bg-neutral-50 border-zinc-100 rounded-[64px] cursor-pointer max-sm:px-4"
                            >
                                <span className="text-base tracking-wide text-neutral-600 max-sm:text-sm">
                                    {selectedCity?.name || n("searchFiltersDrd3+")}
                                </span>
                                {selectedCity?.name ? (
                                    <svg onClick={(e) => {
                                        e.stopPropagation();
                                        setCurrentPage(1);
                                        scrollToTop();
                                        dispatch(getAllUniversities({
                                            country: selectedCountry?.id,
                                            state: selectedState?.id,
                                            majors: selectedMajors?.id,
                                            // fields: selectedFields?.id,
                                            page: 1,
                                            limit: limit,
                                            language, recommended
                                        }));
                                        setSelectedCity(undefined)
                                        // setSelectedFields(undefined)
                                        setSelectedMajors(undefined)
                                    }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg
                                        className={`transition-transform duration-500 ease-in-out ${isCityOpen ? "rotate-180" : ""} `}
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M11.69 8.67993H17.92C18.433 8.67993 18.6939 9.30178 18.3349 9.66788C18.3346 9.66825 18.3342 9.66863 18.3338 9.66901L15.1264 12.8764L13.1564 14.8464C12.5217 15.4811 11.4883 15.4811 10.8535 14.8464L5.67355 9.66638C5.3076 9.30043 5.56675 8.67993 6.07999 8.67993H11.69Z"
                                            fill="#666666"
                                            stroke="white"
                                        />
                                    </svg>
                                )}



                            </div>
                            {isCityOpen && (
                                <div className="absolute top-[90%] mt-2 w-full bg-white border border-zinc-100 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                                    {/* حقل البحث */}
                                    <div className="px-4 py-2">
                                        <input
                                            type="text"
                                            placeholder={n("searchFiltersDrd11")}
                                            value={searchCountry}
                                            onChange={(e) => setSearchCity(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    {/* قائمة النتائج بعد الفلترة */}
                                    {!cities.loading ? (
                                        filteredCity?.length > 0 ? (
                                            filteredCity.map((city: any) => (
                                                <div
                                                    key={city?.id}
                                                    onClick={() => {
                                                        setSelectedCity(city);
                                                        setIsCountryOpen(false);
                                                        setIsStateOpen(false);
                                                        setIsCityOpen(false);
                                                        // setIsAcademicDegreeOpen(false);
                                                        setIsMajorsOpen(false);
                                                        setSearchCity("");
                                                        scrollToTop();
                                                        dispatch(getAllUniversities({
                                                            country: selectedCountry?.id,
                                                            state: selectedState?.id,
                                                            city: city?.id,
                                                            majors: selectedMajors?.id,
                                                            // fields: selectedFields?.id,
                                                            page: currentPage,
                                                            limit: limit,
                                                            language, recommended
                                                        }));
                                                    }}
                                                    className="px-6 py-3 hover:bg-gray-100 cursor-pointer"
                                                >
                                                    {city.name}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="px-6 py-3 text-gray-400">
                                                {n("searchFiltersDrd5")}
                                            </div>
                                        )
                                    ) : (
                                        <div className="px-6 py-3 text-gray-400">
                                            {n("searchFiltersDrd6")}...
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Filter By  Majors */}
                        <div className="flex flex-col gap-2 items-start  w-full  relative">
                            <div className="text-base font-bold tracking-normal leading-7 text-slate-900 max-sm:text-sm">
                                {n("searchFilters3")}
                            </div>
                            <div
                                onClick={() => {
                                    const currentMajerLang =
                                        langMajerRef.current !== language;
                                    if (!majors?.majors?.length || currentMajerLang) {
                                        dispatch(getAllMajors({ language: language }));
                                        langMajerRef.current = language;
                                    }
                                    setIsMajorsOpen(!isMajorsOpen);
                                    // setIsAcademicDegreeOpen(false);
                                    setIsCountryOpen(false);
                                    setIsStateOpen(false);
                                    // setIsFieldsOpen(false);
                                }}
                                className="flex justify-between items-center py-1 px-6 w-full border border-solid bg-neutral-50 border-zinc-100 rounded-[64px] cursor-pointer max-sm:px-4 "
                            >
                                <span className="text-base tracking-wide text-neutral-600 max-sm:text-sm line-clamp-1" >
                                    {selectedMajors?.name || n("searchFilters3+")}
                                </span>

                                {selectedMajors?.name ?
                                    <svg onClick={(e) => {
                                        e.stopPropagation();
                                        setCurrentPage(1);
                                        dispatch(getAllUniversities({
                                            country: selectedCountry?.id,
                                            state: selectedState?.id,
                                            city: selectedCity?.id,
                                            // fields: selectedFields?.id,
                                            page: 1,
                                            limit: limit,
                                            language, recommended
                                        }));
                                        scrollToTop();
                                        setSelectedMajors(undefined)
                                    }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                    : <svg
                                        className={`transition-transform duration-500 ease-in-out ${isMajorsOpen ? "rotate-180" : ""} `}
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M11.69 8.67993H17.92C18.433 8.67993 18.6939 9.30178 18.3349 9.66788C18.3346 9.66825 18.3342 9.66863 18.3338 9.66901L15.1264 12.8764L13.1564 14.8464C12.5217 15.4811 11.4883 15.4811 10.8535 14.8464L5.67355 9.66638C5.3076 9.30043 5.56675 8.67993 6.07999 8.67993H11.69Z"
                                            fill="#666666"
                                            stroke="white"
                                        />
                                    </svg>}
                            </div>
                            {isMajorsOpen && (
                                <div className="absolute top-[90%] mt-2 w-full bg-white border border-zinc-100 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                                    <div className="px-4 py-2 ">
                                        <input
                                            type="text"
                                            placeholder={n("searchFiltersDrd9")}
                                            value={searchMajor}
                                            onChange={(e) => setSearchMajor(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    {!majors.loading ? (
                                        filteredMajors?.length > 0 ? (
                                            filteredMajors.map((major: any) => (
                                                <div
                                                    key={major?.id}
                                                    onClick={() => {
                                                        setSelectedMajors(major);
                                                        setIsMajorsOpen(false);
                                                        setSearchMajor("");
                                                        // setSelectedFields({ id: 0, name: "" });
                                                        dispatch(getAllUniversities({
                                                            country: selectedCountry?.id,
                                                            state: selectedState?.id,
                                                            city: selectedCity?.id,
                                                            majors: major?.id,
                                                            // fields: selectedFields?.id,
                                                            page: currentPage,
                                                            limit: limit,
                                                            language, recommended
                                                        }));
                                                        scrollToTop();
                                                    }}
                                                    className="px-6 py-3 hover:bg-gray-100 cursor-pointer "
                                                >
                                                    {major.name}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="px-6 py-3 text-gray-400">
                                                {n("searchFiltersDrd5")}
                                            </div>
                                        )
                                    ) : (
                                        <div className="px-6 py-3 text-gray-400">
                                            {n("searchFiltersDrd6")}...
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Filter By  Field
                              <div className="flex flex-col gap-2 items-start  w-full  relative">
                                 <div className="text-base font-bold tracking-normal leading-7 text-slate-900 max-sm:text-sm">
                                    {n("searchFilters4")}
                                 </div>
                                 <div
                                    onClick={() => {
                                       if (!fields?.fields?.data?.length) {
                                          dispatch(getAllFields({ language }));
                                       }
                                       setIsFieldsOpen(!isFieldsOpen);
                                       setIsMajorsOpen(false);
                                       setIsCountryOpen(false);
                                       setIsStateOpen(false);
                                       setIsLanguageOpen(false);
                                    }}
                                    className="flex justify-between items-center py-1 px-6 w-full border border-solid bg-neutral-50 border-zinc-100 rounded-[64px] cursor-pointer max-sm:px-4"
                                 >
                                    <span className="text-base tracking-wide text-neutral-600 max-sm:text-sm">
                                       {selectedFields?.name || n("searchFilters4+")}
                                    </span>
                                    {selectedFields?.name ? <svg onClick={(e) => {
                                       e.stopPropagation();
                                       setCurrentPage(1);
                                       dispatch(getAllUniversities({ country: selectedCountry?.id, state: selectedState?.id, city: selectedCity?.id, majors: selectedMajors?.id, page: 1, limit: limit, language, recommended }));
                                       scrollToTop();
                                       setSelectedFields(undefined)
                                    }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                       <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                       : <svg
                                          className={`${isFieldsOpen ? "rotate-180" : ""} `}
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                       >
                                          <path
                                             d="M11.69 8.67993H17.92C18.433 8.67993 18.6939 9.30178 18.3349 9.66788C18.3346 9.66825 18.3342 9.66863 18.3338 9.66901L15.1264 12.8764L13.1564 14.8464C12.5217 15.4811 11.4883 15.4811 10.8535 14.8464L5.67355 9.66638C5.3076 9.30043 5.56675 8.67993 6.07999 8.67993H11.69Z"
                                             fill="#666666"
                                             stroke="white"
                                          />
                                       </svg>}

                                 </div>
                                 {isFieldsOpen && (
                                    <div className="absolute top-[90%] mt-2 w-full bg-white border border-zinc-100 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                                       <div className="px-4 py-2">
                                          <input
                                             type="text"
                                             placeholder={n("searchFiltersDrd10")}
                                             value={searchFields}
                                             onChange={(e) => setSearchFields(e.target.value)}
                                             className="w-full px-3 py-2 border border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                          />
                                       </div>
                                       {!fields.loading ? (
                                          filteredFields?.length > 0 ? (
                                             filteredFields.map((field: any) => (
                                                <div
                                                   key={field?.id}
                                                   onClick={() => {
                                                      setSelectedFields(field);
                                                      setIsFieldsOpen(false);
                                                      setSearchFields("");
                                                      dispatch(getAllUniversities({ country: selectedCountry?.id, state: selectedState?.id, city: selectedCity?.id, majors: selectedMajors?.id, fields: field?.id, page: currentPage, limit: limit, language, recommended }));
                                                      scrollToTop();
                                                   }}
                                                   className="px-6 py-3 hover:bg-gray-100 cursor-pointer"
                                                >
                                                   {field.name}
                                                </div>
                                             ))
                                          ) : (
                                             <div className="px-6 py-3 text-gray-400">
                                                {n("searchFiltersDrd5")}
                                             </div>
                                          )
                                       ) : (
                                          <div className="px-6 py-3 text-gray-400">
                                             {n("searchFiltersDrd6")}...
                                          </div>
                                       )}
                                    </div>
                                 )}
                              </div> */}
                    </div>
                </div>
                {/* filter by recommended */}
                <div className="flex  overflow-hidden flex-col pb-4 mt-6 w-full tracking-wide whitespace-nowrap border-b border-solid border-b-zinc-100">
                    <div className="text-base font-bold text-zinc-900">
                        {u("recommendFilter")}
                    </div>
                    <div className="flex gap-3 items-center self-start mt-2 text-sm font-medium text-slate-900">
                        <div
                            className={`overflow-hidden gap-2 self-stretch px-6 py-1 my-auto rounded-lg border border-solid  max-md:px-5 cursor-pointer
                    ${recommended === ""
                                    ? "bg-primary border-primary text-white"
                                    : "bg-white border-zinc-100 text-black"
                                }`}
                            onClick={() => {
                                if (recommended !== "") {
                                    setRecommended("");
                                    setCurrentPage(1);
                                    dispatch(getAllUniversities({
                                        country: selectedCountry?.id,
                                        state: selectedState?.id,
                                        city: selectedCity?.id,
                                        majors: selectedMajors?.id,
                                        // fields: selectedFields?.id,
                                        language, page: 1,
                                        limit: limit, recommended: ""
                                    }));
                                    scrollToTop();
                                }
                            }
                            }
                        >
                            {u("all")}
                        </div>
                        <div
                            className={`overflow-hidden gap-2 self-stretch px-6 py-1 my-auto rounded-lg border border-solid max-md:px-5 cursor-pointer 
                    ${recommended === "true"
                                    ? "bg-primary border-primary text-white"
                                    : "bg-white border-zinc-100 text-black"
                                }`}

                            onClick={() => {
                                if (recommended !== "true") {
                                    setRecommended("true")
                                    dispatch(getAllUniversities({
                                        country: selectedCountry?.id,
                                        state: selectedState?.id,
                                        city: selectedCity?.id,
                                        majors: selectedMajors?.id,
                                        // fields: selectedFields?.id,
                                        language, page: currentPage,
                                        limit: limit,
                                        recommended: "true"
                                    }));
                                    scrollToTop();
                                }
                            }}
                        >
                            {u("recommendFilter")}
                        </div>
                    </div>
                </div>
                {/* filter by rating */}
                {/* <div className="flex overflow-hidden flex-col pb-4 mt-6 w-full tracking-wide whitespace-nowrap border-b border-solid border-b-zinc-100">
                <div className="text-base font-bold text-zinc-900">
                  {u("rating")}
                </div>
                <div className="flex flex-wrap gap-1 items-center mt-2 w-full text-sm font-medium text-slate-900">
                  <div
                    className={`flex gap-2 justify-center items-center self-stretch px-6 py-2 my-auto  rounded-lg border border-solid border-zinc-100 max-md:px-5 cursor-pointer ${rating === "1" ? "bg-gray" : "bg-white"
                      }`}
                    onClick={() => setRating("1")}
                  >
                    <div className="self-stretch my-auto">1</div>
                    <div>
                      <svg
                        width="23"
                        height="22"
                        viewBox="0 0 23 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18.5716 21.4342C17.7719 22.0039 12.6406 18.393 11.6578 18.3851C10.675 18.3772 5.48592 21.905 4.69553 21.3226C3.90515 20.7402 5.76331 14.758 5.46719 13.8236C5.17107 12.8892 0.20281 9.05816 0.514025 8.12861C0.825309 7.19905 7.10505 7.11271 7.90477 6.54309C8.70449 5.97354 10.8231 0.0780776 11.8059 0.0859454C12.7886 0.0938815 14.8115 6.02266 15.6019 6.60508C16.3923 7.18742 22.6699 7.37488 22.9661 8.30929C23.2622 9.2437 18.2327 12.9943 17.9214 13.9238C17.6102 14.8534 19.3713 20.8646 18.5716 21.4342Z"
                          fill="#F8B84E"
                        />
                      </svg>
                    </div>
                  </div>
                  <div
                    className={`flex gap-2 justify-center items-center self-stretch px-6 py-2 my-auto  rounded-lg border border-solid border-zinc-100 max-md:px-5 cursor-pointer ${rating === "2" ? "bg-gray" : "bg-white"
                      }`}
                    onClick={() => setRating("2")}
                  >
                    <div className="self-stretch my-auto">+2</div>
                    <div>
                      <svg
                        width="23"
                        height="22"
                        viewBox="0 0 23 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18.5716 21.4342C17.7719 22.0039 12.6406 18.393 11.6578 18.3851C10.675 18.3772 5.48592 21.905 4.69553 21.3226C3.90515 20.7402 5.76331 14.758 5.46719 13.8236C5.17107 12.8892 0.20281 9.05816 0.514025 8.12861C0.825309 7.19905 7.10505 7.11271 7.90477 6.54309C8.70449 5.97354 10.8231 0.0780776 11.8059 0.0859454C12.7886 0.0938815 14.8115 6.02266 15.6019 6.60508C16.3923 7.18742 22.6699 7.37488 22.9661 8.30929C23.2622 9.2437 18.2327 12.9943 17.9214 13.9238C17.6102 14.8534 19.3713 20.8646 18.5716 21.4342Z"
                          fill="#F8B84E"
                        />
                      </svg>
                    </div>
                  </div>
                  <div
                    className={`flex gap-2 justify-center items-center self-stretch px-6 py-2 my-auto  rounded-lg border border-solid border-zinc-100 max-md:px-5 cursor-pointer ${rating === "3" ? "bg-gray" : "bg-white"
                      }`}
                    onClick={() => setRating("3")}
                  >
                    <div className="self-stretch my-auto">+3</div>
                    <div>
                      <svg
                        width="23"
                        height="22"
                        viewBox="0 0 23 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18.5716 21.4342C17.7719 22.0039 12.6406 18.393 11.6578 18.3851C10.675 18.3772 5.48592 21.905 4.69553 21.3226C3.90515 20.7402 5.76331 14.758 5.46719 13.8236C5.17107 12.8892 0.20281 9.05816 0.514025 8.12861C0.825309 7.19905 7.10505 7.11271 7.90477 6.54309C8.70449 5.97354 10.8231 0.0780776 11.8059 0.0859454C12.7886 0.0938815 14.8115 6.02266 15.6019 6.60508C16.3923 7.18742 22.6699 7.37488 22.9661 8.30929C23.2622 9.2437 18.2327 12.9943 17.9214 13.9238C17.6102 14.8534 19.3713 20.8646 18.5716 21.4342Z"
                          fill="#F8B84E"
                        />
                      </svg>
                    </div>
                  </div>
                  <div
                    className={`flex gap-2 justify-center items-center self-stretch px-6 py-2 my-auto  rounded-lg border border-solid border-zinc-100 max-md:px-5 cursor-pointer ${rating === "4" ? "bg-gray" : "bg-white"
                      }`}
                    onClick={() => setRating("4")}
                  >
                    <div className="self-stretch my-auto">+4</div>
                    <div>
                      <svg
                        width="23"
                        height="22"
                        viewBox="0 0 23 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18.5716 21.4342C17.7719 22.0039 12.6406 18.393 11.6578 18.3851C10.675 18.3772 5.48592 21.905 4.69553 21.3226C3.90515 20.7402 5.76331 14.758 5.46719 13.8236C5.17107 12.8892 0.20281 9.05816 0.514025 8.12861C0.825309 7.19905 7.10505 7.11271 7.90477 6.54309C8.70449 5.97354 10.8231 0.0780776 11.8059 0.0859454C12.7886 0.0938815 14.8115 6.02266 15.6019 6.60508C16.3923 7.18742 22.6699 7.37488 22.9661 8.30929C23.2622 9.2437 18.2327 12.9943 17.9214 13.9238C17.6102 14.8534 19.3713 20.8646 18.5716 21.4342Z"
                          fill="#F8B84E"
                        />
                      </svg>
                    </div>
                  </div>
                  <div
                    className={`flex gap-2 justify-center items-center self-stretch px-6 py-2 my-auto  rounded-lg border border-solid border-zinc-100 max-md:px-5 cursor-pointer ${rating === "5" ? "bg-gray" : "bg-white"
                      }`}
                    onClick={() => setRating("5")}
                  >
                    <div className="self-stretch my-auto">+5</div>
                    <div>
                      <svg
                        width="23"
                        height="22"
                        viewBox="0 0 23 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18.5716 21.4342C17.7719 22.0039 12.6406 18.393 11.6578 18.3851C10.675 18.3772 5.48592 21.905 4.69553 21.3226C3.90515 20.7402 5.76331 14.758 5.46719 13.8236C5.17107 12.8892 0.20281 9.05816 0.514025 8.12861C0.825309 7.19905 7.10505 7.11271 7.90477 6.54309C8.70449 5.97354 10.8231 0.0780776 11.8059 0.0859454C12.7886 0.0938815 14.8115 6.02266 15.6019 6.60508C16.3923 7.18742 22.6699 7.37488 22.9661 8.30929C23.2622 9.2437 18.2327 12.9943 17.9214 13.9238C17.6102 14.8534 19.3713 20.8646 18.5716 21.4342Z"
                          fill="#F8B84E"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div> */}
                <button
                    type="submit"
                    className=" flex overflow-hidden gap-1 justify-center items-center px-4 py-0 mt-6 w-full text-base font-medium tracking-wide text-white whitespace-nowrap border border-solid bg-primary border-primary min-h-[42px] rounded-[64px] cursor-pointer"
                >
                    <svg
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            opacity="0.3"
                            d="M21.9999 19.4199L18.8299 16.4199C18.2272 17.1959 17.5049 17.871 16.6899 18.4199L19.9499 21.5199C20.087 21.68 20.2565 21.8092 20.4472 21.899C20.6379 21.9887 20.8455 22.037 21.0562 22.0406C21.267 22.0442 21.4761 22.0031 21.6697 21.9199C21.8634 21.8368 22.0372 21.7135 22.1797 21.5581C22.3222 21.4028 22.4301 21.2191 22.4963 21.019C22.5625 20.8189 22.5855 20.607 22.5638 20.3973C22.5421 20.1877 22.4762 19.985 22.3703 19.8028C22.2645 19.6205 22.1212 19.4627 21.9499 19.3399L21.9999 19.4199Z"
                            fill="white"
                        />
                        <path
                            d="M11.64 2C9.85999 2 8.11993 2.52784 6.63989 3.51677C5.15984 4.50571 4.00629 5.91131 3.3251 7.55585C2.64391 9.20038 2.46568 11.01 2.81295 12.7558C3.16022 14.5016 4.01739 16.1053 5.27606 17.364C6.53473 18.6226 8.13838 19.4798 9.88421 19.8271C11.63 20.1743 13.4396 19.9961 15.0842 19.3149C16.7287 18.6337 18.1343 17.4802 19.1232 16.0001C20.1122 14.5201 20.64 12.78 20.64 11C20.64 8.61305 19.6918 6.32387 18.004 4.63604C16.3162 2.94821 14.027 2 11.64 2ZM11.64 17.36C10.3845 17.36 9.15722 16.9878 8.11319 16.2905C7.06915 15.5932 6.25526 14.6021 5.77435 13.4423C5.29344 12.2826 5.1671 11.0064 5.41131 9.77485C5.65552 8.54335 6.2593 7.41187 7.14637 6.52341C8.03343 5.63495 9.16396 5.02938 10.3951 4.78324C11.6262 4.53709 12.9027 4.66142 14.0631 5.1405C15.2236 5.61958 16.216 6.43192 16.915 7.47486C17.6139 8.51779 17.988 9.74452 17.99 11C17.9927 11.8351 17.8303 12.6625 17.5122 13.4347C17.1942 14.2068 16.7267 14.9086 16.1366 15.4995C15.5466 16.0905 14.8456 16.5591 14.0739 16.8784C13.3023 17.1976 12.4751 17.3613 11.64 17.36V17.36Z"
                            fill="white"
                        />
                    </svg>

                    <div className="self-stretch my-auto text-white">
                        {u("searchBtn")}
                    </div>
                </button>
            </form>
        </div>
    )
}

export default FilterUniversity
