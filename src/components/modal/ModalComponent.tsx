import React from 'react';
import {Modal, type ModalProps } from 'antd';

const ModalComponent: React.FC<ModalProps> = ({children, title, open, onOk, onCancel}) => {

  return (
    <>
      <Modal
        title={
          <h1 className='text-xl text-primaryblue-300'>{title || ""}</h1>
        }
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={open}
        onOk={onOk}
        onCancel={onCancel}
        footer={null}
      >
        {children}
      </Modal>
    </>
  );
};

export default ModalComponent;