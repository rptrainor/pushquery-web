import React from "react";
import { useRouter } from "next/router";
import SingleTalk from "../../../src/components/organisms/SingleTalk";

export default function TalkPage() {
  const router = useRouter();
  const { id, talk } = router.query;
  console.log( router );

  return <SingleTalk id={id} />;
}
