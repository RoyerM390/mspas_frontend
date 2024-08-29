export const getStringFromHtml = (htmlContent) => {
  return htmlContent.replace(/(<([^>]+)>)/gi, '');
};

export const generateUniqueID = () => {
  return `v1-${Date.now()}-${Math.floor(Math.random() * (9e12 - 1)) + 1e12}`;
};

export const getColumns = (object, omit) => {
  const keys = Object.keys(object);
  const columns = [];
  for (const key of keys) {
    const column = {
      key: generateUniqueID(),
      title: key,
    };
  }
};
