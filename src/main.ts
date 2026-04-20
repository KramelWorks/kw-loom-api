import { startHttpServer } from "./infrastructure/http/server.js";

function bootstrap(){
  startHttpServer();
}

bootstrap();