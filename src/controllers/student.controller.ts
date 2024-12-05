import { Request, Response } from "express";

import { repository } from "../database/prisma.connection";

// Classes funcionais -> apenas métodos. Não tem contrutor, propriedades..
export class StudentController {
  // index -> lista todos os alunos
  public async index(request: Request, response: Response) {
    try {
      // entrada e processamento
      const students = await repository.student.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          age: true,
        },
      });

      // 3- saída
      return response.status(200).json({
        success: true,
        code: response.statusCode,
        message: "Alunos listados com sucesso.",
        data: students,
      });
    } catch (error) {
      // tratamento de erro
      return response.status(500).json({
        success: false,
        code: response.statusCode,
        message: "Erro ao criar aluno.",
      });
    }
  }

  // store -> criar um novo recurso
  public async store(request: Request, response: Response) {
    try {
      // entrada e processamento
      const { name, email, password, age } = request.body;

      if (!name || !email || !password) {
        return response.status(400).json({
          success: false,
          code: response.statusCode,
          message: "Preencha todos os campos obrigatórios.",
        });
      }

      const createdStudent = await repository.student.create({
        data: {
          name,
          email,
          password,
          age,
        },
        select: {
          id: true,
          name: true,
          email: true,
          password: true,
          age: true,
        },
      });

      // saída
      return response.status(201).json({
        success: true,
        code: response.statusCode,
        message: "Aluno criado com sucesso.",
        data: createdStudent,
      });
    } catch (error) {
      // tratamento de erro
      return response.status(500).json({
        success: false,
        code: response.statusCode,
        message: "Erro ao criar aluno.",
      });
    }
  }

  // show -> detalhes de um único
  public async show(request: Request, response: Response) {
    try {
      const { id } = request.params;

      // Busca o aluno no banco de dados com base no id
      const student = await repository.student.findUnique({
        where: {
          // usado para garantir que id seja tratado como uma string, pois algumas implementações do Prisma podem exigir esse formato.
          id: String(id),
        },
        select: {
          id: true,
          name: true,
          email: true,
          password: true,
          age: true,
        },
      });

      // Verifica se o aluno foi encontrado
      if (!student) {
        return response.status(404).json({
          success: false,
          code: response.statusCode,
          message: "Aluno não encontrado.",
        });
      }

      // Retorna o aluno encontrado
      return response.status(200).json({
        success: true,
        code: response.statusCode,
        message: "Aluno encontrado com sucesso.",
        data: student,
      });
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: response.statusCode,
        message: "Erro ao buscar aluno.",
      });
    }
  }

  // update -> atulizar um recurso existente
  public async update(request: Request, response: Response) {
    try {
      const { id } = request.params;

      // Certifique-se de validar e fornecer os dados que você deseja atualizar
      const { name, email, password, age } = request.body;

      // Use o método update para atualizar o aluno
      // repository.user.update(): Atualiza um aluno no banco de dados.
      const updatedStudent = await repository.student.update({
        where: {
          // usado para garantir que id seja tratado como uma string, pois algumas implementações do Prisma podem exigir esse formato.
          id: String(id),
        },
        data: {
          name,
          email,
          password,
          age,
        },
        select: {
          id: true,
          name: true,
          email: true,
          password: true,
          age: true,
        },
      });

      response.json({
        success: true,
        code: response.statusCode,
        message: "Aluno atualizado com sucesso.",
        data: updatedStudent,
      });
    } catch (error) {
      response.status(500).json({
        success: false,
        code: response.statusCode,
        message: "Erro ao atualizar aluno.",
      });
    }
  }

  // destroy ou delete -> remover um recurso existente
  public async delete(request: Request, response: Response) {
    try {
      const { id } = request.params;

      // Use o método delete para excluir o aluno
      const student = await repository.student.delete({
        where: {
          id: String(id),
        },
        select: {
          id: true,
          name: true,
          email: true,
          password: true,
          age: true,
        },
      });

      response.json({
        success: true,
        code: response.statusCode,
        message: "Aluno removido com sucesso.",
        data: student,
      });
    } catch (error) {
      response.status(500).json({
        success: false,
        code: response.statusCode,
        message: "Erro ao excluir aluno.",
      });
    }
  }
}
