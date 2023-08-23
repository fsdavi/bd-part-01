const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

app.use(bodyParser.json());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const users = [];

/**
 * @swagger
 * /:
 *   get:
 *     summary: Verifica se a API está rodando
 *     responses:
 *       200:
 *         description: Resposta de sucesso
 *         content:
 *           application/json:
 *             example:
 *               message: API rodando!
 */
app.get('/', (_, res) => res.json('API rodando!'));

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Cria um novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cpf:
 *                 type: string
 *               nome:
 *                 type: string
 *               data_nascimento:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       409:
 *         description: Usuário já cadastrado
 */
app.post('/user', (req, res) => {
  const user = users.find(user => user.cpf === req.body.cpf);
  const { cpf, nome, data_nascimento } = req.body;

  if(user) return res.status(409).json({ message: 'Usuário já cadastrado.' });

  users.push({ cpf, nome, data_nascimento });
  res.status(201).json({ message: 'Usuário criado com sucesso!' });
});

/**
 * @swagger
 * /user/{cpf}:
 *   get:
 *     summary: Busca usuário a partir do CPF
 *     parameters:
 *       - name: cpf
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalhes do usuário
 *         content:
 *           application/json:
 *             example:
 *               cpf: 12345678901
 *               nome: Test
 *               data_nascimento: 1990-01-01
 *       404:
 *         description: Usuário não encontrado
*/
app.get('/user/:cpf', (req, res) => {
  const user = users.find(user => user.cpf === req.params.cpf);

  if (user) return res.json(user);
  return res.status(404).json({ message: 'Usuário não encontrado.' });
});

/**
* @swagger
* /users:
*   get:
*     summary: Lista todos os usuários cadastrados
*     responses:
*       200:
*         description: Lista de usuários
*         content:
*           application/json:
*             example:
*               - cpf: 12345678901
*                 nome: Test
*                 data_nascimento: 1990-01-01
*               - cpf: 98765432109
*                 nome: Test 01
*                 data_nascimento: 1985-05-15
*       404:
*         description: Não há usuários cadastrados
*/
app.get('/users', (_, res) => {
 if (users) return res.json(users);
 res.status(404).json({ message: 'Não há usuários cadastrados' });
});

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
