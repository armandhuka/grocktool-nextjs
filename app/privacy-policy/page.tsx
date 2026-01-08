import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | GrockTool",
  description:
    "Privacy Policy of GrockTool explaining how user data is collected, used, and protected.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="toolnest-bg min-h-screen py-20">
      <div className="toolnest-container">
        <div className="max-w-4xl mx-auto bg-card text-card-foreground rounded-[var(--radius)] border p-6 md:p-10 glass">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 gradient-text">
            Privacy Policy
          </h1>

          <p className="text-sm text-muted-foreground mb-8">
            Effective Date: {new Date().toLocaleDateString()}
          </p>

          <section className="space-y-6 leading-relaxed text-[15px] md:text-base">
            <p>
              GrockTool ("we", "our", "us") respects your privacy. This Privacy
              Policy explains how information is collected, used, and protected
              when you use our website <strong>grocktool.com</strong>.
            </p>

            <h2 className="text-xl font-semibold">1. Information We Collect</h2>
            <p>
              We do not require user registration. Therefore, we generally do not
              collect personal information such as name, email address, or phone
              number unless you voluntarily provide it.
            </p>

            <ul className="list-disc list-inside text-muted-foreground">
              <li>IP address</li>
              <li>Browser type</li>
              <li>Device information</li>
              <li>Pages visited and usage data</li>
            </ul>

            <h2 className="text-xl font-semibold">2. How We Use Information</h2>
            <ul className="list-disc list-inside text-muted-foreground">
              <li>Improve website performance and usability</li>
              <li>Analyze traffic and usage trends</li>
              <li>Fix bugs and maintain security</li>
            </ul>

            <h2 className="text-xl font-semibold">3. Cookies</h2>
            <p>
              GrockTool may use cookies to enhance user experience and analyze
              site traffic. You can disable cookies via your browser settings;
              however, some features may not function properly.
            </p>

            <h2 className="text-xl font-semibold">4. Third-Party Services</h2>
            <p>
              We may use third-party services such as analytics providers. These
              services may collect information in accordance with their own
              privacy policies.
            </p>

            <h2 className="text-xl font-semibold">5. Data Security</h2>
            <p>
              We implement reasonable security measures to protect user data.
              However, no method of transmission over the internet is completely
              secure.
            </p>

            <h2 className="text-xl font-semibold">6. Children’s Privacy</h2>
            <p>
              GrockTool is not intended for children under the age of 13. We do
              not knowingly collect personal information from children.
            </p>

            <h2 className="text-xl font-semibold">7. Policy Updates</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will
              be reflected on this page with an updated effective date.
            </p>

            <h2 className="text-xl font-semibold">8. Contact Us</h2>
            <p>
              If you have any questions regarding this Privacy Policy, you may
              contact us at:
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
