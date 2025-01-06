import Image from 'next/image';

export default function Logo() {
  return (
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow">
      <Image
        src="/flaticon.png"
        alt="Logo"
        width={32}
        height={32}
        className="w-6 h-6"
        priority
      />
    </div>
  );
} 