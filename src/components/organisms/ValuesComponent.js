import React from "react";
import ValuesStyles from "../../../styles/valuescomponent.module.css";
export default function ValuesComponent() {
  return (
    <div className={ValuesStyles.container}>
      <h1> Our Values</h1>
      <h2>1. Be Kind</h2>
      <p>
        We are a community that leads with love. We live this value by making
        sure our comments help, support, and encourage every person that we
        communicate with. Language that does not demonstrate kindness towards
        others will be removed, and the author of the comment will be held
        accountable for their violation of our values. There will be no
        tolerance for objectionable content or abusive users inside the
        Pushquery community.
      </p>
      <h2>2. Be Helpful</h2>
      <p>
        We believe that scholarly research should be open, accessible, and
        encourage participation. Research does not need to exist only steeped in
        dense discipline jargon or locked behind paywalls. Imagine that you are
        discussing your research with a researcher from a different field, or
        maybe you are lucky enough to be presenting to a classroom of school
        children -- how would you explain that new and interesting research
        question you are trying to solve? This is the language we want to
        encourage within the Pushquery community, language that both informs
        your peers and invites newcomers to your field to join the conversation.
      </p>
      <h2>3. Do Your Best </h2>
      <p>
        Learn! Explore! Ask questions. There is no such thing as a dumb question
        in the Pushquery community. Everyone is encouraged to join the
        conversations that are happening in the different Talks. And if you
        would like to get some early feedback on your own Talk, share your
        Talk’s link and invite your lab-mates / colleagues to help you get the
        conversation going.
      </p>
    </div>
  );
}
