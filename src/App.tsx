import { lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Header, Layout, PrivateRoute, RestrictedRoute } from 'components';

const HomePage = lazy(() => import('./pages/Home/Home.tsx'));
const NewsPage = lazy(() => import('./pages/News/News.tsx'));
const NoticesPage = lazy(() => import('./pages/Notices/Notices.tsx'));
const FriendsPage = lazy(() => import('./pages/Friends/Friends.tsx'));
const RegisterPage = lazy(() => import('./pages/Register/Register.tsx'));
const LoginPage = lazy(() => import('./pages/Login/Login.tsx'));
const ProfilePage = lazy(() => import('./pages/Profile/Profile.tsx'));
const AddPetPage = lazy(() => import('./pages/AddPet/AddPet.tsx'));
const NotFoundPage = lazy(() => import('./pages/NotFound/NotFound.tsx'));

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
