import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { brand } from "@/config/brand";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header agencyName={brand.agencyName} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
