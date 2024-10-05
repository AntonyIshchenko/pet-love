import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Modal from 'react-modal';

import Header from '@components/Header/Header';
import Layout from '@components/Layout/Layout';
import PrivateRoute from '@components/PrivateRoute/PrivateRoute';
import RestrictedRoute from '@components/RestrictedRoute/RestrictedRoute';
import { useDispatch } from 'react-redux';
import {
  useLazyGetCategoriesQuery,
  useLazyGetCitiesQuery,
  useLazyGetSpeciesQuery,
} from '@utils/api';
import { useSelector } from 'react-redux';
import { commonActions, commonSelectors } from '@redux/common';
import clsx from 'clsx';

Modal.setAppElement('#root');

const HomePage = lazy(() => import('@pages/Home/Home'));
const NewsPage = lazy(() => import('@pages/News/News'));
const NoticesPage = lazy(() => import('@pages/Notices/Notices'));
const FriendsPage = lazy(() => import('@pages/Friends/Friends'));
const RegisterPage = lazy(() => import('@pages/Register/Register'));
const LoginPage = lazy(() => import('@pages/Login/Login'));
const ProfilePage = lazy(() => import('@pages/Profile/Profile'));
const AddPetPage = lazy(() => import('@pages/AddPet/AddPet'));
const NotFoundPage = lazy(() => import('@pages/NotFound/NotFound'));

function App() {
  const dispatch = useDispatch();
  const isCategoriesFetched = useSelector(commonSelectors.isCategoriesFetched);
  const isCitiesFetched = useSelector(commonSelectors.isCitiesFetched);
  const isSpeciesFetched = useSelector(commonSelectors.isSpeciesFetched);
  const isOpenModal = useSelector(commonSelectors.isOpenModal);
  const modalContent = useSelector(commonSelectors.modalContent);
  const modalClasses = useSelector(commonSelectors.modalClasses);

  const [
    triggerGetCategories,
    {
      data: categoriesData,
      error: categoriesError,
      isFetching: isFetchingCategories,
    },
  ] = useLazyGetCategoriesQuery();

  const [
    triggerGetSpecies,
    { data: speciesData, error: speciesError, isFetching: isFetchingSpecies },
  ] = useLazyGetSpeciesQuery();

  const [
    triggerGetCities,
    { data: citiesData, error: citiesError, isFetching: isFetchingCities },
  ] = useLazyGetCitiesQuery();

  useEffect(() => {
    if (categoriesData) dispatch(commonActions.setCategories(categoriesData));
  }, [dispatch, categoriesData]);

  useEffect(() => {
    if (!isCategoriesFetched) triggerGetCategories();
  }, [isCategoriesFetched, triggerGetCategories]);

  useEffect(() => {
    if (citiesData) dispatch(commonActions.setCities(citiesData));
  }, [dispatch, citiesData]);

  useEffect(() => {
    if (!isCitiesFetched) triggerGetCities();
  }, [isCitiesFetched, triggerGetCities]);

  useEffect(() => {
    if (speciesData) dispatch(commonActions.setSpecies(speciesData));
  }, [dispatch, speciesData]);

  useEffect(() => {
    if (!isSpeciesFetched) triggerGetSpecies();
  }, [isSpeciesFetched, triggerGetSpecies]);

  return (
    <>
      <Header />
      <Layout>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/notices" element={<NoticesPage />} />
            <Route path="/friends" element={<FriendsPage />} />
            <Route
              path="/register"
              element={<RestrictedRoute component={<RegisterPage />} />}
            />
            <Route
              path="/login"
              element={<RestrictedRoute component={<LoginPage />} />}
            />
            <Route
              path="/profile"
              element={<PrivateRoute component={<ProfilePage />} />}
            />
            <Route
              path="/add-pet"
              element={<PrivateRoute component={<AddPetPage />} />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
        <Modal
          isOpen={isOpenModal}
          onRequestClose={() => dispatch(commonActions.closeModal())}
          className={clsx('modal', modalClasses.content)}
          overlayClassName={clsx('overlay', modalClasses.overlay)}
        >
          {modalContent}
        </Modal>
      </Layout>
    </>
  );
}

export default App;
