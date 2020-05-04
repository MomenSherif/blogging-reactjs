const onLoading = () => ({
  type: 'LOADING',
});

const onSuccess = (message) => ({
  type: 'SUCCESS',
  message,
});

const onFailure = (errors) => ({
  type: 'ERROR',
  errors,
});

export { onLoading, onSuccess, onFailure };
