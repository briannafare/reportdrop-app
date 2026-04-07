import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="pt-28 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/"
            className="text-sm text-blue-500 hover:text-blue-600 mb-6 inline-block"
          >
            &larr; Back to home
          </Link>
          <h1 className="text-3xl font-bold text-charcoal mb-8">Privacy Policy</h1>
          <div className="prose prose-gray max-w-none text-gray-600 text-[15px] leading-relaxed space-y-6">
            <p>
              <strong>Effective date:</strong> January 2025
            </p>
            <p>
              ReportDrop (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) operates the
              reportdrop.com website and the ReportDrop application. This page
              informs you of our policies regarding the collection, use, and
              disclosure of personal data when you use our Service and the
              choices you have associated with that data.
            </p>

            <h2 className="text-lg font-semibold text-charcoal !mt-8">Information We Collect</h2>
            <p>
              We collect information you provide directly to us when you create
              an account, generate reports, or contact us for support. This may
              include your name, email address, client names, and report content
              you enter into the tool.
            </p>

            <h2 className="text-lg font-semibold text-charcoal !mt-8">How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Generate and deliver reports on your behalf</li>
              <li>Send you technical notices and support messages</li>
              <li>Process transactions and send related information</li>
            </ul>

            <h2 className="text-lg font-semibold text-charcoal !mt-8">Data Storage</h2>
            <p>
              Report data is stored securely using industry-standard encryption.
              We use Supabase for data storage, which provides enterprise-grade
              security including encryption at rest and in transit.
            </p>

            <h2 className="text-lg font-semibold text-charcoal !mt-8">Third-Party Services</h2>
            <p>
              We may use third-party services that collect, monitor, and analyze
              data to improve our service. These include Stripe for payment
              processing and Resend for email delivery.
            </p>

            <h2 className="text-lg font-semibold text-charcoal !mt-8">Data Retention</h2>
            <p>
              We retain your personal data only for as long as is necessary for
              the purposes set out in this policy. You may request deletion of
              your data at any time by contacting us.
            </p>

            <h2 className="text-lg font-semibold text-charcoal !mt-8">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at privacy@reportdrop.com.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
