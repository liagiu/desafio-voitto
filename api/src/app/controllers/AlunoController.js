import Aluno from '../models/Aluno';

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
}

export default new AlunoController();
