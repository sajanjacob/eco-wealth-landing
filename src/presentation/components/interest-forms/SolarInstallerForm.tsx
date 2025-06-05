"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

export default function SolarInstallerForm() {
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

    // Solar Specific
    serviceAreas: "",
    installationTypes: [] as string[],
    monthlyInstallations: "",
    certifications: "",

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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      installationTypes: checked
        ? [...prev.installationTypes, name]
        : prev.installationTypes.filter((type) => type !== name),
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
          partnershipType: "solar",
          contactName: formData.contactName,
          contactEmail: formData.contactEmail,
          contactPhone: formData.contactPhone,
          contactTitle: formData.contactTitle,
          companyName: formData.companyName,
          companyWebsite: formData.companyWebsite,
          companyAddress: formData.companyAddress,
          companySize: formData.companySize,
          yearsInBusiness: parseInt(formData.yearsInBusiness) || null,
          serviceAreas: formData.serviceAreas,
          installationTypes: formData.installationTypes,
          monthlyInstallations: parseInt(formData.monthlyInstallations) || null,
          certifications: formData.certifications,
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
        serviceAreas: "",
        installationTypes: [],
        monthlyInstallations: "",
        certifications: "",
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

      {/* Solar Installation Details */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Installation Details</h2>

        <div>
          <label
            htmlFor="serviceAreas"
            className="mb-2 block text-sm font-medium"
          >
            Service Areas
          </label>
          <textarea
            id="serviceAreas"
            name="serviceAreas"
            value={formData.serviceAreas}
            onChange={handleChange}
            className="h-24 w-full rounded-lg border p-2 text-gray-700"
            placeholder="List the areas where you provide installation services"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Installation Types
          </label>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="residential"
                checked={formData.installationTypes.includes("residential")}
                onChange={handleCheckboxChange}
                className="rounded"
              />
              <span>Residential</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="commercial"
                checked={formData.installationTypes.includes("commercial")}
                onChange={handleCheckboxChange}
                className="rounded"
              />
              <span>Commercial</span>
            </label>
          </div>
        </div>

        <div>
          <label
            htmlFor="monthlyInstallations"
            className="mb-2 block text-sm font-medium"
          >
            Average Monthly Installations
          </label>
          <input
            type="number"
            id="monthlyInstallations"
            name="monthlyInstallations"
            value={formData.monthlyInstallations}
            onChange={handleChange}
            className="w-full rounded-lg border p-2 text-gray-700"
            placeholder="Enter average number of monthly installations"
            min="0"
            required
          />
        </div>

        <div>
          <label
            htmlFor="certifications"
            className="mb-2 block text-sm font-medium"
          >
            Certifications
          </label>
          <textarea
            id="certifications"
            name="certifications"
            value={formData.certifications}
            onChange={handleChange}
            className="h-24 w-full rounded-lg border p-2 text-gray-700"
            placeholder="List relevant certifications and licenses"
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
