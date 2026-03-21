import { Button, Card } from 'antd';
import { useState } from 'react';

import { downloadFile1, downloadFile2 } from '@/api/examples/download';
import Page from '@/components/page';
import {
  downloadFileFromBase64,
  downloadFileFromBlobPart,
  downloadFileFromImageUrl,
  downloadFileFromUrl,
} from '@/utils';

import imageBase64 from './base64';

function FileDownload() {
  const [downloadResult, setDownloadResult] = useState('');
  function getBlob() {
    downloadFile1().then((res) => {
      setDownloadResult(`获取Blob成功，长度：${res.size}`);
    });
  }

  function getResponse() {
    downloadFile2().then((res) => {
      setDownloadResult(
        `获取Response成功，headers：${JSON.stringify(res.headers)},长度：${res.data.size}`,
      );
    });
  }
  return (
    <Page title="文件下载示例">
      <Card title="根据文件地址下载文件">
        <Button
          type="primary"
          onClick={() =>
            downloadFileFromUrl({
              source:
                'https://codeload.github.com/vbenjs/vue-vben-admin-doc/zip/main',
              target: '_self',
            })
          }
        >
          Download File
        </Button>
      </Card>

      <Card className="my-5" title="根据地址下载图片">
        <Button
          type="primary"
          onClick={() =>
            downloadFileFromImageUrl({
              source:
                'https://unpkg.com/@vbenjs/static-source@0.1.7/source/logo-v1.webp',
              fileName: 'vben-logo.png',
            })
          }
        >
          Download File
        </Button>
      </Card>

      <Card className="my-5" title="base64流下载">
        <Button
          type="primary"
          onClick={() =>
            downloadFileFromBase64({
              source: imageBase64,
              fileName: 'image.png',
            })
          }
        >
          Download Image
        </Button>
      </Card>
      <Card className="my-5" title="文本下载">
        <Button
          type="primary"
          onClick={() =>
            downloadFileFromBlobPart({
              source: 'text content',
              fileName: 'test.txt',
            })
          }
        >
          Download TxT
        </Button>
      </Card>

      <Card className="my-5" title="Request download">
        <Button type="primary" onClick={getBlob}>
          获取Blob
        </Button>
        <Button type="primary" className="ml-4" onClick={getResponse}>
          获取Response
        </Button>
        <div className="mt-4">{downloadResult}</div>
      </Card>
    </Page>
  );
}

export default FileDownload;
