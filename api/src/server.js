import http from 'http';
import Server from './app';

const server = http.Server(Server);
server.listen(3333, () => console.log(`Server ouvindo a porta -> 3333`));

Server.use((req, res, next) => {
  const erro = new Error('Recurso não encontrado');
  erro.status = 404;
  next(erro);
});

Server.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.send({
    erro: {
      mensagem: error.message
    }
  });
});
