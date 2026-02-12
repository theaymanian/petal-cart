import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { MapPin, Phone, Mail } from 'lucide-react';

const FORMSPREE_URL = 'https://formspree.io/f/YOUR_FORM_ID';

export default function Contact() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    try {
      await fetch(FORMSPREE_URL, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      toast.success('Message sent successfully!');
      form.reset();
    } catch {
      toast.error('Failed to send. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-16">
      <h1 className="text-4xl font-serif font-semibold text-center mb-2">Get in Touch</h1>
      <p className="text-center text-muted-foreground mb-12">We'd love to hear from you</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
        <div className="space-y-8">
          {[
            { icon: MapPin, label: 'Visit Us', value: 'Dubai, United Arab Emirates' },
            { icon: Phone, label: 'Call Us', value: '+971 50 123 4567' },
            { icon: Mail, label: 'Email Us', value: 'hello@adamflowers.com' },
          ].map(item => (
            <div key={item.label} className="flex gap-4">
              <div className="w-11 h-11 rounded-full bg-sage-light flex items-center justify-center shrink-0">
                <item.icon size={18} className="text-primary" />
              </div>
              <div>
                <h3 className="font-serif text-sm font-medium">{item.label}</h3>
                <p className="text-sm text-muted-foreground">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="name" placeholder="Your Name" required />
          <Input name="email" type="email" placeholder="Your Email" required />
          <Textarea name="message" placeholder="Your Message" rows={5} required />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </div>
    </div>
  );
}
