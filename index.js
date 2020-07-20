const express = require('express');
const server = express();

server.use(express.json());

server.use(contRequests);

const arrProjects = [
  {
    id: "1",
    title: "New project",
    tasks: [],
  },
];

// Middlewares
function checkIdProject(req, res, next){
  const { id } = req.params;

  const project = arrProjects.find(item => item.id == id );

  if(!project){
    return res.status(400).json({ message: "Project does not exists!" });
  }
  return next();
};

function contRequests(req, res, next){
  console.count("Número de requisições");
  return next()
}

// Routes
server.post('/projects', (req, res) => {
  const { id, title } = req.body;
  const project = {
    id,
    title,
    tasks: []
  };

  arrProjects.push(project);

  return res.json(arrProjects);
});

server.get('/projects', (req, res) => {
  return res.json(arrProjects);
});

server.put('/projects/:id', checkIdProject, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = arrProjects.find(item => item.id == id);
  
  project.title = title;

  return res.json(arrProjects);
});

server.delete('/projects/:id', checkIdProject, (req, res) => {
  const { id } = req.params;

  const projectIndex = arrProjects.findIndex(item => item.id == item);

  arrProjects.splice(projectIndex, 1);

  return res.json();
});

server.post('/projects/:id/tasks', checkIdProject, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = arrProjects.find(item => item.id == id);

  project.tasks.push(title);

  return res.json(arrProjects);
});


server.listen(3000, () => {
  console.log('Servidor rodando!');
});