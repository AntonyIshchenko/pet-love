import { useLocation } from 'react-router-dom';

import useLocationTypes from '@types-all/useLocationType';

function useHomePageLocation(): boolean {
  const location: useLocationTypes = useLocation();

  return location.pathname === '/home';
}

export default useHomePageLocation;
