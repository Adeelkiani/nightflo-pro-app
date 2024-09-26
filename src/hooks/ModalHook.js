import { useState } from "react";

export const MODAL_TYPE = {
  MESSAGE_POPUP: "MessagePopup",
};

const useModal = () => {
  const [{ isVisible, data }, setIsVisible] = useState({
    isVisible: false,
    title: "",
    description: "",
    displayImage: "",
    isTypeError: false,
    promoter: {},
    filterOut: {},
  });

  function getModalData(data, modalType) {
    let _data = {
      title: data.title,
      description: data.description,
      displayImage: data.displayImage,
      isTypeError: data.isTypeError,
    };

    switch (modalType) {
      case MODAL_TYPE.GUEST_LIST_TICKET:
        _data = {
          ..._data,
          hasCompQuota: data?.hasCompQuota ?? false,
          promoter: data?.promoter,
          filterOut: data?.filterOut,
        };
      case MODAL_TYPE.MESSAGE_POPUP:
        return _data;
    }
  }

  const show = (data, modalType) => {
    if (modalType === undefined) {
      throw new Error('The parameter "modalType" is required.');
    }
    setIsVisible({
      isVisible: true,
      data: data ? getModalData(data, modalType) : {},
    });
  };
  const hide = () =>
    setIsVisible({
      isVisible: false,
      title: "",
      description: "",
      displayImage: "",
      isTypeError: false,
      promoter: {},
    });

  return {
    isVisible,
    data,
    show,
    hide,
  };
};

export default useModal;
