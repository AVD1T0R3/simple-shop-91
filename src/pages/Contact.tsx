import { Phone, Mail, MapPin, MessageCircle, Clock } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';

// Contact page with clickable links
export default function Contact() {
  // Contact information
  const phoneNumber = '+256700123456';
  const email = 'support@shopeasy.ug';
  const whatsappNumber = '256700123456';
  const whatsappMessage = encodeURIComponent('Hello! I have a question about ShopEasy products.');

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Get in Touch
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Have questions about our products or need help with your order? We're here to help!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact Methods */}
          <div className="space-y-6">
            {/* Phone */}
            <a
              href={`tel:${phoneNumber}`}
              className="flex items-start gap-4 p-6 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow group"
            >
              <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Call Us</h3>
                <p className="text-primary font-medium hover:underline">+256 700 123 456</p>
                <p className="text-sm text-muted-foreground mt-1">Tap to call directly</p>
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${email}`}
              className="flex items-start gap-4 p-6 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow group"
            >
              <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Email Us</h3>
                <p className="text-primary font-medium hover:underline">{email}</p>
                <p className="text-sm text-muted-foreground mt-1">We'll respond within 24 hours</p>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 p-6 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow group"
            >
              <div className="p-3 bg-accent/20 rounded-lg group-hover:bg-accent/30 transition-colors">
                <MessageCircle className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">WhatsApp</h3>
                <p className="text-accent font-medium hover:underline">Chat with us</p>
                <p className="text-sm text-muted-foreground mt-1">Quick responses on WhatsApp</p>
              </div>
            </a>

            {/* Location */}
            <div className="flex items-start gap-4 p-6 bg-card rounded-lg shadow-md">
              <div className="p-3 bg-primary/10 rounded-lg">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Visit Us</h3>
                <p className="text-foreground">Kampala, Uganda</p>
                <p className="text-sm text-muted-foreground mt-1">Main business location</p>
              </div>
            </div>
          </div>

          {/* Business Hours & Additional Info */}
          <div className="space-y-6">
            {/* Business Hours Card */}
            <div className="bg-card rounded-lg p-6 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Business Hours</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monday - Friday</span>
                  <span className="font-medium text-foreground">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Saturday</span>
                  <span className="font-medium text-foreground">9:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sunday</span>
                  <span className="font-medium text-foreground">Closed</span>
                </div>
              </div>
            </div>

            {/* FAQ Quick Links */}
            <div className="bg-card rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold text-foreground mb-4">Common Questions</h3>
              <ul className="space-y-3">
                <li className="text-muted-foreground">
                  <strong className="text-foreground">How do I track my order?</strong><br />
                  Contact us with your order reference and we'll update you.
                </li>
                <li className="text-muted-foreground">
                  <strong className="text-foreground">What payment methods do you accept?</strong><br />
                  We accept MTN Mobile Money and Airtel Money.
                </li>
                <li className="text-muted-foreground">
                  <strong className="text-foreground">How long does delivery take?</strong><br />
                  Typically 2-5 business days within Kampala.
                </li>
              </ul>
            </div>

            {/* Support Note */}
            <div className="bg-primary/10 rounded-lg p-6">
              <p className="text-foreground">
                <strong>Need immediate help?</strong> WhatsApp is the fastest way to reach us for urgent inquiries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
