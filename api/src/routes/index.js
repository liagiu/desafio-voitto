import { Router } from 'express';

import AlunosController from '../app/controllers/AlunoController';
import CursoController from '../app/controllers/CursoController';

const routes = new Router();

routes.get('/alunos', AlunosController.index);
routes.get('/alunos/:id', AlunosController.read);
routes.post('/alunos', AlunosController.create);
routes.put('/alunos/:id', AlunosController.update);
routes.delete('/alunos/:id', AlunosController.delete);

routes.get('/cursos', CursoController.index);
routes.get('/cursos/:id', CursoController.read);
routes.post('/cursos', CursoController.create);
routes.put('/cursos/:id', CursoController.update);
routes.delete('/cursos/:id', CursoController.delete);

export default routes;
