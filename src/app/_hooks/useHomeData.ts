import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { getAllUniversities } from "@/app/reduxTool-kit/slices/universitiesSlice";
import { getAllLanguageSchools } from "@/app/reduxTool-kit/slices/languageSchoolsSlice";

export const useHomeData = (language: string) => {
    const dispatch = useDispatch<AppDispatch>();

    const universities = useSelector(
        (state: RootState) => state.universities
    );

    const languageSchools = useSelector(
        (state: RootState) => state.languageSchools
    );

    useEffect(() => {
        dispatch(getAllUniversities({ language, recommended: "true", limit: 9 }));
        dispatch(getAllLanguageSchools({ language, recommended: "true", limit: 9 }));
    }, [dispatch, language]);

    return {
        universities,
        languageSchools,
    };
};
