import React from 'react';
import { ClipLoader } from 'react-spinners';

const Loading = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <ClipLoader color="#36d7b7" size={50} />
        </div>
    );
};

export default Loading;
