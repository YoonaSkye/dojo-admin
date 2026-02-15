import { useRoute } from '@/router';
import { useBoolean } from 'ahooks';
import { Skeleton } from 'antd';

const IframePage = () => {
  const [loading, { setFalse: endLoading }] = useBoolean(true);

  const {
    handle: { iframeSrc },
  } = useRoute();

  return (
    <>
      {loading && <Skeleton active />}
      {iframeSrc && (
        <div className={loading ? 'h-0' : 'relative size-full'}>
          <iframe
            className="size-full"
            id="iframePage"
            src={iframeSrc}
            onLoad={endLoading}
          />
        </div>
      )}
    </>
  );
};

export default IframePage;
