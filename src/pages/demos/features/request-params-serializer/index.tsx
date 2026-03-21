import { Card, Radio } from 'antd';
import { useEffect, useMemo, useState } from 'react';

import { getParamsData } from '@/api/examples/params';
import Page from '@/components/page';

type ParamsSerializerType = 'brackets' | 'comma' | 'indices' | 'repeat';
const PARAMS = { ids: [2512, 3241, 4255] };

export default function RequestParamsSerializer() {
  const [paramsSerializer, setParamsSerializer] =
    useState<ParamsSerializerType>('brackets');
  const [response, setResponse] = useState('');

  const paramsStr = useMemo(() => {
    // 写一段代码，从完整的URL中提取参数部分
    if (!response) return '';
    return new URL(response).searchParams.toString();
  }, [response]);

  useEffect(() => {
    getParamsData(PARAMS, paramsSerializer).then((res: any) => {
      setResponse(res.request.responseURL);
    });
  }, [paramsSerializer]);

  return (
    <Page
      title="请求参数序列化"
      description="不同的后台接口可能对数组类型的GET参数的解析方式不同，我们预置了几种数组序列化方式，通过配置 paramsSerializer 来实现不同的序列化方式"
    >
      <Card>
        <Radio.Group
          value={paramsSerializer}
          onChange={(e) => setParamsSerializer(e.target.value)}
          name="paramsSerializer"
        >
          <Radio value="brackets">brackets</Radio>
          <Radio value="comma">comma</Radio>
          <Radio value="indices">indices</Radio>
          <Radio value="repeat">repeat</Radio>
        </Radio.Group>
        <div className="mt-4 flex flex-col gap-4">
          <div>
            <h3>需要提交的参数</h3>
            <div>{JSON.stringify(PARAMS, null, 2)}</div>
          </div>
          {response && (
            <>
              <div>
                <h3>访问地址</h3>
                <pre>{response}</pre>
              </div>
              <div>
                <h3>参数字符串</h3>
                <pre>{paramsStr}</pre>
              </div>
              <div>
                <h3>参数解码</h3>
                <pre>{decodeURIComponent(paramsStr)}</pre>
              </div>
            </>
          )}
        </div>
      </Card>
    </Page>
  );
}
