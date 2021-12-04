import Curso from '../models/Curso';

class CursoController {
  async index(req, res) {
    const cursos = await Curso.findAll();
    res.json(cursos);
  }

  async read(req, res, next) {
    const id = req.params.id;

    try {
      const curso = await Curso.findAll({
        where: {
          id: id
        }
      });

      if (curso.length == 0) {
        throw new Error('Curso não encontrado!');
      }

      res.json(curso);
    } catch (err) {
      next(err);
    }
  }

  async create(req, res, next) {
    try {
      await Curso.create({
        nome: req.body.nome
      });

      res.status(201).send({
        mensagem: 'O curso foi cadastrado com sucesso.'
      });
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    const id = req.params.id;

    try {
      const curso = await Curso.findAll({
        where: {
          id: id
        }
      });

      if (curso.length == 0) {
        throw new Error('Curso não encontrado!');
      }

      await Curso.update(
        {
          nome: req.body.nome
        },
        { where: { id: id } }
      );

      res.status(200).send({
        mensagem: 'As informações do curso foram atualizadas com sucesso.'
      });
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    const id = req.params.id;

    try {
      const curso = await Curso.findAll({
        where: {
          id: id
        }
      });

      if (curso.length == 0) {
        throw new Error('Curso não encontrado!');
      }
      await Curso.destroy({
        where: {
          id: id
        }
      });

      res.status(200).send({
        mensagem: `Curso(s) atribuído(s) ao aluno ${id_aluno} com sucesso`
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new CursoController();
