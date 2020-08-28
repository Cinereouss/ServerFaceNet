module.exports = fn => {
  return (req, res, next) => {
    // Due to passed fn function return promise (fn is async function). If error occurs means rejected.
    // we catch()
    fn(req, res, next).catch(err => next(err));
  };
};
