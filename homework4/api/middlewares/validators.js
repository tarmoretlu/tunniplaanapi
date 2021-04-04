const validators = {};

validators.createUser = (req, res, next) => {
  const { firstName, lastName } = req.body;
  if (firstName && lastName) {
    next();
  } else {
    res.status(400).json({
      error: 'Firstname or lastname is missing',
    });
  }
};

validators.getUserById = (req, res, next) => {
  const { id } = req.params;
  if (id && (req.userId == id || req.userRole === 'Admin')) {
    next();
  } else {
    res.status(400).json({
      error: 'No id or you are not authorized!',
    });
  }
};

module.exports = validators;
