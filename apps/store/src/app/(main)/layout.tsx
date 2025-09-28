import Navbar from "@/features/layout/components/navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container">
      <Navbar />
      {children}
    </div>
  );
}
