import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface Props {
  src: string;
  alt?: string;
  className?: string;
  dot?: boolean;
  dotClass?: string;
}

export default function IAvatar({
  className,
  src,
  alt = 'avatar',
  dotClass = 'bg-green-500',
  dot = false,
}: Props) {
  return (
    <div className={cn(className, 'relative flex flex-shrink-0 items-center')}>
      <Avatar className={cn(className, 'size-full')}>
        <AvatarImage alt={alt} src={src} />
        {/* BUG: 图片会先显示fallback 文字 */}
        {/* <AvatarFallback>{alt?.toUpperCase()}</AvatarFallback> */}
      </Avatar>
      {dot && (
        <span
          className={cn(
            dotClass,
            'border-background absolute bottom-0 right-0 size-3 rounded-full border-2'
          )}
        ></span>
      )}
    </div>
  );
}
