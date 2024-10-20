import { ChangeEvent, FormEvent, useState } from "react";
import IFormField from "../interfaces/IFormField";

interface GenericFormProps<T extends object> {
    initialData: T;
    fields: IFormField<T>[];
    onSubmit: (data: T) => void;
    submitButtonText: string
}

type FormErrors<T> = {
    [K in keyof T]?: string;
}

export function FormularioGenerico<T extends object>({
    initialData,
    fields,
    onSubmit,
    submitButtonText = 'Guardar'
}: GenericFormProps<T>) {
    //Definir el componente genérico
    const [formData, setFormData] = useState<T>(initialData);
    const [errores, setErrores] = useState<FormErrors<T>>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => (
            {
                ...prev,
                [name]: value
            }
        ));

        if (errores[name as keyof T]) {
            setErrores(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    }

    const validarFormulario = (): boolean => {
        const nuevoError: FormErrors<T> = {};
        let isValid = true;

        fields.forEach(field => {
            if (field.validation) {
                const error = field.validation(formData[field.name]);
                if (error) {
                    nuevoError[field.name] = error;
                    isValid = false;
                }
            }

        });

        setErrores(nuevoError);
        return isValid;
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validarFormulario()) {
            onSubmit(formData);
        }

    }

    const renderField = (field: IFormField<T>) => {
        const commonProps = {
            name: field.name as string,
            value: formData[field.name] as string,
            onChange: handleChange,
            className: `w-full p-2 border rounded`
        };

        switch (field.type) {
            case 'textarea':
                return <textarea
                    {...commonProps}
                    rows={3}
                />;
            case 'select':
                return <select {...commonProps}>
                    {field.options?.map(option =>
                    (<option key={option} value={option}>
                        {option}
                    </option>
                    ))}
                </select>
            case 'date':
                return <input
                    {...commonProps}
                    type="date"
                />
            default:
                return <input
                    {...commonProps}
                    type={field.type}
                />;
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow">
            {
                fields.map(field => (
                    <div key={field.name as string}>
                        <label className="block text-sm font-medium mb-1">
                            {field.label}
                            {renderField(field)}
                        </label>
                        {errores[field.name] &&
                            <p className="text-red-500 text-sm mt-1">{errores[field.name]}</p>
                        }
                    </div>
                ))
            }
            <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
            >
                {submitButtonText}
            </button>
        </form>
    )
};

