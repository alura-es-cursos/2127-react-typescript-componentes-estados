import { FC } from "react";
import ITarea from "../interfaces/ITarea";

interface ITareaProps {
    tarea: ITarea,
    index: Number,
};

const Tarea: FC<ITareaProps> = ({ tarea, index }) => {
    return (
        <li key={index.toString()}>
            <div className="task-header">
                <h3>{tarea.nombre}</h3>
                <div className="task-status">
                    {tarea.estado}
                </div>
            </div>
            <p><strong>Descripción:</strong> {tarea.descripcion}</p>
            <p><strong>Fecha de vencimiento:</strong> {tarea.fecha.toUTCString()}</p>
        </li>
    )
};

export default Tarea;