import { storage } from "@/utils/storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { OnboardingFour, OnboardingOne, OnboardingThree, OnboardingTwo } from "./(onboarding)/screens";

export default function OnboardingScreen() {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const handleNext = () => setStep((prev) => prev + 1);
  
  const handleDotPress = (targetStep: number) => {
    setStep(targetStep);
  };
  
  const handleFinish = async () => {
    try {
      // Mark onboarding as completed
      await storage.setHasSeenOnboarding(true);
      // Navigate to login
      router.replace("/(auth)/login");
    } catch (error) {
      console.error("Error completing onboarding:", error);
      // Navigate anyway
      router.replace("/(auth)/login");
    }
  };

  switch (step) {
    case 1:
      return <OnboardingOne onNext={handleNext} onDotPress={handleDotPress} />;
    case 2:
      return <OnboardingTwo onNext={handleNext} onDotPress={handleDotPress} />;
    case 3:
      return <OnboardingThree onNext={handleNext} onDotPress={handleDotPress} />;
    case 4:
      return <OnboardingFour onFinish={handleFinish} onDotPress={handleDotPress} />;
    default:
      return <OnboardingOne onNext={handleNext} onDotPress={handleDotPress} />;
  }
}
