import { FC } from "react";
import './ListaTareas.css';
import ITarea from "../interfaces/ITarea";
import Tarea from "./Tarea";

interface IProps { };


const ListaTareas: FC<IProps> = () => {
    const tareas: ITarea[] = [
        {
            nombre: 'Aprender React + Typescript',
            descripcion: 'Realizar la formación Alura para aprender React + Typescript',
            estado: 'Ejecución',
            fecha: new Date('2024-12-31')
        },
        {
            nombre: 'Practicar typescript',
            descripcion: 'Practicar el lenguaje',
            estado: 'Finalizado',
            fecha: new Date('2024-09-30')
        },
        {
            nombre: 'Hacer caminata',
            descripcion: 'Mantener la salud',
            estado: 'Planificado',
            fecha: new Date('2024-12-31')
        },
    ];

    return (

        <ul id="tasks">
            {
                tareas.map((tarea: ITarea, index: Number) => (
                    <Tarea tarea={tarea} index={index}></Tarea>
                ))
            }
        </ul>

    )
};

export default ListaTareas;