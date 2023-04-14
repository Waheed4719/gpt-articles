import React from 'react';

type ModalContentProps = {
    children?: React.ReactNode;
};

const ModalContent = ({ children }: ModalContentProps) => {
    return (
        <div className='px-4 py-3 h-[calc(100%-100px)] overflow-auto'>
            {children ?? (
                <div className='h-full flex items-center justify-center'>
                    <h4 className='text-center text-gray-400'>No Content Available</h4>
                </div>
            )}
        </div>
    );
};

export default ModalContent;
