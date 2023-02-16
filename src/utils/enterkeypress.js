export const handelKeyPress = (e, callback) => {
  if (e.key === "Enter") {
    e.preventDefault();
    callback();
  }
};
