import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';
import { globalState } from '../../../../interfaces/modules/globalStateInterface';
import { INotification } from '../../../../interfaces/modules/notificationInterfaces';
import styles from './styles.module.scss';
import {SubModuleInterface} from '../../../../interfaces/modules/ModulesInterface';

interface INotificationCardProps {
  notification: INotification
}

export default function NotificationCard({ notification }: INotificationCardProps) {
  const { active, classData, content, senderData, type } = notification;

  const { subModules } = useSelector(({subModules}:globalState) => subModules);

  const findSubModule = () => {
    return subModules.find((currSubmodule: SubModuleInterface) =>
      currSubmodule.id === classData.subModuleId );
  };
  return (
    <article className={styles.notification_card_container}>
      <aside className={styles.user_side}>
        <section>
          <Image
            height={50}
            width={90}
            alt={classData.name}
            src={senderData.profilePhoto}
          />
          <h1>{senderData.name.split(' ')[0]} respondeu seu comenttário</h1>
        </section>
        <p>{content}</p>
        <span>{active && 'novo!!'}</span>
      </aside>
      <aside className={styles.class_side}>
        <section>
          <h2 className={styles.class_name}>{classData.name}</h2>
          <span>{findSubModule().name}</span>
        </section>
        <Image
          height={100}
          width={100}
          alt={classData.name}
          src={classData.image}
        />
      </aside>
    </article>
  );
}
