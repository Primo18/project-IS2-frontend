INSERT INTO cliente(rut,nombre,suscripcion,telefono) VALUES
('18.123.456-0', 'Jaime', 'anual','+56912344321'),
('18.123.457-0', 'Daniel', 'mes','+56912344321'),
('18.123.458-0', 'Lukas', 'trimestre','+56912344321'),
('18.123.459-0', 'Patricio', 'semestre','+56912344321');

INSERT INTO entrenador(rut_entrenador,nombre) VALUES 
('20.123.321-1', 'Dayan');

INSERT INTO rutina(clasificacion) VALUES 
('Rutina para bajar de peso'),
('Rutina para aumentar masa muscular'),
('Rutina para tonificar');

INSERT INTO tiene(id_rutina,rut) VALUES 
(1,'18.123.456-0'),
(2,'18.123.457-0'),
(3,'18.123.459-0');