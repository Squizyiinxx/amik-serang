import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface UploadImageProps {
    name: string;
    label: string;
    value?: string;
}

const UploadImage: React.FC<UploadImageProps> = ({ name, label, value }) => {
    const [preview, setPreview] = useState<string | null>(value || null);
    const [fileName, setFileName] = useState<string>('No file chosen');
    const { setValue } = useFormContext();

    const handleImageChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name);
            setValue(name, file);

            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    }, [name, setValue]);

    useEffect(() => {
        if (value) {
            setFileName(value.split('/').pop() || 'No file chosen');
            setPreview(value);
        }
    }, [value]);

    return (
        <div className="mt-10">
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <div className="relative mt-1 block w-full text-sm text-gray-900">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="flex items-center file:py-3 file:px-4 file:border-0 file:bg-slate-200 file:cursor-pointer file:text-slate-700 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none cursor-pointer py-3 px-4">
                    <button className='mr-2 text-slate-100 bg-blue-500 py-2 px-5 rounded-full'>Choose File</button>
                    <span className="text-gray-500">{fileName}</span>
                </div>
            </div>
            {preview && (
                <div className="mt-4 p-2">
                    <Image
                        src={preview}
                        alt="Selected Preview"
                        width={200}
                        height={200}
                        className="h-32 w-32 object-cover"
                    />
                </div>
            )}
        </div>
    );
};

export default UploadImage;
