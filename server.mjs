import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';

import register from './controllers/register.js';
import signin from './controllers/signin.js';
import profile from './controllers/profile.js';
import image from './controllers/image.js';

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0

const db = knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl: true,
  }
  });

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req,res) => {res.send("it is working fine")})
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req,res) => {register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req,res) => {profile.handleProfileGet(req, res, db)})
app.put('/image', (req,res) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req,res) => {image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3000, ()=>{
    console.log('app is running on port ${process.env.PORT}');
});
