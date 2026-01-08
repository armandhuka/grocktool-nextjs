import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | GrockTool",
  description:
    "Read the Terms and Conditions governing the use of GrockTool and its online tools.",
};

export default function TermsAndConditionsPage() {
  return (
    <main className="toolnest-bg min-h-screen py-12">
      <div className="toolnest-container">
        <div className="max-w-4xl mx-auto bg-card text-card-foreground rounded-[var(--radius)] border p-6 md:p-10 glass">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 gradient-text">
            Terms & Conditions
          </h1>

          <p className="text-sm text-muted-foreground mb-8">
            Effective Date: {new Date().toLocaleDateString()}
          </p>

          <section className="space-y-6 leading-relaxed text-[15px] md:text-base">
            <p>
              These Terms & Conditions ("Terms") govern your access to and use of
              the GrockTool website (<strong>grocktool.com</strong>). By accessing
              or using the website, you agree to be bound by these Terms.
            </p>

            <h2 className="text-xl font-semibold">1. Use of the Website</h2>
            <p>
              GrockTool provides free online tools for general informational and
              utility purposes. You agree to use the website only for lawful
              purposes and in a way that does not infringe the rights of others.
            </p>

            <h2 className="text-xl font-semibold">2. Intellectual Property</h2>
            <p>
              All content, tools, designs, logos, and text on this website are
              the intellectual property of GrockTool unless otherwise stated.
              You may not copy, reproduce, or redistribute any content without
              prior written permission.
            </p>

            <h2 className="text-xl font-semibold">3. Disclaimer</h2>
            <p>
              All tools and content on GrockTool are provided on an “as is” and
              “as available” basis. We make no warranties regarding accuracy,
              reliability, or availability of the tools.
            </p>

            <h2 className="text-xl font-semibold">4. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, GrockTool shall not be
              liable for any direct, indirect, incidental, or consequential
              damages resulting from the use or inability to use the website or
              its tools.
            </p>

            <h2 className="text-xl font-semibold">5. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not
              responsible for the content, policies, or practices of any
              third-party sites.
            </p>

            <h2 className="text-xl font-semibold">6. User Responsibilities</h2>
            <ul className="list-disc list-inside text-muted-foreground">
              <li>Do not misuse or attempt to disrupt the website</li>
              <li>Do not upload malicious code or harmful content</li>
              <li>Do not attempt unauthorized access to any part of the site</li>
            </ul>

            <h2 className="text-xl font-semibold">7. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Updated
              Terms will be posted on this page and will become effective
              immediately upon posting.
            </p>

            <h2 className="text-xl font-semibold">8. Governing Law</h2>
            <p>
              These Terms shall be governed and interpreted in accordance with
              the laws of your applicable jurisdiction.
            </p>

            <h2 className="text-xl font-semibold">9. Contact Information</h2>
            <p>
              If you have any questions regarding these Terms & Conditions,
              please contact us at:
            </p>

            <p className="font-medium">
              Email:{" "}
              <a
                href="mailto:grocktool@gmail.com"
                className="text-primary underline"
              >
                grocktool@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
