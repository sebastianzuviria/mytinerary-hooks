const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

loginRouter.post('/', async (request, response) => {
  const body = request.body
  const user = await User.findOne({ email: body.email })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    email: user.email,
    id: user._id
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  response
    .status(200)
    .send({ token, username: user.username, firstName: user.firstName, lastName: user.lastName, email: user.email, id: user.id, imgUrl: user.imgUrl })
})

loginRouter.post('/auth/google', async (request, response) => {
  const token = request.body.tokenId

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID
  })

  const { given_name, family_name, email, picture, sub } = ticket.getPayload()

  const userInDb = await User.findOne({ email })

  if (userInDb) {
    userInDb.firstName = given_name
    userInDb.lastName = family_name
    userInDb.email = email
    userInDb.imgUrl = picture
    userInDb.googleId = sub

    const updatedUser = await userInDb.save()

    const userForToken = {
      email: updatedUser.email,
      id: updatedUser._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    response
      .status(200)
      .send({
        token,
        username: updatedUser.username,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        id: updatedUser.id,
        imgUrl: updatedUser.imgUrl
      })
  } else if (!userInDb) {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(String(Math.random()), saltRounds)

    const user = new User({
      username: '',
      email: email,
      firstName: given_name,
      googleId: sub,
      lastName: family_name,
      imgUrl: picture,
      passwordHash,
      favs: [],
      likedComments: [],
      dislikedComments: []
    })

    const savedUser = await user.save()

    response.json(savedUser)
  }
})

module.exports = loginRouter
