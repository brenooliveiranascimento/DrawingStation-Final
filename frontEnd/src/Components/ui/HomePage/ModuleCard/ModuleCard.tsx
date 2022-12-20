import Image from 'next/image';
import Router from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import { ModulesInterface } from '../../../../interfaces/modules/ModulesInterface';
import { handleScreen, setCurrSubmodule } from '../../../../redux/actions/genericActions';
import { serverSideSetupUser } from '../../../../services/setupUser';
import { canSSRAuth } from '../../../../utils/canSSRAuth';
import styles from './styles.module.scss';

interface IModuleCard {
  moduleCard: ModulesInterface;
}

export default function ModuleCard({ moduleCard }: IModuleCard) {
  const dispatch = useDispatch();
  const redirect = () => {
    dispatch(setCurrSubmodule(Number(moduleCard.id)));
    dispatch(handleScreen('Classrooms'));
  };
  const { image, name } = moduleCard;
  return (
    <section className={styles.module_card_container}>
      <Image style={{borderTopLeftRadius: 6, borderTopRightRadius: 6, objectFit: 'cover'}}
        width={250} height={270} src={image} alt={name} />
      <article>
        <h2>{name}</h2>
      </article>
      <button type='button' onClick={redirect}>
        <span>
          Continuar assistindo
        </span>
      </button>
    </section>
  );
}

