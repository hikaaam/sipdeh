const inital_state = {
  peraturan: null,
};

export const peraturan = (state = inital_state, action) => {
  switch (action?.type) {
    case 'PersistPeraturan':
      return {...state, peraturan: action?.payload ?? state?.peraturan};
    default:
      return state;
  }
};
