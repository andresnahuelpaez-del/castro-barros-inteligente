import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <Link href="/" className="mb-8 text-xl font-bold">
        <span className="text-white">Castro Barros</span>{" "}
        <span className="text-neon-green text-glow-green">
          Inteligente<sup className="text-xs">&reg;</sup>
        </span>
      </Link>
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
