import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface InputLoginProps {
    name: string;
    type: string;
    placeholder: string;
    icon: any;
    register: any;
    errors: any;
    action?: () => void; 
}

const InputLogin: React.FC<InputLoginProps> = ({ name, type, placeholder, icon, register, errors, action }) => {
    return (
        <div>
            <div className='flex items-center border-2 border-white rounded-lg px-3 py-2 bg-gray-800'>
                <FontAwesomeIcon icon={icon} className='text-white w-10 cursor-pointer' width={20} onClick={action} />
                <input
                    type={type}
                    placeholder={placeholder}
                    {...register(name)}
                    className='w-full bg-gray-800 text-white focus:outline-none'
                />
            </div>
            {errors[name] && <span className='text-red-500 text-sm'>{errors[name].message}</span>}
        </div>
    );
};

export default InputLogin;
