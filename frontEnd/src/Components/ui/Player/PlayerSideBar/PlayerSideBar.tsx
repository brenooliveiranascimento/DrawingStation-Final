import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FiMenu, FiPlayCircle, FiX } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { ClassroomInterface } from '../../../../interfaces/modules/classroomInterface';
import { globalState } from '../../../../interfaces/modules/globalStateInterface';
import { SubModuleInterface } from '../../../../interfaces/modules/ModulesInterface';
import { selectClassroomAction, selectSubModuleAction } from '../../../../redux/actions/classroomControllerActions/ClassroomControllerAciton';
import { selectCurrSubModule } from '../../../../redux/actions/classroomControllerActions/genericActions';
import { localStorageKeys } from '../../../../redux/Types/localStorageTypes';
import styles from './styles.module.scss';
interface playerProps {
  showSidebar: () => void;
  width: number
}

export default function PlayerSideBar({ showSidebar, width }: playerProps) {
  const { subModules, currSubModule, incomplete, loading, classroom, module } = useSelector(({ classroomController }: globalState) => classroomController);
  const { classroomsData } = useSelector(({ classroomsData }: globalState) => classroomsData);
  const [first, setFirst] = useState(true);
  const dispatch = useDispatch();

  const initLastModule = () => {
    if(first) {
      setFirst(false);
      return;
    }
    if(incomplete) return;
    const lastModule = localStorage.getItem(localStorageKeys.lastModule) as string;
    dispatch(selectSubModuleAction(JSON.parse(lastModule)));
  };

  const selectSubModule = (currSubModuleData: {name: string, id: number}) => {
    // if(currSubModule.id === currSubModuleData.id) {
    //   dispatch(selectCurrSubModule({name: currSubModuleData.name, id: currSubModule.id}));
    // } else {
    dispatch(selectCurrSubModule(currSubModuleData));
    // }
  };

  const selectClass = (classInfos: ClassroomInterface) => {
    dispatch(selectClassroomAction(classInfos));
  };

  useEffect(() => {
    initLastModule();
  }, [classroomsData]);

  if(incomplete) {
    return (<h1>Sub module incompleto</h1>);
  }

  if(loading) {
    return (<h1>Carregando!!</h1>);
  }

  return ( 
    <aside className={styles.side_container}>
      <header>
        <span>{module.name} {'>'} {currSubModule.name} {'>'} {classroom.name}</span>
        { width <= 1590 && <section
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'flex-start'
          }}
        >
          <button style={{
            backgroundColor: 'rgba(0,0,0,0.0)',
            border: 'none',
            marginLeft: '95%'
          }} onClick={showSidebar}>
            <FiX size={20} color='white'/>
          </button>
        </section> }
      </header>
      
      {
        subModules.map((currModule: SubModuleInterface) => {
          return (
            <section key={currModule.id}>
              <button 
                style={{
                  backgroundColor: currSubModule.id === currModule.id ? '#2c2937' : '#1e1c25'
                }}
                className={styles.submodule_btn}
                onClick={() => selectSubModule({name: currModule.name, id: currModule.id})}
              >
                {currModule.name}
              </button>
              <section>
                {
                  currModule.classrooms.map((currClassroom: ClassroomInterface, index: number) => {
                    return <button
                      style={{
                        backgroundColor: classroom.id === currClassroom.id ? '#3b3348' : '#1F1C2C',
                      }}
                      className={styles.classroom_btn}
                      onClick={() => selectClass(currClassroom)} key={currClassroom.id}>
                      <section
                        style={{
                          filter: classroom.id === currClassroom.id ? 'brightness(80%)' : 'brightness(50%)'
                        }}
                        className={styles.image_area}
                      >
                        <Image
                          style={{objectFit: 'cover'}}
                          alt={currClassroom.name}
                          height={125}
                          width={600}
                          src={currClassroom.image}
                        />
                      </section>
                      <article>
                        <h1>{currClassroom.name} #{index + 1}</h1>
                        {
                          classroom.id === currClassroom.id &&
                          <FiPlayCircle color='white' size={30} style={{
                            zIndex: 20,
                            marginLeft:-10,
                          }}/>
                        }
                      </article>
                    </button>;
                  })
                }
              </section>
            </section>
          );
        })
      }
    </aside>
  );
}
