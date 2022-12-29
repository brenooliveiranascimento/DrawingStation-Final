import React from 'react';
import { useSelector } from 'react-redux';
import { ClassroomInterface } from '../../../interfaces/modules/classroomInterface';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import { ModulesInterface, SubModuleInterface } from '../../../interfaces/modules/ModulesInterface';
import ModuleCard from './ModuleCard';
import ClassCard from './classCard';
import styles from './styles.module.scss';

export default function ModulesScreen() {
  const { modules, subModules: { subModules } } = useSelector((state: globalState) => state);
  console.log(modules);
  return (
    <section className={styles.module_container}>
      <section className={styles.cards_container}>
        <span className={styles.class_name}>Módulos</span>
        <section style={{
          display: 'flex', flexDirection: 'row'
        }}>
          { modules.modules.map((currModule: ModulesInterface) => (
            <ModuleCard moduleCard={currModule} key={currModule.id}/>
          )) }
        </section>
      </section>

      <section className={styles.cards_container}>
        <span className={styles.class_name}>Aulas</span>
        <section style={{
          display: 'flex', flexDirection: 'row'
        }}>
          { subModules.map((currSubModule: SubModuleInterface) => {
            return currSubModule.classrooms.map((currClass: ClassroomInterface) => (
              <ClassCard key={currClass.id} classInf={currClass} subModule={currSubModule.name} />
            ));
          }) }
        </section>
      </section>
    </section>
  );
}
