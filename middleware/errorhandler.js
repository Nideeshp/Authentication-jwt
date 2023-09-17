const {constants} =require('../constants')

const errorhandler = (err, req, res, nxt) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  switch (statusCode) {
    case constants.NOT_FOUND:
      res.json({
        title: "Not found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation failed",
        message: err.message,
        stackTrace: err.stack,
      });
      break
    case constants.FORBIDDEN:
      res.json({
        title:"forbiden",
        message: err.message,
        stackTrace: err.stack,
      });
      break
    case constants.UNAUTHORIZED:
      res.json({
        title:"unauthorized",
        message: err.message,
        stackTrace: err.stack,
      });
      break
    case constants.SERVER_ERROR:
      res.json({
        title:"Internal server error",
        message: err.message,
        stackTrace: err.stack,
      });

    default:
        console.log("No errors all good !");
      break;
  }
};

module.exports = errorhandler;
