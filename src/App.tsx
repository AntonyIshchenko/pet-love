import { lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Header from '@components/Header/Header';
import Layout from '@components/Layout/Layout';
import PrivateRoute from '@components/PrivateRoute/PrivateRoute';
import RestrictedRoute from '@components/RestrictedRoute/RestrictedRoute';

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
      </Layout>
    </>
  );
}

export default App;
