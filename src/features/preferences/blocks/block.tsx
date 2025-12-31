interface Props {
  title: string;
  children: React.ReactNode;
}

export function Block({ title, children }: Props) {
  return (
    <div className="flex flex-col py-4">
      <h3 className="mb-3 font-semibold leading-none tracking-tight">
        {title}
      </h3>
      {children}
    </div>
  );
}
