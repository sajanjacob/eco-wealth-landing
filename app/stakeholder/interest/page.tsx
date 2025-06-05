"use client";
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import InvestorForm from "./InvestorForm";
import ContractorForm from "./ContractorForm";
import { Toaster } from "react-hot-toast";

export default function StakeholderInterestPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <Toaster position="top-center" />
      <h1 className="mb-8 text-center text-3xl font-bold">
        Apply to Become a Stakeholder
      </h1>

      <Tabs defaultValue="investor" className="w-full">
        <TabsList className="mb-8 grid w-full grid-cols-2 rounded-lg bg-gray-100 p-1">
          <TabsTrigger
            value="investor"
            className="data-[state=active]:text-primary rounded-md px-4 py-2 text-gray-400 transition-all hover:text-green-400 data-[state=active]:cursor-default data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Accredited Investor Application
          </TabsTrigger>
          <TabsTrigger
            value="contractor"
            className="data-[state=active]:text-primary rounded-md px-4 py-2 text-gray-400 transition-all hover:text-green-400 data-[state=active]:cursor-default data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Independent Contributor Application
          </TabsTrigger>
        </TabsList>

        <TabsContent value="investor">
          <InvestorForm />
        </TabsContent>

        <TabsContent value="contractor">
          <ContractorForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
