import type { Metadata } from 'next'
import ContactHero from '../components/contact/ContactHero'
import ContactForm from '../components/contact/ContactForm'
import ContactInfo from '../components/contact/ContactInfo'
import SocialLinks from '../components/contact/SocialLinks'
import ToolSuggestions from '../components/contact/ToolSuggestions'

export const metadata: Metadata = {
  title: 'Contact GrockTool - Get in Touch for Support & Tool Suggestions',
  description: 'Contact GrockTool team for support, tool suggestions, partnerships, or feedback. We value your input to improve our 150+ free online tools platform.',
  keywords: 'contact GrockTool, support, tool suggestions, feedback, partnership, technical help, customer service, online tools support',
  authors: [{ name: 'GrockTool' }],
  creator: 'GrockTool',
  publisher: 'GrockTool',
  metadataBase: new URL('https://www.grocktool.com'),
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact GrockTool - Support & Tool Suggestions',
    description: 'Get in touch with GrockTool team for support, feedback, or to suggest new tools for our platform.',
    url: 'https://www.grocktool.com/contact',
    siteName: 'GrockTool',
    images: [
      {
        url: '/images/contact-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact GrockTool - Get Support and Provide Feedback',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact GrockTool - Support & Tool Suggestions',
    description: 'Reach out to GrockTool team for support, feedback, or tool suggestions.',
    images: ['/images/contact-twitter-image.jpg'],
    creator: '@grocktool',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function ContactPage() {
  return (
    <>
      {/* Hidden SEO Content for Search Engines */}
      <div className="sr-only" aria-hidden="true">
        <h1>Contact GrockTool - Support, Feedback & Tool Suggestions</h1>
        
        <h2>Get in Touch with Our Team</h2>
        <p>
          We value your feedback and are here to help! Contact the GrockTool team for technical support, 
          tool suggestions, partnership inquiries, or general feedback about our platform. Your input 
          helps us improve and expand our collection of 150+ free online tools.
        </p>

        <h3>How Can We Help You?</h3>
        <ul>
          <li><strong>Technical Support:</strong> Get help with using our tools or report technical issues</li>
          <li><strong>Tool Suggestions:</strong> Recommend new tools you'd like to see on our platform</li>
          <li><strong>Feature Requests:</strong> Suggest improvements to existing tools</li>
          <li><strong>Bug Reports:</strong> Report any problems or errors you encounter</li>
          <li><strong>Partnership Opportunities:</strong> Explore collaboration possibilities</li>
          <li><strong>General Feedback:</strong> Share your thoughts about our platform</li>
          <li><strong>Business Inquiries:</strong> Contact us for business-related matters</li>
        </ul>

        <h3>Contact Information</h3>
        <p>
          <strong>Email:</strong> support@grocktool.com<br/>
          <strong>Response Time:</strong> Within 24 hours<br/>
          <strong>Availability:</strong> Monday - Friday, 9:00 AM - 6:00 PM IST
        </p>

        <h3>Why Contact Us?</h3>
        <ul>
          <li><strong>Quick Support:</strong> Get prompt assistance from our technical team</li>
          <li><strong>Tool Development:</strong> Your suggestions directly influence new tool development</li>
          <li><strong>Platform Improvement:</strong> Help us make GrockTool better for everyone</li>
          <li><strong>Community Building:</strong> Join our growing community of tool users</li>
          <li><strong>Problem Resolution:</strong> We're committed to fixing issues quickly</li>
        </ul>

        <h3>What to Include in Your Message</h3>
        <ul>
          <li><strong>Clear Subject:</strong> Briefly describe the purpose of your message</li>
          <li><strong>Detailed Description:</strong> Provide comprehensive information about your inquiry</li>
          <li><strong>Tool Name:</strong> Mention specific tools if related to technical issues</li>
          <li><strong>Steps to Reproduce:</strong> For bugs, include steps to recreate the issue</li>
          <li><strong>Contact Information:</strong> Ensure we can reach you for follow-up</li>
        </ul>

        <h3>Common Contact Reasons</h3>
        <ul>
          <li><strong>Tool Not Working:</strong> Report malfunctioning tools or features</li>
          <li><strong>New Tool Idea:</strong> Suggest utilities you need but can't find</li>
          <li><strong>Feature Enhancement:</strong> Recommend improvements to existing tools</li>
          <li><strong>Performance Issues:</strong> Report slow loading or performance problems</li>
          <li><strong>Mobile Experience:</strong> Feedback on mobile device compatibility</li>
          <li><strong>Content Suggestions:</strong> Ideas for tutorials or documentation</li>
        </ul>

        <h3>Our Commitment to You</h3>
        <ul>
          <li><strong>Quick Response:</strong> We aim to respond within 24 hours</li>
          <li><strong>Thorough Investigation:</strong> We thoroughly investigate all reported issues</li>
          <li><strong>Regular Updates:</strong> Keep you informed about issue resolution progress</li>
          <li><strong>Feature Consideration:</strong> All tool suggestions are carefully reviewed</li>
          <li><strong>Privacy Respect:</strong> Your contact information remains confidential</li>
        </ul>

        <h3>Alternative Support Options</h3>
        <ul>
          <li><strong>FAQ Section:</strong> Check our Frequently Asked Questions for quick answers</li>
          <li><strong>Tool Documentation:</strong> Each tool includes usage instructions and examples</li>
          <li><strong>Community Forum:</strong> Connect with other GrockTool users (coming soon)</li>
          <li><strong>Social Media:</strong> Reach out through our social media channels</li>
        </ul>

        <h3>Tool Suggestion Process</h3>
        <p>
          When you suggest a new tool, our team evaluates it based on user demand, technical feasibility, 
          and alignment with our platform vision. Popular suggestions are prioritized for development 
          and added to our roadmap.
        </p>

        <h3>Response Time Expectations</h3>
        <ul>
          <li><strong>Technical Support:</strong> 24-48 hours response time</li>
          <li><strong>Tool Suggestions:</strong> Acknowledgement within 24 hours, evaluation within 1 week</li>
          <li><strong>Bug Reports:</strong> Initial response within 24 hours, resolution timeline provided</li>
          <li><strong>General Inquiries:</strong> Response within 24 hours</li>
          <li><strong>Partnership Requests:</strong> Response within 48 hours</li>
        </ul>

        <h3>Privacy and Data Handling</h3>
        <p>
          We respect your privacy and handle all contact information confidentially. Your email and 
          personal details are used solely for responding to your inquiry and are never shared with 
          third parties without your explicit consent.
        </p>

        <h3>Follow Us for Updates</h3>
        <p>
          Stay connected with GrockTool through our social media channels to get updates about new tools, 
          platform improvements, and community news. We regularly share tips and tutorials to help you 
          get the most out of our tools.
        </p>

        <p>
          <strong>We're here to help and value your contribution to making GrockTool better. 
          Don't hesitate to reach out with any questions, suggestions, or feedback. Your input 
          directly shapes the future of our platform and helps us serve the community better.</strong>
        </p>
      </div>

      {/* Main Visible Content */}
      <div className="min-h-screen bg-toolnest-bg font-inter">
        <ContactHero />
        
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Contact Form - Takes 2/3 width on large screens */}
              <div className="lg:col-span-2">
                <ContactForm />
              </div>

              {/* Sidebar */}
              <div className="space-y-6 lg:space-y-8">
                <ContactInfo />
                <SocialLinks />
                <ToolSuggestions />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Structured Data for Contact Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact GrockTool",
            "description": "Contact GrockTool team for support, tool suggestions, feedback, and partnership inquiries",
            "url": "https://www.grocktool.com/contact",
            "mainEntity": {
              "@type": "Organization",
              "name": "GrockTool",
              "description": "Free online tools platform providing 150+ utilities for developers, designers, and creators",
              "url": "https://www.grocktool.com",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer support",
                "email": "support@grocktool.com",
                "availableLanguage": "English",
                "areaServed": "Worldwide",
                "hoursAvailable": {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "09:00",
                  "closes": "18:00",
                  "timeZone": "Asia/Kolkata"
                }
              }
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://www.grocktool.com"
                },
                {
                  "@type": "ListItem", 
                  "position": 2,
                  "name": "Contact",
                  "item": "https://www.grocktool.com/contact"
                }
              ]
            }
          })
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "GrockTool",
            "url": "https://www.grocktool.com",
            "logo": "https://www.grocktool.com/logo.png",
            "description": "Free online tools platform providing 150+ utilities for developers, designers, and creators worldwide",
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer support",
              "email": "support@grocktool.com",
              "availableLanguage": ["English"],
              "areaServed": "Worldwide"
            },
            "sameAs": [
              "https://twitter.com/grocktool",
              "https://github.com/grocktool",
              "https://linkedin.com/company/grocktool"
            ]
          })
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How long does it take to get a response from GrockTool support?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We aim to respond to all inquiries within 24 hours. Technical support requests typically receive a response within 24-48 hours, while tool suggestions are acknowledged within 24 hours and evaluated within one week."
                }
              },
              {
                "@type": "Question",
                "name": "Can I suggest new tools for GrockTool?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! We actively encourage tool suggestions from our users. All suggestions are carefully reviewed based on user demand, technical feasibility, and alignment with our platform vision. Popular suggestions are prioritized for development."
                }
              },
              {
                "@type": "Question",
                "name": "What information should I include when reporting a bug?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "When reporting a bug, please include: the specific tool name, detailed description of the issue, steps to reproduce the problem, your browser and device information, and any error messages you encountered. This helps us quickly identify and resolve the issue."
                }
              },
              {
                "@type": "Question",
                "name": "Is there a cost for using GrockTool support?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No, all GrockTool support services are completely free, just like our tools. We provide free technical support, handle tool suggestions, and address all user inquiries without any charges."
                }
              },
              {
                "@type": "Question",
                "name": "What are GrockTool's support hours?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our support team is available Monday through Friday, 9:00 AM to 6:00 PM IST (Indian Standard Time). However, you can contact us anytime through our contact form, and we'll respond during the next business day."
                }
              }
            ]
          })
        }}
      />
    </>
  )
}