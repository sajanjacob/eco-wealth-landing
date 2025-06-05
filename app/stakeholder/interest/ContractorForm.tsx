"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

export default function ContractorForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    portfolioWebsite: "",
    primaryCompetency: "",
    specificSkills: "",
    yearsOfExperience: "",
    toolsTechnologies: "",
    hoursPerWeek: "",
    startDate: "",
    hourlyRate: "",
    saasInterest: "",
    whyContribute: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const competencyOptions = [
    "Frontend Development",
    "Backend Development",
    "Full Stack Development",
    "UI/UX Design",
    "DevOps",
    "Project Management",
    "Quality Assurance",
    "Data Science",
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
      const response = await fetch("/api/stakeholder-interest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stakeholderType: "contractor",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          profileUrl: formData.portfolioWebsite,
          primaryCompetency: formData.primaryCompetency,
          skillsDescription: formData.specificSkills,
          experienceDetails: formData.yearsOfExperience,
          toolsTechnologies: formData.toolsTechnologies,
          availabilityHours: parseInt(formData.hoursPerWeek) || null,
          startDate: formData.startDate,
          rateAmount: formData.hourlyRate,
          interestArea: formData.saasInterest,
          motivation: formData.whyContribute,
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
        portfolioWebsite: "",
        primaryCompetency: "",
        specificSkills: "",
        yearsOfExperience: "",
        toolsTechnologies: "",
        hoursPerWeek: "",
        startDate: "",
        hourlyRate: "",
        saasInterest: "",
        whyContribute: "",
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Personal Information</h2>

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
            htmlFor="portfolioWebsite"
            className="mb-2 block text-sm font-medium"
          >
            Portfolio/Website
          </label>
          <input
            type="url"
            id="portfolioWebsite"
            name="portfolioWebsite"
            value={formData.portfolioWebsite}
            onChange={handleChange}
            className="w-full rounded-lg border p-2"
            placeholder="Enter your portfolio or website URL"
            required
          />
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Area of Competency</h2>

        <div>
          <label
            htmlFor="primaryCompetency"
            className="mb-2 block text-sm font-medium"
          >
            Primary Competency
          </label>
          <select
            id="primaryCompetency"
            name="primaryCompetency"
            value={formData.primaryCompetency}
            onChange={handleChange}
            className="w-full rounded-lg border p-2"
            required
          >
            <option value="">Select your primary competency</option>
            {competencyOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="specificSkills"
            className="mb-2 block text-sm font-medium"
          >
            Specific Skills
          </label>
          <textarea
            id="specificSkills"
            name="specificSkills"
            value={formData.specificSkills}
            onChange={handleChange}
            className="h-32 w-full rounded-lg border p-2"
            placeholder="List your specific skills within the selected competency"
            required
          />
        </div>

        <div>
          <label
            htmlFor="yearsOfExperience"
            className="mb-2 block text-sm font-medium"
          >
            Years of Experience per Skill
          </label>
          <textarea
            id="yearsOfExperience"
            name="yearsOfExperience"
            value={formData.yearsOfExperience}
            onChange={handleChange}
            className="h-32 w-full rounded-lg border p-2"
            placeholder="Specify years of experience for each skill"
            required
          />
        </div>

        <div>
          <label
            htmlFor="toolsTechnologies"
            className="mb-2 block text-sm font-medium"
          >
            Tools/Technologies
          </label>
          <textarea
            id="toolsTechnologies"
            name="toolsTechnologies"
            value={formData.toolsTechnologies}
            onChange={handleChange}
            className="h-32 w-full rounded-lg border p-2"
            placeholder="List relevant tools and technologies"
            required
          />
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Availability</h2>

        <div>
          <label
            htmlFor="hoursPerWeek"
            className="mb-2 block text-sm font-medium"
          >
            Hours per Week
          </label>
          <input
            type="number"
            id="hoursPerWeek"
            name="hoursPerWeek"
            value={formData.hoursPerWeek}
            onChange={handleChange}
            className="w-full rounded-lg border p-2"
            placeholder="Enter hours per week available"
            min="1"
            max="168"
            required
          />
        </div>

        <div>
          <label htmlFor="startDate" className="mb-2 block text-sm font-medium">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full rounded-lg border p-2"
            required
          />
        </div>

        <div>
          <label
            htmlFor="hourlyRate"
            className="mb-2 block text-sm font-medium"
          >
            Hourly/Project Rate
          </label>
          <input
            type="text"
            id="hourlyRate"
            name="hourlyRate"
            value={formData.hourlyRate}
            onChange={handleChange}
            className="w-full rounded-lg border p-2"
            placeholder="Enter your hourly or project rate"
            required
          />
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Areas of Interest</h2>

        <div>
          <label
            htmlFor="saasInterest"
            className="mb-2 block text-sm font-medium"
          >
            SaaS-Related Projects/Tasks
          </label>
          <textarea
            id="saasInterest"
            name="saasInterest"
            value={formData.saasInterest}
            onChange={handleChange}
            className="h-32 w-full rounded-lg border p-2"
            placeholder="Describe SaaS-related projects or tasks you are interested in"
            required
          />
        </div>

        <div>
          <label
            htmlFor="whyContribute"
            className="mb-2 block text-sm font-medium"
          >
            Why Contribute
          </label>
          <textarea
            id="whyContribute"
            name="whyContribute"
            value={formData.whyContribute}
            onChange={handleChange}
            className="h-32 w-full rounded-lg border p-2"
            placeholder="Explain why you are interested in contributing"
            required
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
