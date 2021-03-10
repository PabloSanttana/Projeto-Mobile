const INTIAL_STATE = {
  id: '',
  name: '',
  cpf: '',
  CRM: '',
  type: '',
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        ...action.data,
      };
    case 'LOGOUT':
      return {
        ...state,
        ...INTIAL_STATE,
      };

    default:
      return state;
  }
};
