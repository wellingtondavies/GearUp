CREATE TABLE IF NOT EXISTS `usuarios` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`nome` varchar(100) NOT NULL,
	`email` varchar(255) NOT NULL,
	`senha_hash` varchar(255) NOT NULL,
	`criado_em` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`),
	CONSTRAINT `uq_usuarios_email` UNIQUE (email)
);
CREATE TABLE IF NOT EXISTS `itens` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`usuario_id` bigint NOT NULL,
	`titulo` varchar(120) NOT NULL,
	`descricao` text NOT NULL,
	`categoria` varchar(60) NOT NULL DEFAULT 'Geral',
	`valor_dia` decimal(10,2) NOT NULL,
	`cidade` varchar(120) NOT NULL DEFAULT 'Não informada',
	`disponivel` tinyint NOT NULL DEFAULT 1,
	`imagem` longtext,
	`criado_em` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`atualizado_em` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`)
);
ALTER TABLE `itens` ADD CONSTRAINT `fk_itens_usuarios` FOREIGN KEY (usuario_id) REFERENCES usuarios (id);
CREATE INDEX `idx_itens_usuario_id` USING BTREE ON `itens` (`usuario_id`);