import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "@/src/presentation/components/global/Header";

export const metadata: Metadata = {
	title: "Eco Wealth",
	description:
		"Eco Wealth is a platform for investing in the environment. Through crowdfunding, carbon credits, and soil health tests & revitalization recommendation plans.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <Header />
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
