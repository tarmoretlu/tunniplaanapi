const { usersService } = require('../services');

const usersController = {};

 usersController.getUsers = async (req, res) => {
  const users = await usersService.getUsers();
  return res.status(200).json({
    users,
  });
};

 usersController.getUserById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const user = await usersService.getUserById(id);
  if (!user) {
    return res.status(400).json({
      error: `No user found with id: ${id}`,
    });
  }
  return res.status(200).json({
    user,
  });
};

 usersController.createUser = async (req, res) => {
  const {
    firstName, lastName, email, password,
  } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({
      error: 'Required data is missing.',
    });
  }
  const user = {
    firstName,
    lastName,
    email,
    password,
  };
  const data = await usersService.createUser(user);
  if (data.error) {
    return res.status(409).json({
      error: data.error,
    });
  }
  return res.status(201).json({
    id: data.id,
  });
};

 usersController.login = async (req, res) => {
  const {
    email, password,
  } = req.body;
  if (!email && !password) {
    return res.status(400).json({
      error: 'Email or password missing',
    });
  }
  const login = {
    email,
    password,
  };
  const data = await usersService.login(login);
  if (data.error) {
    return res.status(403).json({
      error: data.error,
    });
  }
  return res.status(200).json({
    token: data.token,
  });
};

 usersController.deleteUser = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  // Check if user exists
  const user = await usersService.getUserById(id);
  if (!user) {
    return res.status(400).json({
      error: `No user found with id: ${id}`,
    });
  }
  const success = await usersService.deleteUser(id);
  if (!success) {
    return res.status(500).json({
      error: 'Something went wrong while deleting user',
    });
  }
  return res.status(204).end();
};

 usersController.updateUser = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const {
    firstName,
    lastName,
    email,
    password,
  } = req.body;
  if (!id && !(firstName || lastName || email || password)) {
    res.status(400).json({
      error: 'Id, firstName or lastName is missing',
    });
  }

/*
  const user = await usersService.getUserById(id);
  if (!user) {
    res.status(400).json({
      error: `No user found with id: ${id}`,
    });
  }

*/
  const userToUpdate = {
    id,
    firstName,
    lastName,
    email,
    password,
  };
  const success = await usersService.updateUser(userToUpdate);
  if (!success) {
    return res.status(500).json({
      error: 'Something went wrong while updating user',
    });
  }
  return res.status(200).json({
    success: true,
  });
};

module.exports = usersController;
