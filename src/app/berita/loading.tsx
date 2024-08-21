import React from 'react';
import { ClipLoader } from 'react-spinners';

interface LoadingProps {
    cls?: string;
}

const Loading = ({cls}:LoadingProps)  => {
    return (
        <div  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} className={cls}>
            <ClipLoader color="#36d7b7" size={50} />
        </div>
    );
};

export default Loading;
