INSERT INTO maintenance (
    latest_maintenance, date_next_maintenance, date_maintenance, observation, status, vehicle_identification_id
) VALUES
-- Manutenções para o veículo com ID 1
(DATE_SUB(CURRENT_DATE, INTERVAL 1 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'A troca de óleo é essencial para o funcionamento adequado do motor, garantindo a lubrificação e prevenindo o desgaste prematuro das peças internas. É recomendada sua realização conforme a quilometragem ou tempo estipulado pelo fabricante. Este serviço está atrasado e deve ser priorizado para evitar danos ao veículo.', 'atrasada', 1),
(DATE_SUB(CURRENT_DATE, INTERVAL 2 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'A revisão geral inclui uma inspeção completa dos principais componentes do veículo, como motor, sistema elétrico, freios e suspensão. Este processo assegura a segurança e o desempenho ideal do veículo. Neste caso, a manutenção está em dia.', 'em dia', 1),
(DATE_SUB(CURRENT_DATE, INTERVAL 3 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'A troca de pneus é realizada para garantir a aderência e a estabilidade do veículo em diferentes condições de estrada. É essencial observar os limites de desgaste da banda de rodagem para evitar riscos de acidentes. Os pneus neste veículo foram substituídos recentemente e estão em conformidade.', 'em dia', 1),
(DATE_SUB(CURRENT_DATE, INTERVAL 4 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'Os filtros do veículo, como o de ar, óleo e combustível, são fundamentais para proteger o motor e manter a eficiência do sistema. Substituí-los regularmente evita acúmulo de sujeira e possíveis falhas. Neste caso, os filtros foram trocados dentro do período recomendado.', 'em dia', 1),
(DATE_SUB(CURRENT_DATE, INTERVAL 5 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'O alinhamento e balanceamento asseguram que as rodas estejam ajustadas para uma condução estável e segura, prevenindo o desgaste irregular dos pneus e garantindo maior economia de combustível. A manutenção está em dia.', 'em dia', 1),
(DATE_SUB(CURRENT_DATE, INTERVAL 1 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'A troca de óleo está atrasada. Um óleo velho ou sujo pode causar sérios problemas no motor, como superaquecimento e desgaste excessivo. Este serviço deve ser realizado o mais rápido possível para evitar complicações maiores.', 'atrasada', 1),
(DATE_SUB(CURRENT_DATE, INTERVAL 2 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'A revisão geral do veículo, que abrange a verificação de sistemas cruciais como freios, suspensão e motor, está atualizada. Este processo é vital para garantir o bom funcionamento do carro.', 'em dia', 1),
(DATE_SUB(CURRENT_DATE, INTERVAL 3 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'Os pneus foram recentemente trocados e estão em excelente estado, garantindo a segurança do veículo em frenagens, curvas e em condições adversas, como chuva ou estradas escorregadias.', 'em dia', 1),
(DATE_SUB(CURRENT_DATE, INTERVAL 4 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'A substituição regular dos filtros assegura que o motor receba apenas ar e combustível limpos, melhorando o desempenho e reduzindo o consumo de combustível. Neste caso, os filtros foram trocados dentro do período recomendado', 'em dia', 1),
(DATE_SUB(CURRENT_DATE, INTERVAL 5 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'O alinhamento e balanceamento das rodas estão em dia, proporcionando conforto na direção, maior vida útil dos pneus e menor desgaste em componentes da suspensão.', 'em dia', 1),
(DATE_SUB(CURRENT_DATE, INTERVAL 1 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'A troca de óleo atrasada é uma preocupação que pode levar a problemas de desempenho e até falhas no motor. Recomenda-se realizar este serviço imediatamente.', 'atrasada', 1),
(DATE_SUB(CURRENT_DATE, INTERVAL 2 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'Manter a revisão geral em dia é fundamental para identificar e corrigir problemas antes que se tornem mais graves. Este veículo está atualizado com os serviços necessários.', 'em dia', 1),
(DATE_SUB(CURRENT_DATE, INTERVAL 3 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'Com pneus novos e em boas condições, o veículo está apto para rodar com segurança e eficiência. Manutenção em dia.', 'em dia', 1),
(DATE_SUB(CURRENT_DATE, INTERVAL 4 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'A substituição de filtros realizada recentemente garante um sistema limpo e eficiente, protegendo o motor e melhorando o desempenho geral do veículo.', 'em dia', 1),
(DATE_SUB(CURRENT_DATE, INTERVAL 5 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'O alinhamento e balanceamento realizados no período correto proporcionam estabilidade na condução, maior durabilidade dos pneus e economia de combustível.', 'em dia', 1),

-- Manutenções para o veículo com ID 2
(DATE_SUB(CURRENT_DATE, INTERVAL 1 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'Troca de óleo', 'em dia', 2),
(DATE_SUB(CURRENT_DATE, INTERVAL 2 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'Revisão elétrica', 'em dia', 2),
(DATE_SUB(CURRENT_DATE, INTERVAL 3 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'Troca de amortecedores', 'em dia', 2),
(DATE_SUB(CURRENT_DATE, INTERVAL 4 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'Substituição de correia', 'em dia', 2),
(DATE_SUB(CURRENT_DATE, INTERVAL 5 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'Revisão de freios', 'em dia', 2),

-- Manutenções para o veículo com ID 3
(DATE_SUB(CURRENT_DATE, INTERVAL 1 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'Troca de óleo', 'em dia', 3),
(DATE_SUB(CURRENT_DATE, INTERVAL 2 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'Substituição de bateria', 'em dia', 3),
(DATE_SUB(CURRENT_DATE, INTERVAL 3 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'Troca de pastilhas de freio', 'em dia', 3),
(DATE_SUB(CURRENT_DATE, INTERVAL 4 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'Substituição de pneus', 'em dia', 3),
(DATE_SUB(CURRENT_DATE, INTERVAL 5 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'Revisão completa', 'em dia', 3),

-- Manutenções para o veículo com ID 4
(DATE_SUB(CURRENT_DATE, INTERVAL 1 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'Troca de óleo', 'em dia', 4),
(DATE_SUB(CURRENT_DATE, INTERVAL 2 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'Verificação do sistema de ar', 'em dia', 4),
(DATE_SUB(CURRENT_DATE, INTERVAL 3 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'Troca de lâmpadas', 'em dia', 4),
(DATE_SUB(CURRENT_DATE, INTERVAL 4 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'Substituição de filtros', 'em dia', 4),
(DATE_SUB(CURRENT_DATE, INTERVAL 5 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'Revisão de suspensão', 'em dia', 4),

-- Manutenções para o veículo com ID 5
(DATE_SUB(CURRENT_DATE, INTERVAL 1 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'Troca de óleo', 'em dia', 5),
(DATE_SUB(CURRENT_DATE, INTERVAL 2 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'Revisão do motor', 'em dia', 5),
(DATE_SUB(CURRENT_DATE, INTERVAL 3 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'Troca de correia dentada', 'em dia', 5),
(DATE_SUB(CURRENT_DATE, INTERVAL 4 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'Substituição de velas', 'em dia', 5),
(DATE_SUB(CURRENT_DATE, INTERVAL 5 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'Verificação de freios', 'em dia', 5),

-- Manutenções para o veículo com ID 6
(DATE_SUB(CURRENT_DATE, INTERVAL 1 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'Troca de óleo', 'em dia', 6),
(DATE_SUB(CURRENT_DATE, INTERVAL 2 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'Revisão do motor', 'em dia', 6),
(DATE_SUB(CURRENT_DATE, INTERVAL 3 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'Troca de correia dentada', 'em dia', 6),
(DATE_SUB(CURRENT_DATE, INTERVAL 4 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'Substituição de velas', 'em dia', 6),
(DATE_SUB(CURRENT_DATE, INTERVAL 5 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'Verificação de freios', 'em dia', 6),

-- Manutenções para o veículo com ID 7
(DATE_SUB(CURRENT_DATE, INTERVAL 1 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'Troca de óleo', 'em dia', 7),
(DATE_SUB(CURRENT_DATE, INTERVAL 2 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'Revisão do motor', 'em dia', 7),
(DATE_SUB(CURRENT_DATE, INTERVAL 3 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'Troca de correia dentada', 'em dia', 7),
(DATE_SUB(CURRENT_DATE, INTERVAL 4 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'Substituição de velas', 'em dia', 7),
(DATE_SUB(CURRENT_DATE, INTERVAL 5 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'Verificação de freios', 'em dia', 7),

-- Manutenções para o veículo com ID 8
(DATE_SUB(CURRENT_DATE, INTERVAL 1 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'Troca de óleo', 'em dia', 8),
(DATE_SUB(CURRENT_DATE, INTERVAL 2 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'Revisão do motor', 'em dia', 8),
(DATE_SUB(CURRENT_DATE, INTERVAL 3 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'Troca de correia dentada', 'em dia', 8),
(DATE_SUB(CURRENT_DATE, INTERVAL 4 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'Substituição de velas', 'em dia', 8),
(DATE_SUB(CURRENT_DATE, INTERVAL 5 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'Verificação de freios', 'em dia', 8),

-- Manutenções para o veículo com ID 9
(DATE_SUB(CURRENT_DATE, INTERVAL 1 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'Troca de óleo', 'em dia', 9),
(DATE_SUB(CURRENT_DATE, INTERVAL 2 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'Revisão do motor', 'em dia', 9),
(DATE_SUB(CURRENT_DATE, INTERVAL 3 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'Troca de correia dentada', 'em dia', 9),
(DATE_SUB(CURRENT_DATE, INTERVAL 4 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'Substituição de velas', 'em dia', 9),
(DATE_SUB(CURRENT_DATE, INTERVAL 5 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'Verificação de freios', 'em dia', 9),

-- Manutenções para o veículo com ID 10
(DATE_SUB(CURRENT_DATE, INTERVAL 1 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'Troca de óleo', 'em dia', 10),
(DATE_SUB(CURRENT_DATE, INTERVAL 2 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'Revisão do motor', 'em dia', 10),
(DATE_SUB(CURRENT_DATE, INTERVAL 3 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'Troca de correia dentada', 'em dia', 10),
(DATE_SUB(CURRENT_DATE, INTERVAL 4 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'Substituição de velas', 'em dia', 10),
(DATE_SUB(CURRENT_DATE, INTERVAL 5 MONTH), DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), NULL, 'Verificação de freios', 'em dia', 10);