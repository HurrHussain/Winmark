import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useInquiry } from '@/hooks/InquiryContext';

export function ContactPage() {
  const [searchParams] = useSearchParams();
  const { clearItems } = useInquiry();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    inquiryType: '',
    message: '',
    website: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const message = searchParams.get('message');
    if (message) {
      setFormData(prev => ({
        ...prev,
        message: message,
        inquiryType: 'Bulk Ingredients'
      }));
      clearItems();
    }
  }, [searchParams, clearItems]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const sanitizeInput = (str: string) => {
        if (typeof str !== 'string') return '';
        return str.replace(/<[^>]*>?/gm, '');
      };

      const sanitizedData = {
        firstName: sanitizeInput(formData.firstName),
        lastName: sanitizeInput(formData.lastName),
        email: sanitizeInput(formData.email),
        companyName: sanitizeInput(formData.companyName),
        inquiryType: sanitizeInput(formData.inquiryType),
        message: sanitizeInput(formData.message),
        website: sanitizeInput(formData.website)
      };

      // Points directly to your live server so you can test from your local PC
      const apiUrl = 'https://winmarkingredients.com/contact.php';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedData)
      });

      const data = await response.json();

      if (data.status === 'success') {
        setIsSuccess(true);
      } else {
        setErrorMsg('Server error: ' + (data.message || 'Please try again.'));
      }
    } catch (error) {
      setErrorMsg('Could not connect to the mail server. Please try again or contact us directly via phone.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 flex justify-center items-start md:items-center pt-20 md:pt-28">
      <div className="max-w-5xl w-full bg-white rounded-xl shadow-2xl p-5 sm:p-8 md:p-12">

        <div className="mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3">Contact Winmark</h1>
          <p className="text-gray-600 max-w-2xl">
            Connect with our regional offices to discuss enterprise solutions, supply chain integration, or to schedule a consultation with our industrial specialists.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">

          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Direct Inquiry</h2>

            {isSuccess ? (
              <div className="bg-teal-50 border border-teal-200 rounded-lg p-8 text-center">
                <svg className="w-16 h-16 text-teal-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <h3 className="text-2xl font-bold text-[#0f172a] mb-2">Success!</h3>
                <p className="text-gray-600">We received your inquiry at {formData.email}.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">First Name</label>
                    <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full border border-gray-300 rounded p-2.5 text-sm focus:ring-teal-500 focus:border-teal-500 outline-none" placeholder="Enter first name" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Last Name</label>
                    <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full border border-gray-300 rounded p-2.5 text-sm focus:ring-teal-500 focus:border-teal-500 outline-none" placeholder="Enter last name" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Corporate Email</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 rounded p-2.5 text-sm focus:ring-teal-500 focus:border-teal-500 outline-none" placeholder="name@company.com" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Company Name</label>
                  <input required type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full border border-gray-300 rounded p-2.5 text-sm focus:ring-teal-500 focus:border-teal-500 outline-none" placeholder="Enter company name" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Inquiry Type</label>
                  <select required name="inquiryType" value={formData.inquiryType} onChange={handleChange} className="w-full border border-gray-300 rounded p-2.5 text-sm focus:ring-teal-500 focus:border-teal-500 outline-none bg-white">
                    <option value="" disabled>Select an option</option>
                    <option value="Bulk Ingredients">Bulk Ingredients Orders</option>
                    <option value="Technical Support">Technical Support & R&D</option>
                    <option value="Logistics">Logistics & Distribution</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div style={{ display: 'none' }} aria-hidden="true">
                  <label>Website (Do not fill)</label>
                  <input autoComplete="off" type="text" name="website" value={formData.website} onChange={handleChange} tabIndex={-1} />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Message</label>
                  <textarea required name="message" value={formData.message} onChange={handleChange} rows={4} className="w-full border border-gray-300 rounded p-2.5 text-sm focus:ring-teal-500 focus:border-teal-500 outline-none" placeholder="How can we assist your operations?"></textarea>
                </div>

                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-100 rounded flex items-start gap-3">
                    <span className="text-red-500">⚠️</span>
                    <p className="text-red-600 text-xs font-bold leading-tight">{errorMsg}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-winmark-dark hover:bg-winmark text-white font-bold py-3 px-4 rounded transition-colors uppercase tracking-wider text-sm disabled:opacity-50 shadow-lg"
                >
                  {isSubmitting ? 'Sending...' : 'Submit Inquiry →'}
                </button>
              </form>
            )}
          </div>

          <div className="space-y-6">
            <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="h-32 bg-gray-200 relative group overflow-hidden">
                <img src="/img-services/office.png" alt="Karachi Office" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute bottom-0 left-0 bg-black bg-opacity-60 text-white px-4 py-1 text-sm font-bold tracking-wider">KARACHI HQ</div>
              </div>
              <div className="p-5 bg-gray-50 space-y-4">
                <a href="https://maps.google.com/?q=Industrial+Area,+SITE,+Karachi,+Pakistan" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group/link cursor-pointer">
                  <MapPin className="text-teal-700 w-5 h-5 shrink-0 mt-0.5 group-hover/link:scale-110 transition-transform" />
                  <p className="text-sm text-gray-600 group-hover/link:text-teal-700 transition-colors">Industrial Area, SITE, Karachi<br />Pakistan</p>
                </a>
                <a href="tel:+923202890846" className="flex items-center gap-3 group/link cursor-pointer">
                  <Phone className="text-teal-700 w-5 h-5 shrink-0 group-hover/link:scale-110 transition-transform" />
                  <p className="text-sm text-gray-600 group-hover/link:text-teal-700 transition-colors">+92 320 2890846</p>
                </a>
                <a href="mailto:info@winmarkingredients.com" className="flex items-center gap-3 group/link cursor-pointer">
                  <Mail className="text-teal-700 w-5 h-5 shrink-0 group-hover/link:scale-110 transition-transform" />
                  <p className="text-sm text-gray-600 group-hover/link:text-teal-700 transition-colors break-all">info@winmarkingredients.com</p>
                </a>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="h-32 bg-gray-200 relative group overflow-hidden">
                <img src="/img-services/warehouse2.png" alt="Lahore Branch" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute bottom-0 left-0 bg-black bg-opacity-60 text-white px-4 py-1 text-sm font-bold tracking-wider">LAHORE BRANCH</div>
              </div>
              <div className="p-5 bg-gray-50 space-y-4">
                <a href="https://maps.google.com/?q=Industrial+Zone,+Lahore,+Pakistan" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group/link cursor-pointer">
                  <MapPin className="text-teal-700 w-5 h-5 shrink-0 mt-0.5 group-hover/link:scale-110 transition-transform" />
                  <p className="text-sm text-gray-600 group-hover/link:text-teal-700 transition-colors">Industrial Zone, Lahore<br />Pakistan</p>
                </a>
                <a href="tel:+923202890846" className="flex items-center gap-3 group/link cursor-pointer">
                  <Phone className="text-teal-700 w-5 h-5 shrink-0 group-hover/link:scale-110 transition-transform" />
                  <p className="text-sm text-gray-600 group-hover/link:text-teal-700 transition-colors">+92 320 2890846</p>
                </a>
                <a href="mailto:info@winmarkingredients.com" className="flex items-center gap-3 group/link cursor-pointer">
                  <Mail className="text-teal-700 w-5 h-5 shrink-0 group-hover/link:scale-110 transition-transform" />
                  <p className="text-sm text-gray-600 group-hover/link:text-teal-700 transition-colors break-all">info@winmarkingredients.com</p>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}