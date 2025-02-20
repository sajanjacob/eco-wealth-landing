"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
// import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { HomeTemplate } from "@/src/presentation/components/templates/HomeTemplate";
// import { useEnvironmentalStats } from "@/presentation/hooks/useEnvironmentalStats";
// import { setUser } from "@/redux/features/userSlice";

export default function HomePage() {
  const router = useRouter();
  // const user = useAppSelector((state: RootState) => state.user);
  // const dispatch = useAppDispatch();
  // const { treeCount, arrayCount, isLoading } = useEnvironmentalStats();

  // useEffect(() => {
  //   dispatch(setUser({ ...user, loadingUser: false }));
  // }, [user, dispatch]);

  const navigationHandlers = {
    onLogin: () => router.push("/login"),
    onSignup: () => router.push("/signup"),
    onWaitingList: () => router.push("/register"),
    onInvestor: () => router.push("/i/discover"),
    onProducer: () => router.push("/p/projects")
  };

  return (
    <HomeTemplate 
      navigationHandlers={navigationHandlers}
    />
  );
} 