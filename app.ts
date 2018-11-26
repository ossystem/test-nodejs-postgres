import createError = require("http-errors");
import express = require("express");
import cookieParser = require("cookie-parser");
import logger = require("morgan");
import fs = require("fs");
import path = require("path");
import decorators = require("@decorators/express");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// autoload controllers
decorators.attachControllers(app,
    fs.readdirSync(path.resolve(__dirname, "controllers"))
      .reduce((acc: any[], filename: string) => {
          if (filename.endsWith("controller.js")) {
              acc.push(require(`./controllers/${filename}`));
          }

          return acc;
      }, [])
);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err: any, req: any, res: any, next: any) => {
  res.status(err.status || 500);
  res.send(err);
});

export = app;
