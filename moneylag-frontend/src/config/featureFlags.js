const env = window._env_ || {};

export const FEATURE_FLAGS = {
  ENABLE_UPDATE: env.ENABLE_UPDATE === true,
  ENABLE_DELETE_ALL: env.ENABLE_DELETE_ALL === true
};