const router = require('express').Router();
const {
  getUsers,
  createUser,
  getUser,
  updateUserProfile,
  updateUserAvatar,
  getUserInfo,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getUser);
router.patch('/me', updateUserProfile);
router.patch('/me/avatar', updateUserAvatar);
router.get('/me', getUserInfo);
module.exports = router;
