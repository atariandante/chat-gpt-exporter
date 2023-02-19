import { useMemo } from 'react';
import qs from 'qs';

const useQueryParams = () => {
  return useMemo(
    () => qs.parse(window.location.search, { ignoreQueryPrefix: true }),
    []
  );
};

export default useQueryParams;
