import express from 'express';
import bcrypt from 'bcrypt';
import moment from 'moment';
import userModel from '../model/user.model.js';
const router = express.Router();

router.get('/register', async function (req, res) {
  
  res.render('vwAccount/register.hbs',{
    layout: 'auth.hbs'
  });
});

router.post('/register', async function (req, res) {
  const rawPassword = req.body.password;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(rawPassword, salt);
  const dob = moment(req.body.dob, 'DD/MM/YYYY').format('YYYY-MM-DD');
  const user = {
    username: req.body.username,
    password: hash,
    dob: dob,
    name: req.body.name,
    email: req.body.email,
    permission: 0
  }
  await userModel.add(user);
  res.render('vwAccount/register', {
    layout: 'auth.hbs'
  });
});

router.get('/is-available', async function (req, res) {
  const username = req.query.user;
  const user = await userModel.findByUsername(username);
  if (user === null) {
    return res.json(true);
  }
  res.json(false);
});


  export default router;