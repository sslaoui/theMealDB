import { useEffect, useState } from 'react';
import axios from 'axios';
import { MealsListProps } from '../../meals/Meals';

type MealsState = {
    meals: Array<MealsListProps>;
    hasMeals?: boolean;
    isLoading?: boolean;
    error?: Error | null;
};

const emptyMealList: Array<MealsListProps> = [];

const mealsEmptyState: MealsState = {
    meals: emptyMealList,
    hasMeals: false,
    isLoading: true,
    error: null,
};

export const useCategory = (categoryId: string) => {
    const [mealsState, setMealsState] = useState<MealsState>(mealsEmptyState);
    const baseURL = 'https://themealdb.com/api/json/v2/9973533/filter.php?c=';

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                axios.get(baseURL + categoryId).then((res) => {
                    const meals = res.data.meals;
                    const hasMeals = meals.length;
                    setMealsState({ meals, hasMeals, isLoading: false, error: null });
                });
            } catch (error) {
                if (!axios.isCancel(error)) {
                    setMealsState({ meals: emptyMealList, hasMeals: false, isLoading: false, error });
                }
            }
        };

        fetchCategory();
    }, [categoryId]);

    return { ...mealsState };
};
