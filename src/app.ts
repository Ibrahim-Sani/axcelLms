import createError, {HttpError} from 'http-errors';
import express, {Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import homePage from './routes/bookr';
import booksRouter from './routes/bookr';
import usersRouter from './routes/usersr';

const app = express();

// view engine setup
app.set('views', path.join(__dirname,"../", 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", homePage)
app.use('/book', booksRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req: Request, res: Response, next:NextFunction) {
  next(createError(404));
});

// error handler
app.use(function(err:HttpError, req: Request, res: Response, next:NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
