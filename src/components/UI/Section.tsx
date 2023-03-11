import React from "react";

import styles from "./Section.module.css";

type SectionProps = {
  children?: React.ReactNode;
};

const Section = function (props: SectionProps): JSX.Element {
  return <section className={styles.section}>{props.children}</section>;
};

export default Section;
