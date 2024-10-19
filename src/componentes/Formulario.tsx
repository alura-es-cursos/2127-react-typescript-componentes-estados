import { ChangeEvent, FC, FormEvent, useState } from "react";
import ITarea from "../interfaces/ITarea";

interface IFormularioProps {
    onAgregarTarea: (tarea: ITarea) => void;
};

const Formulario: FC<IFormularioProps> = ({ onAgregarTarea }) => {
    const [formData, setFormData] = useState<Omit<ITarea, 'id'>>(
        {
            nombre: '',
            descripcion: '',
            estado: 'Planificado',
            fecha: new Date(),
        }
    )

    const [errores, setErrores] = useState<Partial<Record<keyof ITarea, string>>>({});

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => (
            {
                ...prev,
                [name]: value
            }
        ));
    }

    const validarFormulario = (): boolean => {
        const nuevosErrores: Partial<Record<keyof ITarea, string>> = {};

        if (formData.nombre.trim() == '') {
            nuevosErrores.nombre = 'El nombre es requerido';
        }

        if (formData.descripcion.trim() == '') {
            nuevosErrores.descripcion = 'La descripción es requerida';
        }

        setErrores(nuevosErrores);

        return Object.keys(nuevosErrores).length === 0;
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const nuevaTarea: ITarea = {
            ...formData,
            id: Date.now(),
            fecha: new Date(`${formData.fecha} 00:00:00`)
        }

        if (validarFormulario()) {
            onAgregarTarea(nuevaTarea);
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label className="block text-sm font-medium mb-1">
                    Nombre:
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded`}
                    />

                </label>
                {errores.nombre && <p className="text-red-500 text-sm mt-1">{errores.nombre}</p>}
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">
                    Descripción:
                    <textarea
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded`}
                    />

                </label>
                {errores.descripcion && <p className="text-red-500 text-sm mt-1">{errores.descripcion}</p>}
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">
                    Estado:
                    <select
                        name="estado"
                        value={formData.estado}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="Planificado">Planificado</option>
                        <option value="Ejecución">Ejecución</option>
                        <option value="Finalizado">Finalizado</option>
                    </select>
                </label>
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">
                    Fecha de vencimiento:
                    <input
                        type="date"
                        name="fecha"
                        value={formData.fecha.toString()}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded`}
                    />
                </label>
            </div>

            <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
            >
                Agregar Tarea
            </button>
        </form>
    )
};

export default Formulario;