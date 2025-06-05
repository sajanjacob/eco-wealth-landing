"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

export default function BusinessPartnerForm() {
  const [formData, setFormData] = useState({
    // Contact Information
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    contactTitle: "",

    // Company Information
    companyName: "",
    companyWebsite: "",
    companyAddress: "",
    companySize: "",
    yearsInBusiness: "",

    // Business Specific
    businessType: "",
    targetMarket: "",
    valueProposition: "",

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

  const businessTypeOptions = [
    "Technology Provider",
    "Financial Services",
    "Energy Company",
    "Consulting Firm",
    "Marketing Agency",
    "Real Estate",
    "Construction",
    "Other",
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
          partnershipType: "business",
          contactName: formData.contactName,
          contactEmail: formData.contactEmail,
          contactPhone: formData.contactPhone,
          contactTitle: formData.contactTitle,
          companyName: formData.companyName,
          companyWebsite: formData.companyWebsite,
          companyAddress: formData.companyAddress,
          companySize: formData.companySize,
          yearsInBusiness: parseInt(formData.yearsInBusiness) || null,
          businessType: formData.businessType,
          targetMarket: formData.targetMarket,
          valueProposition: formData.valueProposition,
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
        companyName: "",
        companyWebsite: "",
        companyAddress: "",
        companySize: "",
        yearsInBusiness: "",
        businessType: "",
        targetMarket: "",
        valueProposition: "",
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

      {/* Company Information */}
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
            required
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
            required
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
            required
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
            required
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
            required
          />
        </div>
      </div>

      {/* Business Details */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Business Details</h2>

        <div>
          <label
            htmlFor="businessType"
            className="mb-2 block text-sm font-medium"
          >
            Business Type
          </label>
          <select
            id="businessType"
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
            className="w-full rounded-lg border p-2 text-gray-700"
            required
          >
            <option value="">Select business type</option>
            {businessTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="targetMarket"
            className="mb-2 block text-sm font-medium"
          >
            Target Market
          </label>
          <textarea
            id="targetMarket"
            name="targetMarket"
            value={formData.targetMarket}
            onChange={handleChange}
            className="h-32 w-full rounded-lg border p-2 text-gray-700"
            placeholder="Describe your target market and customer base"
            required
          />
        </div>

        <div>
          <label
            htmlFor="valueProposition"
            className="mb-2 block text-sm font-medium"
          >
            Value Proposition
          </label>
          <textarea
            id="valueProposition"
            name="valueProposition"
            value={formData.valueProposition}
            onChange={handleChange}
            className="h-32 w-full rounded-lg border p-2 text-gray-700"
            placeholder="Describe your unique value proposition and how it aligns with our mission"
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
