import express from "express";
import cors from 'cors';

import { StudentController } from "./controllers/student.controller";

const app = express();

app.use(express.json());
app.use(cors());

const studentController = new StudentController()

// Listar todos os alunos
app.get('/students', studentController.index);

// Criar um novo aluno
app.post("/students", studentController.store);

// Pesquisa um aluno por ID
app.get("/students/:id", studentController.show);

// Atualiza um aluno
app.put('/students/:id', studentController.update);

// Exclui um aluno
app.delete(`/students/:id`, studentController.delete);

app.listen(3000, () => {
    console.log("🚀 Server ready at: http://localhost:3000");
});