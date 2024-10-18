import avatar from '@/assets/images/avatar-v1.webp';
import IAvatar from '@/components/avatar';

export default function WorkbenchHeader() {
  return (
    <div className="card-box p-4 py-6 lg:flex">
      <IAvatar src={avatar} className="size-20" />

      <div className="flex flex-col justify-center md:ml-6 md:mt-0">
        <h1 className="text-md font-semibold md:text-xl">
          早安, UserInfo, 开始您一天的工作吧！
        </h1>
        <span className="text-foreground/80 mt-1"> 今日晴，20℃ - 32℃！ </span>
      </div>

      <div className="mt-4 flex flex-1 justify-end md:mt-0">
        <div className="flex flex-col justify-center text-right">
          <span className="text-foreground/80"> 待办 </span>
          <span className="text-2xl">2/10</span>
        </div>

        <div className="mx-12 flex flex-col justify-center text-right md:mx-16">
          <span className="text-foreground/80"> 项目 </span>
          <span className="text-2xl">8</span>
        </div>
        <div className="mr-4 flex flex-col justify-center text-right md:mr-10">
          <span className="text-foreground/80"> 团队 </span>
          <span className="text-2xl">300</span>
        </div>
      </div>
    </div>
  );
}
