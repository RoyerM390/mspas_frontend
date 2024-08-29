import { useEffect, useState } from 'react';
import _ from 'lodash';
import { useInfoViewActionsContext } from '@aqtiva/context/InfoViewContextProvider';
import {
  isRequestSuccessful,
  sanitizeArrayObject,
  sanitizeData,
} from '@aqtiva/helpers';
import jwtAxios from '@aqtiva/axios';
import { fetchError } from '../../../apps/aqtiva/toolkit/actions';

export const useGetDataApi = (
  url,
  initialData = undefined,
  params = {},
  initialCall = true,
  callbackFun
) => {
  const [skip, setSkip] = useState(0);
  const { fetchError } = useInfoViewActionsContext();
  const [initialUrl, setInitialUrl] = useState(url);
  const [allowApiCall, setAllowApiCall] = useState(initialCall);
  const [loading, setLoading] = useState(initialCall);
  const [isLoadingMore, setLoadingMore] = useState(false);
  const [isRefreshing, setRefreshing] = useState(false);
  const [apiData, setData] = useState(initialData);
  const [otherData, setOtherData] = useState(null);
  const [queryParams, updateQueryParams] = useState(params);
  const [isResetRequired, setResetRequired] = useState(false);
  let isResponsePending = false;

  const updateInitialUrl = (value) => {
    setAllowApiCall(true);
    setInitialUrl(value);
  };

  const reCallAPI = () => {
    setQueryParams(queryParams);
  };

  const setQueryParams = (queryParams) => {
    setLoading(true);
    updateQueryParams({ ...queryParams });
    setAllowApiCall(true);
    if (Array.isArray(initialData)) {
      if (!queryParams.skipReset) {
        setSkip(0);
        setResetRequired(true);
      }
    }
  };

  useEffect(() => {
    const fetchData = () => {
      isResponsePending = true;
      if (
        skip === 0 &&
        ((Array.isArray(apiData) && apiData.length === 0) ||
          !Array.isArray(apiData)) &&
        !isResetRequired
      ) {
        setLoading(true);
      }
      if (queryParams.skipReset) {
        setLoading(true);
      }
      let params = {};
      if (!_.isEmpty(queryParams)) {
        params = {
          ...trimObjectValues(queryParams),
        };
      }
      console.log('API Called', initialUrl, params);
      jwtAxios
        .get(initialUrl, { params: params })
        .then((data) => {
          console.log('API Success', initialUrl, data);
          isResponsePending = false;
          if (isRequestSuccessful(data.status)) {
            console.log(initialUrl, data.data);
            if (Array.isArray(initialData)) {
              setLoadingMore(false);
              setRefreshing(false);
              setData(data.data);
            } else {
              setData(data.data);
            }
            setLoading(false);
          } else {
            setLoading(false);
            fetchError(data.data.error ? data.data.error : data.data.message);
            setData(initialData);
            if (callbackFun) callbackFun(data.data);
          }
        })
        .catch((error) => {
          console.log('API Failed', initialUrl, error);
          if (error?.response?.data?.message) {
            console.log(initialUrl, error.response.data.message);
            if (callbackFun) callbackFun(error.response.data);
            fetchError(error.response.data.message);
          } else {
            fetchError(error.message);
            if (callbackFun) callbackFun(error);
          }
          setLoading(false);
        });
    };
    if (allowApiCall && !isResponsePending) fetchData();
  }, [initialUrl, skip, queryParams, allowApiCall, isRefreshing]);
  return [
    {
      loading,
      apiData,
      otherData,
      skip,
      isLoadingMore,
      isRefreshing,
      initialUrl,
    },
    {
      setSkip,
      setData,
      setLoading,
      setOtherData,
      updateInitialUrl,
      setQueryParams,
      setLoadingMore,
      setRefreshing,
      reCallAPI,
    },
  ];
};

export const trimObjectValues = (obj) => {
  if (_.isEmpty(obj)) {
    return obj;
  }
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === 'string') {
      obj[key] = obj[key].trim();
    }
  });
  return obj;
};

const handleApiResponse = (url, showMessage, data, resolve, reject) => {
  if (isRequestSuccessful(data.status)) {
    showMessage('Operación realizada');
    return resolve(data.data);
  } else {
    return reject(data.data);
  }
};

const handleAPIError = (url, fetchError, error, reject) => {
  console.log(error);
  fetchError(error);
  return reject(error);
};

export const postDataApi = (
  url,
  infoViewContext,
  payload,
  isHideLoader = false,
  headers
) => {
  const { fetchStart, fetchError, showMessage } = infoViewContext;
  return new Promise((resolve, reject) => {
    if (!isHideLoader) fetchStart();
    jwtAxios
      .post(
        url,
        sanitizeData(payload),
        headers ? { headers, timeout: Number.POSITIVE_INFINITY } : {}
      )
      .then((data) => {
        return handleApiResponse(url, showMessage, data, resolve, reject);
      })
      .catch((error) => {
        return handleAPIError(
          url,
          fetchError,
          typeof error?.response?.data?.message === 'string'
            ? error.response.data?.message
            : sanitizeArrayObject(error?.response?.data?.message),
          reject
        );
      });
    return Promise.resolve();
  });
};

