import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions as modalActions } from '../../store/modalSlice';
import AddDataFormModal from './AddDataFormModal';
import UpdateDataFormModal from './UpdateDataFormModal';

const ModalWindow = () => {
  const dispatch = useDispatch();
  const modalType = useSelector((state) => state.modals.modalType);
  const data = useSelector((state) => state.modals.data);
  const showModal = useSelector((state) => state.modals.isOpened);

  const handleCloseModal = () => {
    dispatch(modalActions.closeModal());
  };

  switch (modalType) {
    case 'add': {
      return <AddDataFormModal show={showModal} onHide={handleCloseModal} />;
    }
    case 'update': {
      return (
        <UpdateDataFormModal
          show={showModal}
          onHide={handleCloseModal}
          data={data}
        />
      );
    }
    default: {
      return null;
    }
  }
};

export default ModalWindow;
