import { createFileRoute } from "@tanstack/react-router";
import { EvnDemo } from "@/components/demo/evn-demo";

export const Route = createFileRoute("/")({
  component: EvnDemo,
});
