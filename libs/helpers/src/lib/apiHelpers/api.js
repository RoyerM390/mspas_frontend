import {
  deleteDataApi,
  getBlobApi,
  getBufferApi,
  getDataApi,
  postDataApi,
  putDataApi,
} from '@aqtiva/hooks/APIHooks';
import { actions } from '@aqtiva/helpers';
import { SET_PAGINATION, SHOW_PDF } from '@aqtiva/constants';

export const api = (endpoint, dispatch, setState = null, state = null) => {
  return {
    get: async (search = '', page = 1, overrideEndpoint = endpoint) => {
      const tipoSearchString = typeof search === 'string';
      let data = {};
      if (tipoSearchString) {
        data = await getDataApi(overrideEndpoint, actions(dispatch), {
          page,
          search,
        });
      } else {
        data = await getDataApi(overrideEndpoint, actions(dispatch), {
          page,
          ...search,
        });
      }
      if (setState !== null && setState !== undefined) {
        if (data.data !== undefined) {
          setState(data.data);
        } else {
          setState(data);
        }
      }
      dispatch({ type: SET_PAGINATION, payload: data.meta });
    },
    getById: async (id) => {
      const data = await getDataApi(`${endpoint}/${id}`, actions(dispatch), {});
      return data;
    },
    create: async (data, overrideEndpoint = endpoint) => {
      return await postDataApi(
        overrideEndpoint,
        actions(dispatch),
        data,
        false
      );
    },
    deleteApi: async (id) => {
      return await deleteDataApi(`${endpoint}/${id}`, actions(dispatch), false);
    },
    edit: async (data) => {
      const response = await putDataApi(
        endpoint + data.id,
        actions(dispatch),
        data,
        false
      );
      if (
        typeof setState === 'object' &&
        setState !== null &&
        setState !== undefined
      ) {
        let newData;
        newData = state.map((item) =>
          item.id === response.id ? response : item
        );
        setState(newData);
      } else {
        return response;
      }
    },
    genericGet: async (extraEndpoint, params = {}, setState = null) => {
      const data = await getDataApi(extraEndpoint, actions(dispatch), {
        ...params,
      });
      if (setState !== null && setState !== undefined) {
        setState(data.data ? data.data : data);
      }
      return data;
    },
    genericPost: async (extraEndpoint, data) => {
      return await postDataApi(extraEndpoint, actions(dispatch), data, false);
    },
    postFile: async (extraEndpoint, data) => {
      return await postDataApi(extraEndpoint, actions(dispatch), data, false, {
        'Content-Type': 'multipart/form-data',
      });
    },
    getPdf: async (url, params = {}) => {
      const data = await getBlobApi(url, actions(dispatch), params);
      dispatch({ type: SHOW_PDF, payload: data });
    },
    getFile: async (url, params = {}, fileName) => {
      return await getBufferApi(url, actions(dispatch), params, fileName);
    },
  };
};
