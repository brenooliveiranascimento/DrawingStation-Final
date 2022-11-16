/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import React from 'react';
import { ClassroomInterface } from '../../../../interfaces/modules/classroomInterface';
import { ModulesInterface } from '../../../../interfaces/modules/ModulesInterface';
import styles from './styles.module.scss';

interface ModuleCardProps {
  classroom: ClassroomInterface;
  handleModal: () => void;
  handleModule: (classroom: ClassroomInterface) => void
}

function ClassroomCard({ classroom, handleModal, handleModule }: ModuleCardProps) {

  const selectModule = () => {
    handleModule(classroom);
    handleModal();
  };

  return (
    <button onClick={selectModule} className={styles.card_container}>
      <section>
        <Image
          style={{ objectFit: 'cover', justifyItems:'flex-start' }}
          width={260}
          height={300}
          sizes={'auto'}
          src={`${classroom.image}`}
          alt={`${classroom.name}`}
        />
      </section>
      <section className={styles.inf_area}>
        <article>
          <h1>{classroom.name}</h1>
        </article>
      </section>
    </button>
  );
}

export default ClassroomCard;