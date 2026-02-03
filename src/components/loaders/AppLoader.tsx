export default function AppLoader({ title }: Readonly<{ title?: string }>) {
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center">
        <div className="animate-spin h-7 w-7 border-[3px] border-primary border-t-transparent rounded-full mb-2"></div>
        {title && (
          <p className="text-xs text-gray-600 font-medium text-center text-primary ml-1">
            {title}
          </p>
        )}
      </div>
    </div>
  );
}
