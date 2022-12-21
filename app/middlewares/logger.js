const logger = (req, res, next) => {
  console.log(`[${Date.now()}] - ${req.method} ${req.originalUrl} from ip : ${req.ip}`);
  next();
};

module.exports = logger;
