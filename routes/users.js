const router = require('express').Router();
const {
  getUsers,
  getUser,
  updateUserProfile,
  updateUserAvatar,
  getUserInfo,
} = require('../controllers/users');
const {
  getUserValidation,
  updateUserProfileValidation,
  updateUserAvatarValidation,
} = require('../middlewares/validate');

router.get('/', getUsers);
router.get('/:id',getUserValidation, getUser);
router.patch('/me', updateUserProfileValidation, updateUserProfile);
router.patch('/me/avatar', updateUserAvatarValidation, updateUserAvatar);
router.get('/me', getUserInfo);
module.exports = router;
