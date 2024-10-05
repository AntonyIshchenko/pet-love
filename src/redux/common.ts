import { RootState } from '@redux/store';
import { createSlice, current } from '@reduxjs/toolkit';

import type { cityType } from '@types-all/cityType';

type CommonSlice = {
  isModalOpen: boolean;
  modalContent: string;
  modalClasses: { overlay: string; content: string };
  cityFilter: string;
  filteredCities: cityType[];
  cities: cityType[];
  categories: string[];
  species: string[];
};

const initialState: CommonSlice = {
  isModalOpen: false,
  modalContent: '',
  modalClasses: { overlay: '', content: '' },
  cityFilter: '',
  cities: [],
  filteredCities: [],
  categories: [],
  species: [],
};

const slice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isModalOpen = true;
      state.modalContent = action.payload.content;
      state.modalClasses = action.payload.classes;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.modalContent = '';
      state.modalClasses = initialState.modalClasses;
    },
    setCityFilter: (state, action) => {
      const search = action.payload.trim().toLowerCase();

      let filteredCities: cityType[];

      if (search.length >= 3) {
        const curState = current(state);
        const toFilter =
          curState.cityFilter &&
          search.includes(curState.cityFilter.toLowerCase())
            ? curState.filteredCities
            : curState.cities;

        filteredCities = [
          ...toFilter.filter((item) =>
            item.name.toLowerCase().includes(search)
          ),
        ];
      } else {
        filteredCities = [];
      }

      state.filteredCities = filteredCities;
      state.cityFilter = action.payload;
    },
    setCities: (state, action) => {
      state.cities = action.payload
        .map((item: { _id: string; stateEn: string; cityEn: string }) => ({
          id: item._id,
          name: `${item.stateEn}, ${item.cityEn}`,
        }))
        .toSorted((a: cityType, b: cityType) => a.name.localeCompare(b.name));
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setSpecies: (state, action) => {
      state.species = action.payload;
    },
  },
});

export const commonReducer = slice.reducer;
export const commonActions = slice.actions;
export const commonSelectors = {
  isOpenModal: (state: RootState) => state.common.isModalOpen,
  modalContent: (state: RootState) => state.common.modalContent,
  modalClasses: (state: RootState) => state.common.modalClasses,
  categories: (state: RootState) => state.common.categories,
  cities: (state: RootState) => state.common.cities,
  cityFilter: (state: RootState) => state.common.cityFilter,
  filteredCities: (state: RootState) => state.common.filteredCities,
  species: (state: RootState) => state.common.species,
  isCategoriesFetched: (state: RootState) => state.common.categories.length > 0,
  isCitiesFetched: (state: RootState) => state.common.cities.length > 0,
  isSpeciesFetched: (state: RootState) => state.common.species.length > 0,
};
