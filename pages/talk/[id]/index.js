import React from "react";
import { useRouter } from "next/router";
import Talk from "../../../src/components/organisms/Talk";

export default function TalkPage() {
  const router = useRouter();
  const { id, talk } = router.query;
  console.log( router );

  return <Talk id={id} />;
}
