import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsPage() {
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
          <h1 className="text-3xl font-bold text-charcoal mb-8">Terms of Service</h1>
          <div className="prose prose-gray max-w-none text-gray-600 text-[15px] leading-relaxed space-y-6">
            <p>
              <strong>Effective date:</strong> January 2025
            </p>
            <p>
              These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the
              ReportDrop website and application (&ldquo;Service&rdquo;) operated by
              ReportDrop (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). By accessing or using the
              Service, you agree to be bound by these Terms.
            </p>

            <h2 className="text-lg font-semibold text-charcoal !mt-8">Use of Service</h2>
            <p>
              You may use ReportDrop to create, manage, and send client reports.
              You are responsible for the accuracy of the data you enter and the
              content of reports you generate. You must be at least 18 years old
              to use this service.
            </p>

            <h2 className="text-lg font-semibold text-charcoal !mt-8">Accounts</h2>
            <p>
              When you create an account, you must provide accurate and complete
              information. You are responsible for maintaining the security of
              your account and password. We cannot and will not be liable for
              any loss or damage from your failure to comply with this security
              obligation.
            </p>

            <h2 className="text-lg font-semibold text-charcoal !mt-8">Subscription and Payments</h2>
            <p>
              ReportDrop offers a subscription plan at $29/month. Payment is
              processed through Stripe. You may cancel your subscription at any
              time. Cancellation takes effect at the end of the current billing
              period. No refunds are provided for partial months.
            </p>

            <h2 className="text-lg font-semibold text-charcoal !mt-8">Intellectual Property</h2>
            <p>
              You retain all rights to the content you create using ReportDrop.
              We do not claim ownership of your reports, data, or branding
              materials. The ReportDrop name, logo, and application code are our
              intellectual property.
            </p>

            <h2 className="text-lg font-semibold text-charcoal !mt-8">Limitation of Liability</h2>
            <p>
              ReportDrop is provided &ldquo;as is&rdquo; without warranties of any kind.
              We shall not be liable for any indirect, incidental, special, or
              consequential damages resulting from your use of the service.
            </p>

            <h2 className="text-lg font-semibold text-charcoal !mt-8">Termination</h2>
            <p>
              We may terminate or suspend your access to the Service immediately,
              without prior notice, for conduct that we believe violates these
              Terms or is harmful to other users, us, or third parties, or for
              any other reason.
            </p>

            <h2 className="text-lg font-semibold text-charcoal !mt-8">Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will
              provide notice of material changes by posting the updated Terms on
              this page. Your continued use of the Service after any changes
              constitutes acceptance of the new Terms.
            </p>

            <h2 className="text-lg font-semibold text-charcoal !mt-8">Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at
              legal@reportdrop.com.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
