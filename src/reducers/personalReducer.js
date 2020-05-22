import {
    GET_PERSONAL_LIST_FULFILLED,
    GET_PERSONAL_LIST_PENDING,
    GET_PERSONAL_LIST_REJECTED,
    POST_PERSONAL_PENDING,
    POST_PERSONAL_FULFILLED,
    POST_PERSONAL_REJECTED,
    DELETE_PERSONAL_FULFILLED,
    DELETE_PERSONAL_REJECTED,
    UPDATE_PERSONAL_PENDING,
    UPDATE_PERSONAL_REJECTED,
    UPDATE_PERSONAL_FULFILLED,
  } from '../actionTypes/personal'
  
  const initialState = {
    list: {},
    status: {
      get: {
        isPending: false,
        isFulfilled: false,
        isRejected: false,
      },
      post: {
        isRejected: false,
      },
      delete: {
        isRejected: false,
      },
    },
  }
  
  const personalInformation = (state = initialState, action) => {
    switch (action.type) {
      case GET_PERSONAL_LIST_PENDING:
        return {
          ...state,
          status: {
            ...state.status,
            get: {
              isPending: true,
              isFulfilled: false,
            },
          },
        }
      case GET_PERSONAL_LIST_FULFILLED:
        console.log(action.payload)
        return {
          ...state,
          list: {
            ...action.payload,
          },
          status: {
            ...state.status,
            get: {
              isPending: false,
              isFulfilled: true,
              isRejected: false,
            },
            post: {
              isFulfilled: false,
              isPending: false,
              isRejected: false,
            },
          },
        }
      case GET_PERSONAL_LIST_REJECTED:
        return {
          ...state,
          status: {
            ...state.status,
            get: {
              isPending: false,
              isFulfilled: false,
              isRejected: true,
            },
          },
        }
      case POST_PERSONAL_PENDING:
        return {
          ...state,
          status: {
            ...state.status,
            post: {
              isFulfilled: false,
              isPending: true,
              isRejected: false,
              error: null,
            },
          },
        };
      case POST_PERSONAL_FULFILLED:
        return {
          ...state,
          status: {
            ...state.status,
            post: {
              isFulfilled: true,
              isPending: false,
              isRejected: false,
              error: null,
            },
          },
          list: {
            ...state.list,
            ...action.payload,
          },
        };
      case POST_PERSONAL_REJECTED:
        return {
          ...state,
          status: {
            ...state.status,
            post: {
              isFulfilled: false,
              isPending: false,
              isRejected: true,
              error: action.payload,
            },
          },
        };
      case DELETE_PERSONAL_FULFILLED: {
        const data = { ...state.list }
        delete data[action.payload]
        console.log('data: ', data);
        return {
          ...state,
          list: data,
          status: {
            ...state.status,
            delete: {
              isRejected: false,
              error: null,
            },
          },
        }
      }
      case DELETE_PERSONAL_REJECTED: {
        return {
          ...state,
          status: {
            ...state.status,
            delete: {
              isRejected: true,
              error: action.payload,
            },
          },
        };
      }
      case UPDATE_PERSONAL_PENDING: {
        return {
          ...state,
          status: {
            ...state.status,
            post: {
              isFulfilled: false,
              isPending: true,
              isRejected: false,
              error: null,
            },
          },
        };
      }
      case UPDATE_PERSONAL_FULFILLED: {
        return {
          ...state,
          status: {
            ...state.status,
            post: {
              isFulfilled: true,
              isPending: false,
              isRejected: false,
              error: null,
            },
          },
          list: {
            ...state.list,
            [action.payload.id]: action.payload,
          },
        };
      }
      case UPDATE_PERSONAL_REJECTED:
        return {
          ...state,
          status: {
            ...state.status,
            post: {
              isFulfilled: false,
              isPending: false,
              isRejected: true,
              error: action.payload,
            },
          },
        };
      default:
        return state
    }
  }
  
  export default personalInformation
  