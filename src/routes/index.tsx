import { createFileRoute } from "@tanstack/react-router";
import { HomeContent } from "@/components/site/HomeContent";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "QMEP Electromechanical LLC | Reliable MEP Solutions in Dubai" },
      { name: "description", content: "Professional HVAC, electrical, plumbing and MEP maintenance services for residential and commercial buildings across Dubai." },
      { property: "og:title", content: "QMEP Electromechanical LLC | Reliable MEP Solutions in Dubai" },
      { property: "og:description", content: "HVAC, electrical, plumbing, AMC and MEP maintenance across Dubai." },
    ],
  }),
  component: HomeContent,
});

