const passport = require('./passport');

/* Iniitializing the passport */
app.use(passport.initialize());
app.use(passport.session());
