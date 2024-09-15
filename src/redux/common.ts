import { RootState } from '@redux/store';
import { createSlice } from '@reduxjs/toolkit';
import type { cityType } from '@types-all/cityType';

type CommonSlice = {
  isModalOpen: boolean;
  cities: cityType[];
  categories: string[];
  species: string[];
};

const initialState: CommonSlice = {
  isModalOpen: false,
  cities: [],
  categories: [],
  species: [],
};

const slice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
    setCities: (state, action) => {
      state.cities = action.payload.map(
        (item: { _id: string; stateEn: string; cityEn: string }) => ({
          id: item._id,
          name: `${item.stateEn}, ${item.cityEn}`,
        })
      );
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
  categories: (state: RootState) => state.common.categories,
  cities: (state: RootState) => state.common.cities,
  species: (state: RootState) => state.common.species,
  isCategoriesFetched: (state: RootState) => state.common.categories.length > 0,
  isCitiesFetched: (state: RootState) => state.common.cities.length > 0,
  isSpeciesFetched: (state: RootState) => state.common.species.length > 0,
};
