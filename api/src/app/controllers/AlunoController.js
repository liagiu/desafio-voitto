import Aluno from '../models/Aluno';
import CursoAluno from '../models/CursoAluno';
import AtribuirCursoAlunoService from '../services/AtribuirCursoAlunoService';
class AlunoController {
  async index(req, res) {
    const alunos = await Aluno.findAll();
    res.json(alunos);
  }

  async read(req, res, next) {
    const id = req.params.id;

    try {
      const aluno = await Aluno.findAll({
        where: {
          id: id
        }
      });

      if (aluno.length == 0) {
        throw new Error('Aluno não encontrado!');
      }

      res.json(aluno);
    } catch (err) {
      next(err);
    }
  }

  async create(req, res, next) {
    try {
      await Aluno.create({
        nome: req.body.nome,
        email: req.body.email,
        cep: req.body.cep,
        cidade: req.body.cidade,
        estado: req.body.estado
      });

      res.status(201).send({
        mensagem: 'O aluno foi cadastrado com sucesso.'
      });
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    const id = req.params.id;

    try {
      const aluno = await Aluno.findAll({
        where: {
          id: id
        }
      });

      if (aluno.length == 0) {
        throw new Error('Aluno não encontrado!');
      }

      await Aluno.update(
        {
          nome: req.body.nome,
          email: req.body.email,
          cep: req.body.cep,
          cidade: req.body.cidade,
          estado: req.body.estado
        },
        { where: { id: id } }
      );

      res.status(200).send({
        mensagem: 'As informações do aluno foram atualizadas com sucesso.'
      });
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    const id = req.params.id;

    try {
      const aluno = await Aluno.findAll({
        where: {
          id: id
        }
      });

      if (aluno.length == 0) {
        throw new Error('Aluno não encontrado!');
      }
      await Aluno.destroy({
        where: {
          id: id
        }
      });

      res.status(200).send({
        mensagem: 'Aluno deletado do sistema com sucesso.'
      });
    } catch (err) {
      next(err);
    }
  }

  async atribuiCursos(req, res, next) {
    try {
      const id = req.params.id;
      await req.body.cursos.forEach(id_curso => {
        if (
          CursoAluno.findAll({
            where: {
              id_pessoa: id,
              id_curso: id_curso
            }
          })
        ) {
          throw new Error('Aluno já cadastrado nesse curso!');
        }
        AtribuirCursoAlunoService.execute(id, id_curso);
      });

      res.status(200).send({
        mensagem: 'Cursos atribuídos com sucesso'
      });
    } catch (err) {
      next(err);
    }
  }

  async listaCurso(req, res, next) {
    const id = req.params.id;

    try {
      const cursos = await CursoAluno.findAll({
        where: {
          id_pessoa: id
        }
      });

      if (cursos.length == 0) {
        throw new Error('Nenhum curso atribuído a esse aluno');
      }

      res.json(cursos);
    } catch (err) {
      next(err);
    }
  }
}

export default new AlunoController();
