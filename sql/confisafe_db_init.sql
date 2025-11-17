-- Script de criação do banco e tabelas para importar no MySQL (phpMyAdmin)
-- Cria o banco de dados, tabelas e alguns registros de exemplo

-- 1) Cria o banco (se já existir, mantém)
CREATE DATABASE IF NOT EXISTS `confisafe_db` CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
USE `confisafe_db`;

-- 2) Tabela empresas (corresponde à entidade Empresa.java)
DROP TABLE IF EXISTS `empresas`;
CREATE TABLE `empresas` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `razao_social` VARCHAR(255) NOT NULL,
  `cnpj` VARCHAR(32) NOT NULL,
  `email_corporativo` VARCHAR(255) NOT NULL,
  `telefone` VARCHAR(32) NOT NULL,
  `nome_responsavel` VARCHAR(255) NOT NULL,
  `cpf` VARCHAR(32) NOT NULL,
  `cargo` VARCHAR(255) NOT NULL,
  `senha` VARCHAR(255) NOT NULL,
  `data_cadastro` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_atualizacao` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_empresas_cnpj` (`cnpj`),
  UNIQUE KEY `uk_empresas_email` (`email_corporativo`),
  UNIQUE KEY `uk_empresas_cpf` (`cpf`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3) Tabela usuarios (corresponde à entidade Usuario.java)
DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `senha` VARCHAR(255) NOT NULL,
  `nome_completo` VARCHAR(255) DEFAULT NULL,
  `cargo` VARCHAR(255) DEFAULT NULL,
  `departamento` VARCHAR(255) DEFAULT NULL,
  `telefone` VARCHAR(64) DEFAULT NULL,
  `ramal` VARCHAR(32) DEFAULT NULL,
  `foto_perfil` LONGTEXT DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_usuarios_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4) Inserir usuários de exemplo
INSERT INTO `usuarios` (`email`, `senha`, `nome_completo`, `cargo`, `departamento`, `telefone`, `ramal`) VALUES
('michael.coutinho@confisafe.com', 'senha123', 'Michael Coutinho', 'Técnico de Segurança', 'seguranca', '(11) 98765-4321', '2345'),
('admin@confisafe.com', 'admin123', 'Administrador', 'Administrador', 'administrativo', '', ''),
('usuario@confisafe.com', 'usuario123', 'Usuário Exemplo', 'Operador', 'producao', '', '');




