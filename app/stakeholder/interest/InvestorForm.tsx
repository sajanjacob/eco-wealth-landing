"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

export default function InvestorForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedinProfile: "",
    investmentAmount: "",
    areasOfInterest: "",
    whyInvest: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
      const response = await fetch("/api/stakeholder-interest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stakeholderType: "investor",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          profileUrl: formData.linkedinProfile,
          skillsDescription: formData.areasOfInterest,
          rateAmount: formData.investmentAmount,
          motivation: formData.whyInvest,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit application");
      }

      toast.success("Application submitted successfully!");
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        linkedinProfile: "",
        investmentAmount: "",
        areasOfInterest: "",
        whyInvest: "",
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
    <form
      onSubmit={handleSubmit}
      className="space-y-6 [&>div>input]:text-gray-700"
    >
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded-lg border p-2"
          placeholder="Enter your full name"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded-lg border p-2"
          placeholder="Enter your email address"
          required
        />
      </div>

      <div>
        <label htmlFor="phone" className="mb-2 block text-sm font-medium">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full rounded-lg border p-2"
          placeholder="Enter your phone number"
          required
        />
      </div>

      <div>
        <label
          htmlFor="linkedinProfile"
          className="mb-2 block text-sm font-medium"
        >
          LinkedIn Profile
        </label>
        <input
          type="url"
          id="linkedinProfile"
          name="linkedinProfile"
          value={formData.linkedinProfile}
          onChange={handleChange}
          className="w-full rounded-lg border p-2"
          placeholder="Enter your LinkedIn profile URL"
          required
        />
      </div>

      <div>
        <label htmlFor="whyInvest" className="mb-2 block text-sm font-medium">
          Why Invest
        </label>
        <textarea
          id="whyInvest"
          name="whyInvest"
          value={formData.whyInvest}
          onChange={handleChange}
          className="h-32 w-full rounded-lg border p-2"
          placeholder="Share why you are interested in investing"
          required
        />
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
