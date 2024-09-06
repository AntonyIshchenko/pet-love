import { useMemo } from 'react';
import { useMediaQuery } from 'react-responsive';

import useMediaType from '@types-all/useMediaType';

function useMedia(): useMediaType {
  const isTablet = useMediaQuery({ query: '(min-width: 768px)' });
  const isDesktop = useMediaQuery({ query: '(min-width: 1280px)' });

  const media = useMemo(() => {
    return {
      isDesktop,
      isTablet: isTablet && !isDesktop,
      isMobile: !isDesktop && !isTablet,
    };
  }, [isTablet, isDesktop]);

  return media;
}

export default useMedia;
