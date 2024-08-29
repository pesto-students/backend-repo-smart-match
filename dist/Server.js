let server;
/* mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  console.log('Connected to MongoDB');

const port = process.env.APP_PORT;
  server = App.listen(port, () => {
    console.log(`Listening to port ${port}`);
  });
}); */
const exitHandler = () => {
    if (server) {
        server.close(() => {
            console.log("Server closed");
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
};
const unexpectedErrorHandler = (error) => {
    console.log(error);
    exitHandler();
};
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
process.on("SIGTERM", () => {
    console.log("SIGTERM received");
    if (server) {
        server.close();
    }
});
export {};
//# sourceMappingURL=Server.js.map