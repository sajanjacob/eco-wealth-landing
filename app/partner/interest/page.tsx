"use client";
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Toaster } from "react-hot-toast";
import SolarInstallerForm from "@/src/presentation/components/interest-forms/SolarInstallerForm";
import BusinessPartnerForm from "@/src/presentation/components/interest-forms/BusinessPartnerForm";
import ReferralPartnerForm from "@/src/presentation/components/interest-forms/ReferralPartnerForm";

export default function PartnershipInterestPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <Toaster position="top-center" />
      <h1 className="mb-8 text-center text-3xl font-bold">
        Partnership Opportunities
      </h1>

      <Tabs defaultValue="solar" className="w-full">
        <TabsList className="mb-8 grid w-full grid-cols-3 rounded-lg bg-gray-100 p-1">
          <TabsTrigger
            value="solar"
            className="data-[state=active]:text-primary rounded-md px-4 py-2 text-gray-400 transition-all hover:text-green-400 data-[state=active]:cursor-default data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Solar Installer
          </TabsTrigger>
          <TabsTrigger
            value="business"
            className="data-[state=active]:text-primary rounded-md px-4 py-2 text-gray-400 transition-all hover:text-green-400 data-[state=active]:cursor-default data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Business Partner
          </TabsTrigger>
          <TabsTrigger
            value="referral"
            className="data-[state=active]:text-primary rounded-md px-4 py-2 text-gray-400 transition-all hover:text-green-400 data-[state=active]:cursor-default data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Referral Partner
          </TabsTrigger>
        </TabsList>

        <TabsContent value="solar">
          <SolarInstallerForm />
        </TabsContent>

        <TabsContent value="business">
          <BusinessPartnerForm />
        </TabsContent>

        <TabsContent value="referral">
          <ReferralPartnerForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
