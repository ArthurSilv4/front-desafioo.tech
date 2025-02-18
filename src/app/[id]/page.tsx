"use client";

import { SectionChallengeId } from "@/components/Layout/Main/ChallengeId/page";
import Main from "@/components/Layout/Main/page";
import { useParams } from "next/navigation";

export default function ChallengeId() {
  const { id } = useParams() as { id: string };

  return (
    <Main>
      <SectionChallengeId id={id} />
    </Main>
  );
}