export const putDataApi = (
  url,
  infoViewContext,
  payload,
  isHideLoader = false
) => {
  const { fetchStart, fetchError, showMessage } = infoViewContext;
  return new Promise((resolve, reject) => {
    if (!isHideLoader) fetchStart();
    jwtAxios
      .put(url, sanitizeData(payload))
      .then((data) => {
        return handleApiResponse(url, showMessage, data, resolve, reject);
      })
      .catch((error) => {
        return handleAPIError(
          url,
          fetchError,
          sanitizeArrayObject(error.response.data?.message),
          reject
        );
      });
    return Promise.resolve();
  });
};

export const getDataApi = (
  url,
  infoViewContext,
  params = {},
  isHideLoader = false,
  headers
) => {
  const { fetchStart, fetchSuccess } = infoViewContext;
  return new Promise((resolve, reject) => {
    if (!isHideLoader) fetchStart();
    jwtAxios
      .get(url, { params: sanitizeData(params), headers })
      .then((data) => {
        return handleApiResponse(url, fetchSuccess, data, resolve, reject);
      })
      .catch((error) => {
        return handleAPIError(url, fetchSuccess, error, reject);
      });
    return Promise.resolve();
  });
};
export const getBlobApi = (
  url,
  infoViewContext,
  params = {},
  isHideLoader = false,
  headers
) => {
  const { fetchStart, fetchSuccess } = infoViewContext;
  return new Promise((resolve, reject) => {
    if (!isHideLoader) fetchStart();
    jwtAxios
      .get(url, { params: sanitizeData(params), headers, responseType: 'blob' })
      .then((data) => {
        return handleApiResponse(url, fetchSuccess, data, resolve, reject);
      })
      .catch((error) => {
        return handleAPIError(url, fetchSuccess, error, reject);
      });
    return Promise.resolve();
  });
};

export const getBufferApi = (url, infoViewContext, params = {}, fileName) => {
  const { fetchStart, fetchSuccess } = infoViewContext;
  fetchStart();
  return new Promise((resolve, reject) => {
    jwtAxios
      .get(url, {
        params: sanitizeData(params),
        responseType: 'arraybuffer',
      })
      .then((response) => {
        const type = response.headers['content-type'];
        const blob = new Blob([response.data], {
          type: type,
          encoding: 'UTF-8',
        });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
        fetchSuccess();
      })
      .catch((error) => {
        return handleAPIError(url, fetchSuccess, error, reject);
      });
    return Promise.resolve();
  });
};

export const deleteDataApi = (
  url,
  infoViewContext,
  params,
  isHideLoader = false
) => {
  const { fetchStart, fetchSuccess } = infoViewContext;
  return new Promise((resolve, reject) => {
    if (!isHideLoader) fetchStart();
    jwtAxios
      .delete(url, { params })
      .then((data) => {
        return handleApiResponse(url, fetchSuccess, data, resolve, reject);
      })
      .catch((error) => {
        return handleAPIError(
          url,
          fetchError,
          typeof error?.response?.data?.message === 'string'
            ? error.response.data?.message
            : sanitizeArrayObject(error?.response?.data?.message),
          reject
        );
      });
    return Promise.resolve();
  });
};

export const uploadDataApi = (
  url,
  infoViewContext,
  payload,
  isHideLoader = false,
  onUploadProgress = () => {
    console.log('');
  },
  allowDownload = false
) => {
  const { fetchStart, fetchSuccess } = infoViewContext;
  return new Promise((resolve, reject) => {
    if (!isHideLoader) fetchStart();
    jwtAxios
      .post(url, payload, {
        onUploadProgress,
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        responseType: allowDownload ? 'arraybuffer' : 'stream',
      })
      .then((data) => {
        return handleApiResponse(url, fetchSuccess, data, resolve, reject);
      })
      .catch((error) => {
        return handleAPIError(url, fetchSuccess, error, reject);
      });
    return Promise.resolve();
  });
};

export const uploadPutDataApi = (
  url,
  infoViewContext,
  payload,
  isHideLoader = false
) => {
  const { fetchStart, fetchSuccess } = infoViewContext;
  return new Promise((resolve, reject) => {
    if (!isHideLoader) fetchStart();
    jwtAxios
      .put(url, payload, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      .then((data) => {
        return handleApiResponse(url, fetchSuccess, data, resolve, reject);
      })
      .catch((error) => {
        return handleAPIError(url, fetchSuccess, error, reject);
      });
    return Promise.resolve();
  });
};

export const downloadDataApi = (
  url,
  infoViewContext,
  params = {},
  isHideLoader = false
) => {
  const { fetchStart, fetchSuccess } = infoViewContext;
  return new Promise((resolve, reject) => {
    if (!isHideLoader) fetchStart();
    jwtAxios
      .get(url, {
        params,
        responseType: 'arraybuffer',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then((res) => {
        fetchSuccess();
        if (isRequestSuccessful(res.status)) {
          return resolve(res.data);
        } else {
          const data = JSON.parse(
            String.fromCharCode.apply(null, new Uint8Array(res.data))
          );
          return reject(data);
        }
      })
      .catch((error) => {
        return handleAPIError(url, fetchSuccess, error, reject);
      });
    return Promise.resolve();
  });
};
