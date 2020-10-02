const initialState = {};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case "typeName":
      return { ...state };

    default:
      return state;
  }
};
