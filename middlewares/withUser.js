const express = require('express');
const { verifyToken } = require('../utils/token.js');

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const withUser = (req, res, next) => {
  const token = req.cookies.token;
  const verifiedToken = verifyToken(token);

  if (verifiedToken) {
    req.user = verifiedToken;
  } else {
    return res.redirect('/login');
  }
  next();
};

// module.exports = withUser;
