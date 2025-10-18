import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
        <Link href="/">
          <Button variant="ghost" className="mb-6 cursor-pointer">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Seatlee
          </Button>
        </Link>

        <div className="prose prose-lavender dark:prose-invert max-w-none">
          <h1 className="font-serif text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>

          <p className="text-muted-foreground text-lg mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">1. Information We Collect</h2>
            <p className="text-foreground/90 leading-relaxed mb-4">
              Seatlee is designed with privacy in mind. We collect minimal information to provide our services:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/90">
              <li>
                <strong>Account Information:</strong> When you create an account, we collect your email address and
                authentication credentials through third-party providers (Google, GitHub).
              </li>
              <li>
                <strong>Event Data:</strong> Guest lists, seating arrangements, and event layouts you create are stored
                locally in your browser.
              </li>
              <li>
                <strong>Usage Data:</strong> We may collect anonymous usage statistics to improve the Service.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">2. How We Use Your Information</h2>
            <p className="text-foreground/90 leading-relaxed mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/90">
              <li>Provide, maintain, and improve the Service</li>
              <li>Authenticate your account and prevent unauthorized access</li>
              <li>Respond to your comments, questions, and customer service requests</li>
              <li>Send you technical notices and support messages</li>
              <li>Monitor and analyze trends, usage, and activities</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">3. Data Storage and Security</h2>
            <p className="text-foreground/90 leading-relaxed">
              Your seating charts and guest lists are stored locally in your browser using localStorage technology. This
              means your data never leaves your device unless you explicitly export it. We implement appropriate
              technical and organizational measures to protect your personal information, but no method of transmission
              over the Internet is 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">4. Third-Party Services</h2>
            <p className="text-foreground/90 leading-relaxed mb-4">
              We use third-party authentication providers for account creation and login:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/90">
              <li>
                <strong>Google OAuth:</strong> Subject to Google's Privacy Policy
              </li>
              <li>
                <strong>GitHub OAuth:</strong> Subject to GitHub's Privacy Policy
              </li>
            </ul>
            <p className="text-foreground/90 leading-relaxed mt-4">
              These services may collect information as described in their respective privacy policies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">5. Data Sharing and Disclosure</h2>
            <p className="text-foreground/90 leading-relaxed mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your information
              only in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/90">
              <li>With your explicit consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights, privacy, safety, or property</li>
              <li>In connection with a merger, acquisition, or sale of assets</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">6. Your Rights and Choices</h2>
            <p className="text-foreground/90 leading-relaxed mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/90">
              <li>Access and update your personal information</li>
              <li>Delete your account and associated data</li>
              <li>Export your data at any time using our export feature</li>
              <li>Opt out of marketing communications</li>
              <li>Request a copy of your data</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">7. Cookies and Tracking</h2>
            <p className="text-foreground/90 leading-relaxed">
              We use localStorage to store your preferences and session information. We do not use tracking cookies for
              advertising purposes. You can clear your browser's localStorage at any time, though this will delete your
              saved seating charts.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">8. Children's Privacy</h2>
            <p className="text-foreground/90 leading-relaxed">
              Seatlee is not intended for children under 13 years of age. We do not knowingly collect personal
              information from children under 13. If you believe we have collected information from a child under 13,
              please contact us immediately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">9. International Data Transfers</h2>
            <p className="text-foreground/90 leading-relaxed">
              Since your data is stored locally in your browser, it remains on your device and is not transferred
              internationally unless you choose to export and share it.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">10. Changes to This Policy</h2>
            <p className="text-foreground/90 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy
              Policy periodically for any changes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">11. Contact Us</h2>
            <p className="text-foreground/90 leading-relaxed">
              If you have any questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <p className="text-foreground/90 leading-relaxed mt-4">
              Email: privacy@seatlee.com
              <br />
              Address: [Your Company Address]
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
