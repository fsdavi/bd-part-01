const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const users = [];

app.post('/user', (req, res) => {
  const user = users.find(user => user.cpf === req.body.cpf);
  const { cpf, nome, data_nascimento } = req.body;
  users.push({ cpf, nome, data_nascimento });

  if(user) res.status(409).json({ message: 'Usuário já cadastrado.' });
  else res.status(201).json({ message: 'Usuário criado com sucesso!' });
});

app.get('/user/:cpf', (req, res) => {
  const user = users.find(user => user.cpf === req.params.cpf);

  if (user) return res.json(user);
  return res.status(404).json({ message: 'Usuário não encontrado.' });
});

app.get('/users', (req, res) => {
 if (users) {
   res.json(users);
 } else {
   res.status(404).json({ message: 'Não há usuários cadastrados' });
 }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
