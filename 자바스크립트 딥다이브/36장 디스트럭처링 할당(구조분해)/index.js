const todos = [
  { id: 1, content: "HTML", completed: true },
  { id: 2, content: "CSS", completed: true },
  { id: 3, content: "JAVASCRIPT", completed: false },
];

const [{ content }, { id }, { completed }] = todos;
console.log(content, id, completed);
