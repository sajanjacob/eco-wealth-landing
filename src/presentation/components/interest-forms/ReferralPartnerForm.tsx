"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

export default function ReferralPartnerForm() {
  const [formData, setFormData] = useState({
    // Contact Information
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    contactTitle: "",

    // Referral Type
    isCompanyReferral: false,

    // Company Information (Optional)
    companyName: "",
    companyWebsite: "",
    companyAddress: "",
    companySize: "",
    yearsInBusiness: "",

    // Referral Specific
    referralSource: "",
    expectedReferralsMonthly: "",

    // Additional Information
    partnershipGoals: "",
    additionalInfo: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const companySizeOptions = [
    "1-10 employees",
    "11-50 employees",
    "51-200 employees",
    "201-500 employees",
    "500+ employees",
  ];

  const referralSourceOptions = [
    "Real Estate Agent",
    "Financial Advisor",
    "Property Manager",
    "Energy Consultant",
    "Home Services Provider",
    "Community Leader",
    "Other",
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const newValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/partnership-interest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          partnershipType: "referral",
          contactName: formData.contactName,
          contactEmail: formData.contactEmail,
          contactPhone: formData.contactPhone,
          contactTitle: formData.contactTitle,
          isCompanyReferral: formData.isCompanyReferral,
          companyName: formData.isCompanyReferral ? formData.companyName : null,
          companyWebsite: formData.isCompanyReferral
            ? formData.companyWebsite
            : null,
          companyAddress: formData.isCompanyReferral
            ? formData.companyAddress
            : null,
          companySize: formData.isCompanyReferral ? formData.companySize : null,
          yearsInBusiness: formData.isCompanyReferral
            ? parseInt(formData.yearsInBusiness) || null
            : null,
          referralSource: formData.referralSource,
          expectedReferralsMonthly:
            parseInt(formData.expectedReferralsMonthly) || null,
          partnershipGoals: formData.partnershipGoals,
          additionalInfo: formData.additionalInfo,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit application");
      }

      toast.success("Partnership application submitted successfully!");
      // Reset form
      setFormData({
        contactName: "",
        contactEmail: "",
        contactPhone: "",
        contactTitle: "",
        isCompanyReferral: false,
        companyName: "",
        companyWebsite: "",
        companyAddress: "",
        companySize: "",
        yearsInBusiness: "",
        referralSource: "",
        expectedReferralsMonthly: "",
        partnershipGoals: "",
        additionalInfo: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to submit application",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Contact Information */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Contact Information</h2>

        <div>
          <label
            htmlFor="contactName"
            className="mb-2 block text-sm font-medium"
          >
            Name
          </label>
          <input
            type="text"
            id="contactName"
            name="contactName"
            value={formData.contactName}
            onChange={handleChange}
            className="w-full rounded-lg border p-2 text-gray-700"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div>
          <label
            htmlFor="contactEmail"
            className="mb-2 block text-sm font-medium"
          >
            Email
          </label>
          <input
            type="email"
            id="contactEmail"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            className="w-full rounded-lg border p-2 text-gray-700"
            placeholder="Enter your email address"
            required
          />
        </div>

        <div>
          <label
            htmlFor="contactPhone"
            className="mb-2 block text-sm font-medium"
          >
            Phone
          </label>
          <input
            type="tel"
            id="contactPhone"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleChange}
            className="w-full rounded-lg border p-2 text-gray-700"
            placeholder="Enter your phone number"
            required
          />
        </div>

        <div>
          <label
            htmlFor="contactTitle"
            className="mb-2 block text-sm font-medium"
          >
            Job Title
          </label>
          <input
            type="text"
            id="contactTitle"
            name="contactTitle"
            value={formData.contactTitle}
            onChange={handleChange}
            className="w-full rounded-lg border p-2 text-gray-700"
            placeholder="Enter your job title"
            required
          />
        </div>
      </div>

      {/* Referral Type */}
      <div className="space-y-6">
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isCompanyReferral"
              checked={formData.isCompanyReferral}
              onChange={handleChange}
              className="rounded"
            />
            <span>I am representing a company</span>
          </label>
        </div>
      </div>

      {/* Company Information (Conditional) */}
      {formData.isCompanyReferral && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Company Information</h2>

          <div>
            <label
              htmlFor="companyName"
              className="mb-2 block text-sm font-medium"
            >
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full rounded-lg border p-2 text-gray-700"
              placeholder="Enter your company name"
              required={formData.isCompanyReferral}
            />
          </div>

          <div>
            <label
              htmlFor="companyWebsite"
              className="mb-2 block text-sm font-medium"
            >
              Company Website
            </label>
            <input
              type="url"
              id="companyWebsite"
              name="companyWebsite"
              value={formData.companyWebsite}
              onChange={handleChange}
              className="w-full rounded-lg border p-2 text-gray-700"
              placeholder="Enter your company website"
              required={formData.isCompanyReferral}
            />
          </div>

          <div>
            <label
              htmlFor="companyAddress"
              className="mb-2 block text-sm font-medium"
            >
              Company Address
            </label>
            <textarea
              id="companyAddress"
              name="companyAddress"
              value={formData.companyAddress}
              onChange={handleChange}
              className="h-24 w-full rounded-lg border p-2 text-gray-700"
              placeholder="Enter your company address"
              required={formData.isCompanyReferral}
            />
          </div>

          <div>
            <label
              htmlFor="companySize"
              className="mb-2 block text-sm font-medium"
            >
              Company Size
            </label>
            <select
              id="companySize"
              name="companySize"
              value={formData.companySize}
              onChange={handleChange}
              className="w-full rounded-lg border p-2 text-gray-700"
              required={formData.isCompanyReferral}
            >
              <option value="">Select company size</option>
              {companySizeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="yearsInBusiness"
              className="mb-2 block text-sm font-medium"
            >
              Years in Business
            </label>
            <input
              type="number"
              id="yearsInBusiness"
              name="yearsInBusiness"
              value={formData.yearsInBusiness}
              onChange={handleChange}
              className="w-full rounded-lg border p-2 text-gray-700"
              placeholder="Enter years in business"
              min="0"
              required={formData.isCompanyReferral}
            />
          </div>
        </div>
      )}

      {/* Referral Details */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Referral Details</h2>

        <div>
          <label
            htmlFor="referralSource"
            className="mb-2 block text-sm font-medium"
          >
            Referral Source Type
          </label>
          <select
            id="referralSource"
            name="referralSource"
            value={formData.referralSource}
            onChange={handleChange}
            className="w-full rounded-lg border p-2 text-gray-700"
            required
          >
            <option value="">Select your role</option>
            {referralSourceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="expectedReferralsMonthly"
            className="mb-2 block text-sm font-medium"
          >
            Expected Monthly Referrals
          </label>
          <input
            type="number"
            id="expectedReferralsMonthly"
            name="expectedReferralsMonthly"
            value={formData.expectedReferralsMonthly}
            onChange={handleChange}
            className="w-full rounded-lg border p-2 text-gray-700"
            placeholder="Enter expected number of monthly referrals"
            min="0"
            required
          />
        </div>
      </div>

      {/* Additional Information */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Additional Information</h2>

        <div>
          <label
            htmlFor="partnershipGoals"
            className="mb-2 block text-sm font-medium"
          >
            Partnership Goals
          </label>
          <textarea
            id="partnershipGoals"
            name="partnershipGoals"
            value={formData.partnershipGoals}
            onChange={handleChange}
            className="h-32 w-full rounded-lg border p-2 text-gray-700"
            placeholder="Describe your goals for this partnership"
            required
          />
        </div>

        <div>
          <label
            htmlFor="additionalInfo"
            className="mb-2 block text-sm font-medium"
          >
            Additional Information
          </label>
          <textarea
            id="additionalInfo"
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
            className="h-32 w-full rounded-lg border p-2 text-gray-700"
            placeholder="Any additional information you'd like to share"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-primary hover:bg-primary/90 w-full rounded-lg px-4 py-2 text-white transition-colors disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}
