import { Request, Response } from "express"

import { repository } from "../database/prisma.connection"

export class AssessmentController {
  // index - lista todas as avaliações
  public async index(request: Request, response: Response) {
    try {
      const { studentId } = request.params

      const student = await repository.student.findUnique({
        where: { id: studentId },
        include: {
          assessments: {
            select: {
              id: true,
              discipline: true,
              grade: true,
            },
          },
        },
      });

      if (!student) {
        return response.status(404).json({
          success: false,
          code: response.statusCode,
          message: "Estudante não encontrado.",
        });
      }

      return response.status(200).json({
        success: true,
        code: response.statusCode,
        message: "Avaliações listadas com sucesso.",
        data: student.assessments,
      });
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        success: false,
        code: response.statusCode,
        message: "Erro ao listar avaliações. Tente novamente mais tarde.",
      });
    }
  }

  // store - criar uma avaliação
  public async store(request: Request, response: Response) {
    try {
      const { studentId } = request.params;
      const { discipline, grade } = request.body;

      if (!discipline || !grade) {
        return response.status(400).json({
          success: false,
          code: response.statusCode,
          message: "Os campos 'discipline' e 'grade' são obrigatórios.",
        });
      }

      const student = await repository.student.findUnique({
        where: { id: studentId },
      });

      if (!student) {
        return response.status(404).json({
          success: false,
          code: response.statusCode,
          message: "Estudante não encontrado.",
        });
      }

      const createdAssessment = await repository.assessment.create({
        data: {
          discipline,
          grade,
          studentId,
        },
        select: {
          id: true,
          discipline: true,
          grade: true,
        },
      });

      return response.status(201).json({
        success: true,
        code: response.statusCode,
        message: "Avaliação criada com sucesso.",
        data: createdAssessment,
      });
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        success: false,
        code: response.statusCode,
        message: "Erro ao criar avaliação. Tente novamente mais tarde.",
      });
    }
  }

  // show - detalhes de uma única avaliação
  public async show(request: Request, response: Response) {
    try {
      const { studentId, id } = request.params;

      const assessment = await repository.assessment.findFirst({
        where: {
          id,
          studentId,
        },
        select: {
          id: true,
          discipline: true,
          grade: true
        }
      });

      if (!assessment) {
        return response.status(404).json({
          success: false,
          code: response.statusCode,
          message: "Avaliação não encontrada ou não pertence ao estudante.",
        });
      }

      return response.status(200).json({
        success: true,
        code: response.statusCode,
        message: "Avaliação encontrada com sucesso.",
        data: assessment,
      });
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        success: false,
        code: response.statusCode,
        message: "Erro ao buscar avaliação. Tente novamente mais tarde.",
      });
    }
  }

  // update - atualizar uma avaliação
  public async update(request: Request, response: Response) {
    try {
      const { studentId, id } = request.params;
      const { discipline, grade } = request.body;

      if (!discipline || !grade) {
        return response.status(400).json({
          success: false,
          code: response.statusCode,
          message: "Os campos 'discipline' e 'grade' são obrigatórios.",
        });
      }

      const assessment = await repository.assessment.findFirst({
        where: {
          id,
          studentId,
        },
      });

      if (!assessment) {
        return response.status(404).json({
          success: false,
          code: response.statusCode,
          message: "Avaliação não encontrada ou não pertence ao estudante.",
        });
      }

      const updatedAssessment = await repository.assessment.update({
        where: { id },
        data: { grade, discipline },
        select: {
          id: true,
          discipline: true,
          grade: true,
        },
      });

      return response.status(200).json({
        success: true,
        code: response.statusCode,
        message: "Avaliação atualizada com sucesso.",
        data: updatedAssessment,
      });
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        success: false,
        code: response.statusCode,
        message: "Erro ao atualizar avaliação. Tente novamente mais tarde.",
      });
    }
  }

  // delete - excluir uma avaliação
  public async delete(request: Request, response: Response) {
    try {
      const { studentId, id } = request.params;

      const assessment = await repository.assessment.findFirst({
        where: {
          id,
          studentId,
        },
      });

      if (!assessment) {
        return response.status(404).json({
          success: false,
          code: response.statusCode,
          message: "Avaliação não encontrada ou não pertence ao estudante.",
        });
      }

      const deletedAssessment = await repository.assessment.delete({
        where: { id },
        select: {
          id: true,
          discipline: true,
          grade: true,
        },
      });

      return response.status(200).json({
        success: true,
        code: response.statusCode,
        message: "Avaliação excluída com sucesso.",
        data: deletedAssessment,
      });
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        success: false,
        code: response.statusCode,
        message: "Erro ao excluir avaliação. Tente novamente mais tarde.",
      });
    }
  }
}
