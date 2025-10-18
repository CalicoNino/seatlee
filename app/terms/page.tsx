import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function TermsPage() {
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
          <h1 className="font-serif text-4xl font-bold text-foreground mb-8">Terms of Service</h1>

          <p className="text-muted-foreground text-lg mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
            <p className="text-foreground/90 leading-relaxed">
              By accessing and using Seatlee ("the Service"), you accept and agree to be bound by the terms and
              provision of this agreement. If you do not agree to these terms, please do not use the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">2. Description of Service</h2>
            <p className="text-foreground/90 leading-relaxed">
              Seatlee provides an online seating chart management tool that allows users to create, organize, and manage
              event seating arrangements. The Service includes features for guest management, table placement, and
              layout customization.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">3. User Accounts</h2>
            <p className="text-foreground/90 leading-relaxed mb-4">
              You may be required to create an account to access certain features of the Service. You are responsible
              for:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/90">
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized use</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">4. User Content</h2>
            <p className="text-foreground/90 leading-relaxed">
              You retain all rights to the content you create using Seatlee, including guest lists, seating
              arrangements, and event layouts. By using the Service, you grant us a limited license to store and display
              your content solely for the purpose of providing the Service to you.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">5. Acceptable Use</h2>
            <p className="text-foreground/90 leading-relaxed mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/90">
              <li>Use the Service for any illegal purpose</li>
              <li>Violate any laws in your jurisdiction</li>
              <li>Infringe upon the rights of others</li>
              <li>Transmit any harmful code or malware</li>
              <li>Attempt to gain unauthorized access to the Service</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">6. Data Storage</h2>
            <p className="text-foreground/90 leading-relaxed">
              Seatlee stores your data locally in your browser using localStorage. We recommend regularly exporting your
              data as backups. We are not responsible for any data loss that may occur.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">7. Limitation of Liability</h2>
            <p className="text-foreground/90 leading-relaxed">
              The Service is provided "as is" without warranties of any kind. We shall not be liable for any indirect,
              incidental, special, consequential, or punitive damages resulting from your use of or inability to use the
              Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">8. Changes to Terms</h2>
            <p className="text-foreground/90 leading-relaxed">
              We reserve the right to modify these terms at any time. We will notify users of any material changes by
              posting the new terms on this page. Your continued use of the Service after such modifications constitutes
              your acceptance of the updated terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">9. Contact Information</h2>
            <p className="text-foreground/90 leading-relaxed">
              If you have any questions about these Terms of Service, please contact us at support@seatlee.com
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
