import {
    GET_USERS_LIST_FULFILLED,
    GET_USERS_LIST_PENDING,
    GET_USERS_LIST_REJECTED,
    POST_USER_PENDING,
    POST_USER_FULFILLED,
    POST_USER_REJECTED,
    DELETE_USER_FULFILLED,
    DELETE_USER_REJECTED,
    UPDATE_USER_PENDING,
    UPDATE_USER_REJECTED,
    UPDATE_USER_FULFILLED,
  } from '../actionTypes/userTypes'
  
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
  
  const users = (state = initialState, action) => {
    switch (action.type) {
      case GET_USERS_LIST_PENDING:
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
      case GET_USERS_LIST_FULFILLED:
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
      case GET_USERS_LIST_REJECTED:
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
      case POST_USER_PENDING:
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
      case POST_USER_FULFILLED:
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
      case POST_USER_REJECTED:
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
      case DELETE_USER_FULFILLED: {
        const data = { ...state.list }
        delete data[action.payload]
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
      case DELETE_USER_REJECTED: {
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
      case UPDATE_USER_PENDING: {
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
      case UPDATE_USER_FULFILLED: {
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
      case UPDATE_USER_REJECTED:
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
  
  export default users
  