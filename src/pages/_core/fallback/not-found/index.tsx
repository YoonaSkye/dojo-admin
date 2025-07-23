import { Iconify } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from '@/icons';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const nav = useNavigate();

  const onClick = () => {
    nav('/');
  };

  return (
    <div className="flex size-full flex-col items-center justify-center duration-300">
      <Iconify icon="svg:404" className="md:1/3 h-1/3 w-1/2 lg:w-1/4" />
      <div className="flex-col-center">
        <p className="text-foreground mt-8 text-2xl md:text-3xl lg:text-4xl">
          {/* {title} */}哎呀！未找到页面
        </p>
        <p className="text-muted-foreground md:text-md my-4 lg:text-lg">
          {/* {description} */}抱歉，我们无法找到您要找的页面。
        </p>
        <Button size="lg" onClick={onClick}>
          <ArrowLeft className="mr-2 size-4" />
          返回首页
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
