import { Alert, Button, Card } from 'antd';
import { useState } from 'react';

import { getBigIntData } from '@/api/examples/json-bigint';
import Page from '@/components/page';

function JsonBigint() {
  const [response, setResponse] = useState('');
  function fetchData() {
    getBigIntData().then((res) => {
      console.log(res);

      setResponse(res);
    });
  }
  return (
    <Page
      title="JSON BigInt Support"
      description="解析后端返回的长整数（long/bigInt）。代码位置：playground/src/api/request.ts中的transformResponse"
    >
      <Card>
        <Alert
          description={
            <>
              有些后端接口返回的ID是长整数，但javascript原生的JSON解析是不支持超过2^53-1的长整数的。
              这种情况可以建议后端返回数据前将长整数转换为字符串类型。如果后端不接受我们的建议😡……
              <br />
              下面的按钮点击后会发起请求，接口返回的JSON数据中的id字段是超出整数范围的数字，已自动将其解析为字符串
            </>
          }
        />

        <Button className="mt-4" type="primary" onClick={fetchData}>
          发起请求
        </Button>
        <div>
          <pre>
            {typeof response === 'object'
              ? JSON.stringify(response, null, 2)
              : response}
          </pre>
        </div>
      </Card>
    </Page>
  );
}

export default JsonBigint;
