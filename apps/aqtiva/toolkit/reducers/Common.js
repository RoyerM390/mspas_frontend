import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  GET_DATA,
  HIDE_MESSAGE,
  HIDE_PDF,
  SET_DEPARTAMENTOS,
  SET_FILTER,
  SET_ONLINE,
  SET_PAGINATION,
  SHOW_MESSAGE,
  SHOW_PDF,
  TOGGLE_APP_DRAWER,
  UPDATING_CONTENT,
} from '@aqtiva/constants/ActionTypes';
import { createReducer } from '@reduxjs/toolkit';

const INIT_STATE = {
  error: '',
  loading: false,
  isAppDrawerOpen: false,
  updatingContent: false,
  showPdf: false,
  departamentos: [],
  blob: null,
  message: '',
  online: false,
  pagination: {
    total: 1,
    perPage: 1,
    currentPage: 1,
  },
  filters: {
    search: '',
  },
};
// import { message }
const commonReducer = createReducer(INIT_STATE, (builder) => {
  builder
    .addCase(FETCH_START, (state, action) => {
      state.error = '';
      state.message = '';
      state.loading = true;
    })
    .addCase(UPDATING_CONTENT, (state, action) => {
      state.error = '';
      state.message = '';
      state.updatingContent = true;
    })
    .addCase(FETCH_SUCCESS, (state, action) => {
      state.error = '';
      state.message = '';
      state.loading = false;
      state.updatingContent = false;
    })
    .addCase(SHOW_MESSAGE, (state, action) => {
      state.error = '';
      state.message = action.payload;
      state.loading = false;
      state.updatingContent = false;
    })
    .addCase(FETCH_ERROR, (state, action) => {
      state.error = action.payload;
      state.message = '';
      state.loading = false;
      state.updatingContent = false;
    })
    .addCase(HIDE_MESSAGE, (state, action) => {
      state.error = '';
      state.message = '';
      state.loading = false;
      state.updatingContent = false;
    })
    .addCase(TOGGLE_APP_DRAWER, (state, action) => {
      state.isAppDrawerOpen = !state.isAppDrawerOpen;
    })
    .addCase(SET_PAGINATION, (state, action) => {
      state.pagination = action.payload;
    })
    .addCase(SET_DEPARTAMENTOS, (state, action) => {
      state.departamentos = action.payload;
    })
    .addCase(GET_DATA, (state, action) => {
      state.getData = action.payload;
    })
    .addCase(SET_FILTER, (state, action) => {
      state.filters = action.payload;
    })
    .addCase(SHOW_PDF, (state, action) => {
      state.blob = action.payload;
      state.showPdf = true;
    })
    .addCase(HIDE_PDF, (state, action) => {
      state.blob = null;
      state.showPdf = false;
    })
    .addCase(SET_ONLINE, (state, action) => {
      state.online = action.payload;
    });
});

export default commonReducer;
