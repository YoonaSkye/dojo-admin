import { Form } from 'antd';

import useHookTable from './use-hook-table';

// import type { TablePaginationConfig, TableProps } from 'antd';

// type GetTableData<A extends AntDesign.TableApiFn> = AntDesign.GetTableData<A>;

// type TableColumn<T> = AntDesign.TableColumn<T>;

// type Config<A extends AntDesign.TableApiFn> = AntDesign.AntDesignTableConfig<A>;

// type CustomTableProps<A extends AntDesign.TableApiFn> = Omit<
//   TableProps<AntDesign.TableDataWithIndex<GetTableData<A>>>,
//   'loading'
// > & {
//   loading: boolean;
// };

export function useTable(config) {
  const isMobile = false;

  const {
    apiFn,
    apiParams,
    columns: columnsFactory,
    immediate,
    isChangeURL = false,
    onChange: onChangeCallback,
    pagination: paginationConfig,
    rowKey = 'id',
    transformParams,
    ...rest
  } = config;

  const [form] = Form.useForm();

  // const { search } = useLocation();

  // const query = parseQuery(search) as unknown as Parameters<A>[0];
  const query = {};

  const {
    columnChecks,
    columns,
    data,
    empty,
    loading,
    pageNum,
    pageSize,
    resetSearchParams,
    searchParams,
    setColumnChecks,
    total,
    updateSearchParams,
  } = useHookTable({
    apiFn,
    apiParams: { ...apiParams, ...query },
    columns: columnsFactory,
    getColumnChecks: (cols) => {
      const checks = [];

      cols.forEach((column) => {
        if (column.key) {
          checks.push({
            checked: true,
            key: column.key,
            title: column.title,
          });
        }
      });

      return checks;
    },
    getColumns: (cols, checks) => {
      const columnMap = new Map();

      cols.forEach((column) => {
        if (column.key) {
          columnMap.set(column.key, column);
        }
      });

      const filteredColumns = checks
        .filter((item) => item.checked)
        .map((check) => columnMap.get(check.key));

      return filteredColumns;
    },
    immediate,
    isChangeURL,
    transformer: (res, { current = 1, size = 10 }) => {
      const {
        records = [],
        total: totalNum = 0,
      } = res || {};

      const recordsWithIndex = records.map((item, index) => ({
        ...item,
        index: (current - 1) * size + index + 1,
      }));

      return {
        data: recordsWithIndex,
        pageNum: current,
        pageSize: size,
        total: totalNum,
      };
    },
    transformParams,
  });

  // this is for mobile, if the system does not support mobile, you can use `pagination` directly
  const pagination = {
    current: pageNum,
    pageSize,
    pageSizeOptions: ['10', '15', '20', '25', '30'],
    showSizeChanger: true,
    simple: isMobile,
    total,
    ...paginationConfig,
  };
  function reset() {
    form.setFieldsValue(apiParams);

    resetSearchParams();
  }

  async function run(isResetCurrent = true) {
    const res = await form.validateFields();
    // console.log('res', res);

    if (res) {
      if (isResetCurrent) {
        const { current = 1, ...other } = res;
        updateSearchParams({ current, ...other });
      } else {
        updateSearchParams(res);
      }
    }
  }

  function handleChange(...args) {
    const [paginationContext, ...otherParams] = args;

    let other = {
      current: paginationContext.current,
      size: paginationContext.pageSize,
    };

    if (onChangeCallback) {
      const params = onChangeCallback(paginationContext, ...otherParams);
      if (params) {
        other = params;
      }
    }

    updateSearchParams(other);
  }

  return {
    columnChecks,
    data,
    empty,
    form,
    run,
    searchParams,
    searchProps: {
      form,
      reset,
      search: run,
      searchParams: searchParams,
    },
    setColumnChecks,
    tableProps: {
      columns,
      dataSource: data,
      loading,
      onChange: handleChange,
      pagination,
      rowKey,
      ...rest,
    },
  };
}
