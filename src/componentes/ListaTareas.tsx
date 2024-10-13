import { FC, useState } from "react";
import './ListaTareas.css';
import ITarea from "../interfaces/ITarea";
import Tarea from "./Tarea";

interface IProps { };


const ListaTareas: FC<IProps> = () => {

    const [filtro, setFiltro] = useState<string>('');
    const [finalizadas, setFinalizadas] = useState<boolean>(false);
    //const [tareas, setTareas] = useState();
    const [tarea] = useState<ITarea>({
        id: 0,
        nombre: 'Nueva tarea',
        descripcion: 'La descripción',
        estado: 'Finalizado',
        fecha: new Date(),
    });

    const [tareas, setTareas] = useState<ITarea[]>([
        {
            id: 1,
            nombre: 'Aprender React + Typescript',
            descripcion: 'Realizar la formación Alura para aprender React + Typescript',
            estado: 'Ejecución',
            fecha: new Date('2024-12-31')
        },
        {
            id: 2,
            nombre: 'Practicar typescript',
            descripcion: 'Practicar el lenguaje',
            estado: 'Finalizado',
            fecha: new Date('2024-09-30')
        },
        {
            id: 3,
            nombre: 'Hacer caminata',
            descripcion: 'Mantener la salud',
            estado: 'Planificado',
            fecha: new Date('2024-12-31')
        },
    ]);

    const tareasFiltradas: ITarea[] = tareas.filter((tarea: ITarea) => {
        return (tarea.nombre.toLowerCase().includes(filtro.toLowerCase()) || filtro === '')
            &&
            (!finalizadas || tarea.estado === 'Finalizado');
    })

    const agregarTarea = () => {
        setTareas([...tareas, tarea]);
    }

    const onFinalizar = (id: Number) => {
        setTareas(prev => prev.map(tarea => tarea.id === id ?
            { ...tarea, estado: 'Finalizado' } : tarea))
    }

    const onEliminar = (id: Number) => {
        setTareas(prev => prev.filter(tarea => tarea.id !== id));
    }

    return (
        <>
            <div>
                <input type="text" value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                    placeholder="Digite para filtrar"
                />
                <label>
                    Mostrar sólo finalizadas:
                    <input type="checkbox" checked={finalizadas}
                        onChange={() => setFinalizadas(!finalizadas)}
                    />
                </label>
            </div>
            <div>
                <button onClick={() => agregarTarea()}>Agregar tarea</button>
            </div>
            <ul id="tasks">
                {
                    tareasFiltradas.map((tarea: ITarea, index: Number) => (
                        <Tarea tarea={tarea}
                            index={index}
                            onFinalizar={onFinalizar}
                            onEliminar={onEliminar}></Tarea>
                    ))
                }
            </ul>
        </>
    )
};

export default ListaTareas;