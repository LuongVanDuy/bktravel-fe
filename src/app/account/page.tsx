import Footer from "@/components/Layout/Footer";
import NewsletterForm from "@/components/Common/NewsletterForm";
import AccountContent from "@/components/Account/AccountContent";
import Navbar from "@/components/Layout/Navbar";

export default function AccountPage() {
  return (
    <>
      <Navbar />

      <AccountContent />

      <NewsletterForm />

      <Footer />
    </>
  );
}
