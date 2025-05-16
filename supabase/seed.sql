-- Insert sample companies
INSERT INTO companies (name, logo_url, category, website, phone, email, address) VALUES
('Claro', 'https://example.com/claro.png', 'Telecomunicações', 'https://www.claro.com.br', '(11) 4000-0000', 'atendimento@claro.com.br', 'Av. Paulista, 1000, São Paulo - SP'),
('Vivo', 'https://example.com/vivo.png', 'Telecomunicações', 'https://www.vivo.com.br', '(11) 4000-0001', 'atendimento@vivo.com.br', 'Av. Paulista, 1001, São Paulo - SP'),
('Tim', 'https://example.com/tim.png', 'Telecomunicações', 'https://www.tim.com.br', '(11) 4000-0002', 'atendimento@tim.com.br', 'Av. Paulista, 1002, São Paulo - SP'),
('Oi', 'https://example.com/oi.png', 'Telecomunicações', 'https://www.oi.com.br', '(11) 4000-0003', 'atendimento@oi.com.br', 'Av. Paulista, 1003, São Paulo - SP'),
('Magazine Luiza', 'https://example.com/magalu.png', 'E-commerce', 'https://www.magazineluiza.com.br', '(11) 4000-0004', 'atendimento@magazineluiza.com.br', 'Av. Paulista, 1004, São Paulo - SP'),
('Americanas', 'https://example.com/americanas.png', 'E-commerce', 'https://www.americanas.com.br', '(11) 4000-0005', 'atendimento@americanas.com.br', 'Av. Paulista, 1005, São Paulo - SP'),
('Submarino', 'https://example.com/submarino.png', 'E-commerce', 'https://www.submarino.com.br', '(11) 4000-0006', 'atendimento@submarino.com.br', 'Av. Paulista, 1006, São Paulo - SP'),
('Netflix', 'https://example.com/netflix.png', 'Streaming', 'https://www.netflix.com.br', '(11) 4000-0007', 'atendimento@netflix.com.br', 'Av. Paulista, 1007, São Paulo - SP'),
('Amazon Prime', 'https://example.com/prime.png', 'Streaming', 'https://www.primevideo.com', '(11) 4000-0008', 'atendimento@primevideo.com', 'Av. Paulista, 1008, São Paulo - SP'),
('Disney+', 'https://example.com/disney.png', 'Streaming', 'https://www.disneyplus.com', '(11) 4000-0009', 'atendimento@disneyplus.com', 'Av. Paulista, 1009, São Paulo - SP');

-- Insert sample complaints (you'll need to replace the user_id with actual Clerk user IDs)
INSERT INTO complaints (title, description, status, rating, company_id, user_id) VALUES
('Problema com cobrança indevida', 'Fui cobrado por um serviço que não contratei. Já liguei várias vezes e ninguém resolve.', 'pending', 1, (SELECT id FROM companies WHERE name = 'Claro'), 'user_123'),
('Atendimento péssimo', 'Fiquei mais de 2 horas na fila de atendimento e quando fui atendido, o problema não foi resolvido.', 'in-progress', 2, (SELECT id FROM companies WHERE name = 'Vivo'), 'user_123'),
('Produto com defeito', 'Comprei um celular que veio com defeito. A loja se recusa a trocar.', 'resolved', 3, (SELECT id FROM companies WHERE name = 'Magazine Luiza'), 'user_123'),
('Assinatura cancelada sem aviso', 'Minha assinatura foi cancelada sem nenhum aviso prévio. Perdi todo o conteúdo que tinha salvo.', 'ignored', 1, (SELECT id FROM companies WHERE name = 'Netflix'), 'user_123'),
('Cobrança duplicada', 'Fui cobrado duas vezes pelo mesmo serviço. Já enviei vários e-mails e ninguém responde.', 'pending', 2, (SELECT id FROM companies WHERE name = 'Tim'), 'user_123');

-- Insert sample comments
INSERT INTO comments (content, complaint_id, user_id) VALUES
('Isso aconteceu comigo também!', (SELECT id FROM complaints WHERE title = 'Problema com cobrança indevida'), 'user_456'),
('Tente ligar para a ouvidoria', (SELECT id FROM complaints WHERE title = 'Atendimento péssimo'), 'user_456'),
('Já resolvi meu problema com a Procon', (SELECT id FROM complaints WHERE title = 'Produto com defeito'), 'user_456'),
('Isso é inaceitável!', (SELECT id FROM complaints WHERE title = 'Assinatura cancelada sem aviso'), 'user_456'),
('Tente entrar em contato pelo Twitter', (SELECT id FROM complaints WHERE title = 'Cobrança duplicada'), 'user_456');

-- Insert sample reactions
INSERT INTO reactions (complaint_id, user_id, type) VALUES
((SELECT id FROM complaints WHERE title = 'Problema com cobrança indevida'), 'user_456', 'agree'),
((SELECT id FROM complaints WHERE title = 'Atendimento péssimo'), 'user_456', 'agree'),
((SELECT id FROM complaints WHERE title = 'Produto com defeito'), 'user_456', 'disagree'),
((SELECT id FROM complaints WHERE title = 'Assinatura cancelada sem aviso'), 'user_456', 'agree'),
((SELECT id FROM complaints WHERE title = 'Cobrança duplicada'), 'user_456', 'agree'); 