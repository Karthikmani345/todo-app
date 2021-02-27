import dotenv from "dotenv";
dotenv.config({ path: `${__dirname}/../.env` });

import { startServer, stopServer } from "./Server";

startServer();




