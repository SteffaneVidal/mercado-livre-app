import React from 'react';
import styles from '../styles/ContainerContents.module.scss';

type Props = {
  children: React.ReactNode;
};

function ContainerContents({ children }: Props) {
  return <main className={styles.container}>{children}</main>;
}

export default ContainerContents;
