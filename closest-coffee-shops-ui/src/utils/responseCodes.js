export const isSuccessfullResponse = (responseCode) => {
  if (responseCode >= 200 && responseCode < 300) {
    return true;
  } else {
    return false;
  }
};
