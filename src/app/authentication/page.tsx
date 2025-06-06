import Authentication from "@/components/Authentication/Authentication";
import NewsletterForm from "@/components/Common/NewsletterForm";
import PageBannerTitle from "@/components/Common/PageBannerTitle";
import Footer from "@/components/Layout/Footer";
import NavbarSticky from "@/components/Layout/NavbarSticky";

export default function AuthenticationPage() {
  return (
    <>
      <NavbarSticky />
      <PageBannerTitle title="Đăng nhập" homeText="Trang chủ" homeUrl="/" />
      <Authentication />
      <NewsletterForm />
      <Footer />
    </>
  );
}
