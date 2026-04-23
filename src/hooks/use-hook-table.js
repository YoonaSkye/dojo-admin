import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import useBoolean from './use-boolean';
import useLoading from './use-loading';

export default function useHookTable(config) {
  const {
    apiFn,
    apiParams,
    getColumnChecks,
    getColumns,
    immediate = true,
    isChangeURL,
    transformer,
    transformParams,
  } = config;

  const { endLoading, loading, startLoading } = useLoading();

  const { bool: empty, setBool: setEmpty } = useBoolean();

  const searchParams = useRef(apiParams || { current: 1, size: 10 });

  const [, setSearchParams] = useSearchParams();

  const allColumns = config.columns();

  const [data, setData] = useState({
    data: [],
    pageNum: 1,
    pageSize: 10,
    total: 0,
  });

  const [columnChecks, setColumnChecks] = useState(getColumnChecks(allColumns));

  const columns = getColumns(allColumns, columnChecks);

  async function getData() {
    startLoading();

    try {
      let formattedParams = formatSearchParams(searchParams.current);

      if (transformParams) {
        formattedParams = transformParams(formattedParams);
      }
      // console.log('formattedParams', formattedParams);

      if (isChangeURL) {
        setSearchParams(formattedParams, {
          replace: true,
        });
      }

      const response = await apiFn(formattedParams);

      const transformed = transformer(response, formattedParams);

      setData(transformed);

      setEmpty(transformed.data.length === 0);

      await config.onFetched?.(transformed);
    } catch {
      // Error is already handled by the error interceptor
      setEmpty(true);
    }

    endLoading();
  }

  /**
   * update search params
   *
   * @param params
   */
  function updateSearchParams(params) {
    Object.assign(searchParams.current, params);
    getData();
  }

  /** reset search params */
  function resetSearchParams() {
    const { current, size } = searchParams.current; // 保留分页信息

    // 用默认 apiParams 重建对象，再把 current/size 覆盖回去
    searchParams.current = { current, size };

    getData();
  }

  useEffect(() => {
    if (immediate) getData();
  }, []);

  return {
    columnChecks,
    columns,
    data: data.data,
    empty,
    getData,
    loading,
    pageNum: data.pageNum,
    pageSize: data.pageSize,
    resetSearchParams,
    searchParams: formatSearchParams(searchParams.current),
    setColumnChecks,
    total: data.total,
    updateSearchParams,
  };
}

function formatSearchParams(params) {
  return Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== null && value !== undefined,
    ),
  );
}
