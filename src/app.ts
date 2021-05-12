import App from "./server";
import logging from './config/logging';
import config from './config/config';

const app = new App().app
const NAMESPACE:string = 'SERVER'
app.listen(process.env.PORT, () => logging.info(NAMESPACE, `Server is running http://${config.server.hostname}:${process.env.PORT}`))