const bd = require('../bd/bd_utils.js');
const modelo = require('../modelo.js');

beforeEach(() => {
  bd.reconfig('./bd/esmforum-teste.db');
  // limpa dados de todas as tabelas
  bd.exec('delete from perguntas', []);
  bd.exec('delete from respostas', []);
});

test('Testando banco de dados vazio', () => {
  expect(modelo.listar_perguntas().length).toBe(0);
});

test('Testando cadastro de três perguntas', () => {
  modelo.cadastrar_pergunta('1 + 1 = ?');
  modelo.cadastrar_pergunta('2 + 2 = ?');
  modelo.cadastrar_pergunta('3 + 3 = ?');
  const perguntas = modelo.listar_perguntas(); 
  expect(perguntas.length).toBe(3);
  expect(perguntas[0].texto).toBe('1 + 1 = ?');
  expect(perguntas[1].texto).toBe('2 + 2 = ?');
  expect(perguntas[2].num_respostas).toBe(0);
  expect(perguntas[1].id_pergunta).toBe(perguntas[2].id_pergunta-1);
});


test('Testando cadastro de respostas', () => {
  modelo.cadastrar_pergunta('1 + 1 = ?');
  const pergunta = modelo.listar_perguntas();
  const id_pergunta = pergunta[0].id_pergunta
  modelo.cadastrar_resposta(id_pergunta,"2")
  resposta = modelo.get_respostas(id_pergunta)
  expect(resposta[0].id_pergunta).toBe(id_pergunta);
  expect(resposta[0].texto).toBe("2");
});

test('Testando buscar perguntas por id', () => {
  modelo.cadastrar_pergunta('1 + 1 = ?');
  const pergunta = modelo.listar_perguntas();
  const perguntaRef = modelo.get_pergunta(pergunta[0].id_pergunta)
  expect(pergunta[0].texto).toBe(perguntaRef.texto);
  expect(pergunta[0].id_pergunta).toBe(perguntaRef.id_pergunta);
});
test('Testando número de respostas', () => {
  modelo.cadastrar_pergunta('Quais são números ímpares?');
  const pergunta = modelo.listar_perguntas();
  const id_pergunta = pergunta[0].id_pergunta
  modelo.cadastrar_resposta(id_pergunta,"1")
  modelo.cadastrar_resposta(id_pergunta,"3")
  modelo.cadastrar_resposta(id_pergunta,"5")
  num_resposta = modelo.get_num_respostas(id_pergunta)
  expect(num_resposta).toBe(3);
});