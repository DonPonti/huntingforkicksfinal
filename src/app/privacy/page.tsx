import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Protocol | Hunting For Kicks",
  description: "Data handling and user privacy protocols.",
};

export default function PrivacyPolicy() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 md:py-20 min-h-screen">
      
      {/* HEADER */}
      <header className="mb-16 border-b-4 border-black pb-8">
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-6">
          PRIVACY<br />PROTOCOL
        </h1>
        <p className="font-mono text-xs uppercase tracking-widest max-w-xl">
          Effective Date: January 2026 <br />
          Status: Active
        </p>
      </header>

      {/* CONTENT */}
      <div className="prose prose-lg max-w-none font-sans text-black prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-p:leading-relaxed">
        
        <p className="font-mono text-sm border-l-4 border-black pl-4 bg-gray-100 p-4 mb-12">
          At <strong>Hunting For Kicks</strong>, we prioritize data minimalism. We only collect what is necessary to improve the utility of our tools and the quality of our archive.
        </p>

        <h3>1. Data Collection</h3>
        <p>
          We collect information to provide better services to all our users. This includes:
        </p>
        <ul>
          <li><strong>Log Data:</strong> Like most websites, we collect information that your browser sends whenever you visit our Service ("Log Data"). This may include your computer's Internet Protocol ("IP") address, browser type, browser version, and the pages of our Service that you visit.</li>
          <li><strong>Cookies:</strong> We use cookies to store information about your preferences and to record user-specific information on visits to pages.</li>
        </ul>

        <h3>2. Analytics</h3>
        <p>
          We use third-party Service Providers, such as <strong>Google Analytics</strong>, to monitor and analyze the use of our Service. Google Analytics tracks and reports website traffic. This data is shared with other Google services. Google may use the collected data to contextualize and personalize the ads of its own advertising network.
        </p>

        <h3>3. Advertising</h3>
        <p>
          We may use third-party Service Providers (such as Google AdSense) to show advertisements to you to help support and maintain our Service. These providers may use cookies to serve ads based on your prior visits to our website or other websites.
        </p>

        <h3>4. Security</h3>
        <p>
          The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.
        </p>

        <h3>5. Contact Protocol</h3>
        <p>
          If you have any questions about this Privacy Policy, please contact us via email:
        </p>
        <p className="font-mono text-xl font-bold bg-black text-white inline-block px-2 py-1">
          admin@huntingforkicks.com
        </p>

      </div>

      {/* FOOTER LINK */}
      <div className="mt-20 pt-8 border-t border-black">
        <Link href="/" className="font-mono text-xs uppercase hover:bg-black hover:text-white px-2 py-1 transition-colors">
          ← Return to Base
        </Link>
      </div>

    </main>
  );
}