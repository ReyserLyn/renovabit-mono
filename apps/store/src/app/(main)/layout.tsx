import Navbar from "@/components/layout/navbar";

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
