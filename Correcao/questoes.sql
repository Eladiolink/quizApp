-- Carregar as questoes:

SELECT qa.id,a.ano
     , numero_questao
     , area_conhecimento
     , opcao_correta 
  FROM questoes_atividade qa 
  JOIN atividade a 
    ON qa.id_atividade = a.id;

-- Pega a QUESTAO PELO O SEU id e o Modelo desejado

SELECT correcao 
  FROM questoes_corrigida 
 WHERE id_questao = 1 
   AND modelo = 'gpt-4'