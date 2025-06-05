"use client";
import Logo from "@/src/presentation/components/global/Logo";
import Link from "next/link";
import React from "react";

const OverviewPage = () => {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {/* Header Section */}
          <section className="relative rounded-lg bg-[url('https://storage.googleapis.com/msgsndr/6xhGkq67K123q2R9TMf0/media/644868002b9d838721622a4d.jpeg')] bg-cover bg-center px-12 pb-36 pt-6">
            <div className="absolute inset-0 rounded-lg bg-black opacity-50"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-end">
                <Logo width={148} height={60} />
              </div>
              <h1 className="mb-6 mt-12 text-4xl font-bold">
                Eco Wealth Platform Overview
              </h1>
              <p className="text-lg leading-relaxed">
                Eco Wealth connects everyday investors with verified sustainable
                agriculture and renewable energy projects, enabling crowdfunded
                investment in environmental initiatives while providing
                producers access to capital and expert guidance. Our platform
                facilitates transparent, long-term investments in farm crops,
                forestry, solar, and wind energy projects.
              </p>
            </div>
          </section>

          {/* What is Eco Wealth Section */}
          <section>
            <h2 className="mb-6 text-3xl font-semibold">What is Eco Wealth?</h2>
            <p className="mb-6 text-lg">
              Eco Wealth is an investment platform specializing in sustainable
              projects across two primary sectors:
            </p>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-lg bg-green-800 p-6">
                <h3 className="mb-4 text-xl font-semibold">
                  Agricultural Projects
                </h3>
                <ul className="list-inside list-disc space-y-2">
                  <li>Crop cultivation and forestry initiatives</li>
                  <li>
                    Crops can vary from vegetables and wheat to cereals and
                    biofuels
                  </li>
                  <li>
                    Forestry can vary from lumber and syrups to fruits and nuts
                  </li>
                </ul>
              </div>
              <div className="rounded-lg bg-amber-400/50 p-6">
                <h3 className="mb-4 text-xl font-semibold">Energy Projects</h3>
                <p className="">
                  Solar and wind renewable energy production and commercial
                  operations
                </p>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section>
            <h2 className="mb-6 text-3xl font-semibold">
              How Eco Wealth Works
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-lg bg-gray-800/50 p-6">
                <h3 className="mb-4 text-xl font-semibold">For Investors</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="mr-2 font-medium">•</span>
                    <span>
                      Discover Projects: Review detailed information about farm
                      and energy initiatives seeking funding
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 font-medium">•</span>
                    <span>
                      Invest Strategically: Purchase digital shares representing
                      ownership stakes in specific projects
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 font-medium">•</span>
                    <span>
                      Lock in Investments: Commit capital until project
                      maturity, with timelines varying by asset type and project
                      scope
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 font-medium">•</span>
                    <span>
                      Earn Returns: Receive cash payouts as projects generate
                      profits in the marketplace
                    </span>
                  </li>
                </ul>
              </div>
              <div className="rounded-lg bg-gray-800/50 p-6">
                <h3 className="mb-4 text-xl font-semibold">For Producers</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="mr-2 font-medium">•</span>
                    <span>
                      Strategic Guidance: Expert advice from our team of
                      finance, agricultural, and energy specialists
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 font-medium">•</span>
                    <span>
                      Capital Access: Funding from our investor network to
                      launch and scale projects
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 font-medium">•</span>
                    <span>
                      Project Management Tools: Financial tracking and investor
                      communication systems
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 font-medium">•</span>
                    <span>
                      Protected Funding: Secure fund management until project
                      reaches maturity
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Verification Process */}
          <section>
            <h2 className="mb-6 text-3xl font-semibold">
              Project Verification Process
            </h2>
            <div className="rounded-lg bg-gray-800/50 p-6">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="mr-2 font-medium">1.</span>
                  <div>
                    <span className="font-medium">Producer Interviews:</span>{" "}
                    Comprehensive discussions with project operators about their
                    experience and capabilities. Includes background checks,
                    property verification, and soil services.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 font-medium">2.</span>
                  <div>
                    <span className="font-medium">Strategy Validation:</span>{" "}
                    Review and confirmation of implementation plans and
                    projected outcomes
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 font-medium">3.</span>
                  <div>
                    <span className="font-medium">Ongoing Oversight:</span>{" "}
                    Monitoring of project progress and financial performance
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* Investment Protection and Risks */}
          <section>
            <h2 className="mb-6 text-3xl font-semibold">
              Investment Protection and Risks
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-lg bg-green-800/50 p-6">
                <h3 className="mb-4 text-xl font-semibold">
                  Investor Protections
                </h3>
                <ul className="list-inside list-disc space-y-2">
                  <li>Fair investment agreements with clear terms</li>
                  <li>Insurance coverage where applicable</li>
                  <li>Established procedures for dispute resolution</li>
                  <li>Ability to sell or transfer digital shares</li>
                </ul>
              </div>
              <div className="rounded-lg bg-red-800/50 p-6">
                <h3 className="mb-4 text-xl font-semibold">
                  Risk Considerations
                </h3>
                <ul className="list-inside list-disc space-y-2">
                  <li>Returns are subject to market conditions</li>
                  <li>Agricultural and energy projects face inherent risks</li>
                  <li>Investments are locked until project maturity</li>
                  <li>Past performance does not guarantee future results</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Development Roadmap */}
          <section>
            <h2 className="mb-6 text-3xl font-semibold">Development Roadmap</h2>
            <div className="rounded-lg bg-blue-800/50 p-6">
              <h3 className="mb-4 text-xl font-semibold">
                Planned Platform Expansions (Next 5 Years)
              </h3>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 font-medium">Carbon Credit Services</h4>
                  <p className="">
                    Individual and group carbon offset acquisition
                  </p>
                </div>
                <div>
                  <h4 className="mb-2 font-medium">Soil Services</h4>
                  <ul className="list-inside list-disc">
                    <li>Testing to collect soil data</li>
                    <li>Remediation strategy assistance</li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-2 font-medium">Enhanced AI Support</h4>
                  <p className="">
                    Generative AI chat with knowledge contribution recognition
                  </p>
                </div>
                <div>
                  <h4 className="mb-2 font-medium">Project Health Tracking</h4>
                  <ul className="list-inside list-disc">
                    <li>Livestream video</li>
                    <li>Soil & atmospheric sensors</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Getting Started */}
          <section>
            <h2 className="mb-6 text-3xl font-semibold">Getting Started</h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-lg bg-gray-800/50 p-6">
                <h3 className="mb-4 text-xl font-semibold">
                  Registration Process
                </h3>
                <ol className="list-inside list-decimal space-y-2">
                  <li>
                    Sign Up:{" "}
                    <Link
                      href="/register"
                      className="font-semibold text-[var(--cta-one)] transition-colors hover:text-[var(--cta-one-hover)]"
                    >
                      Join the waiting list →
                    </Link>
                  </li>
                  <li>Email Verification: Confirm your spot</li>
                  <li>
                    Stay Informed: Keep an eye out for updates and announcements
                  </li>
                  <li>
                    Choose Your Role: Decide to participate as an Investor,
                    Producer, or Partner
                  </li>
                </ol>
              </div>
              <div className="rounded-lg bg-gray-800/50 p-6">
                <h3 className="mb-4 text-xl font-semibold">
                  Partnership Opportunities
                </h3>
                <ul className="list-inside list-disc space-y-2">
                  <li>Residential & Commercial Solar Installer</li>
                  <li>Business Partner</li>
                  <li>Referral Partner</li>
                </ul>
                <div className="mt-4">
                  <Link
                    href="/partner/interest"
                    className="font-semibold text-[var(--cta-one)] transition-colors hover:text-[var(--cta-one-hover)]"
                  >
                    Apply for partnership →
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Footer Note */}
          <section>
            <p className="text-sm italic text-gray-500">
              This overview provides general information about Eco Wealth&apos;s
              platform and services. All investments carry risk, and potential
              investors should carefully review project details and terms before
              committing capital.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
