CREATE TABLE cliente
(
	id_cliente           CHAR(18) NOT NULL ,
	nombre_completo      VARCHAR2(20) NULL ,
	numero               INTEGER NULL 
);



ALTER TABLE cliente
	ADD CONSTRAINT  XPKcliente PRIMARY KEY (id_cliente);



CREATE TABLE empleados
(
	id_empleado          CHAR(18) NOT NULL ,
	nombre_completo      VARCHAR2(20) NULL ,
	edad                 INTEGER NULL ,
	numero               INTEGER NULL ,
	fecha_contratacion   DATE NULL 
);



ALTER TABLE empleados
	ADD CONSTRAINT  XPKempleados PRIMARY KEY (id_empleado);



CREATE TABLE encargos
(
	id_encargo           CHAR(18) NOT NULL ,
	id_cliente           CHAR(18) NULL ,
	descripcion          VARCHAR2(20) NULL ,
	costo                INTEGER NULL ,
	fecha_encargo        DATE NULL ,
	fecha_llegada        DATE NULL ,
	id_empleado          CHAR(18) NULL 
);



ALTER TABLE encargos
	ADD CONSTRAINT  XPKencargos PRIMARY KEY (id_encargo);



CREATE TABLE servicios
(
	id_servicio          CHAR(18) NOT NULL ,
	equipo               VARCHAR2(20) NULL ,
	descripcion          VARCHAR2(20) NULL ,
	fecha_entrega        DATE NULL ,
	id_empleado          CHAR(18) NULL ,
	costo                VARCHAR2(20) NULL ,
	id_sucursal          CHAR(18) NULL 
);



ALTER TABLE servicios
	ADD CONSTRAINT  XPKservicios PRIMARY KEY (id_servicio);



CREATE TABLE servicios_hechos
(
	id_cliente           CHAR(18) NOT NULL ,
	fecha_salida         DATE NULL ,
	id_servicio          CHAR(18) NOT NULL ,
	solucion             VARCHAR2(20) NULL 
);



ALTER TABLE servicios_hechos
  DROP CONSTRAINT R_3;

ALTER TABLE servicios_hechos
  ADD CONSTRAINT R_3 FOREIGN KEY (id_servicio)
  REFERENCES servicios (id_servicio)
  ON DELETE CASCADE;



CREATE TABLE sucursal
(
	id_sucursal          CHAR(18) NOT NULL ,
	direccion            VARCHAR2(20) NULL ,
	localidad            VARCHAR2(20) NULL 
);



ALTER TABLE sucursal
	ADD CONSTRAINT  XPKsucursal PRIMARY KEY (id_sucursal);



ALTER TABLE encargos
	ADD (CONSTRAINT R_5 FOREIGN KEY (id_cliente) REFERENCES cliente (id_cliente) ON DELETE SET NULL);



ALTER TABLE encargos
	ADD (CONSTRAINT R_6 FOREIGN KEY (id_empleado) REFERENCES empleados (id_empleado) ON DELETE SET NULL);



ALTER TABLE servicios
	ADD (CONSTRAINT R_4 FOREIGN KEY (id_empleado) REFERENCES empleados (id_empleado) ON DELETE SET NULL);



ALTER TABLE servicios
	ADD (CONSTRAINT R_7 FOREIGN KEY (id_sucursal) REFERENCES sucursal (id_sucursal) ON DELETE SET NULL);



ALTER TABLE servicios_hechos
	ADD (CONSTRAINT R_1 FOREIGN KEY (id_cliente) REFERENCES cliente (id_cliente));



ALTER TABLE servicios_hechos
	ADD (CONSTRAINT R_3 FOREIGN KEY (id_servicio) REFERENCES servicios (id_servicio));

-- DATOS DE PRUEBA

-- Clientes
INSERT INTO cliente VALUES ('C1', 'Juan Pérez', 1234);
INSERT INTO cliente VALUES ('C2', 'Ana Gómez', 5678);
INSERT INTO cliente VALUES ('C3', 'Carlos Ruiz', 9101);
INSERT INTO cliente VALUES ('C4', 'Laura Torres', 1121);
INSERT INTO cliente VALUES ('C5', 'Marta Díaz', 3141);
INSERT INTO cliente VALUES ('C6', 'Luis Moreno', 5161);
INSERT INTO cliente VALUES ('C7', 'Sofía Castro', 7181);
INSERT INTO cliente VALUES ('C8', 'Diego León', 9202);
INSERT INTO cliente VALUES ('C9', 'Paula Ríos', 1222);
INSERT INTO cliente VALUES ('C10', 'Manuel Ortega', 3242);

-- Empleados
INSERT INTO empleados VALUES ('E1', 'Pedro Sáenz', 30, 1001, TO_DATE('2022-01-15', 'YYYY-MM-DD'));
INSERT INTO empleados VALUES ('E2', 'Lucía Méndez', 28, 1002, TO_DATE('2021-03-22', 'YYYY-MM-DD'));
INSERT INTO empleados VALUES ('E3', 'Ricardo Núñez', 35, 1003, TO_DATE('2020-06-10', 'YYYY-MM-DD'));
INSERT INTO empleados VALUES ('E4', 'Verónica Gil', 40, 1004, TO_DATE('2019-09-01', 'YYYY-MM-DD'));
INSERT INTO empleados VALUES ('E5', 'Oscar Bravo', 33, 1005, TO_DATE('2023-02-18', 'YYYY-MM-DD'));
INSERT INTO empleados VALUES ('E6', 'Tamara Vega', 26, 1006, TO_DATE('2023-07-11', 'YYYY-MM-DD'));
INSERT INTO empleados VALUES ('E7', 'Adrián Castro', 38, 1007, TO_DATE('2020-12-05', 'YYYY-MM-DD'));
INSERT INTO empleados VALUES ('E8', 'María López', 29, 1008, TO_DATE('2021-08-23', 'YYYY-MM-DD'));
INSERT INTO empleados VALUES ('E9', 'Raúl Torres', 31, 1009, TO_DATE('2022-10-10', 'YYYY-MM-DD'));
INSERT INTO empleados VALUES ('E10', 'Isabel Rojas', 27, 1010, TO_DATE('2024-01-03', 'YYYY-MM-DD'));

-- Sucursales
INSERT INTO sucursal VALUES ('S1', 'Av. Central 123', 'Quito');
INSERT INTO sucursal VALUES ('S2', 'Calle 45 Sur', 'Guayaquil');
INSERT INTO sucursal VALUES ('S3', 'Av. Mitre 800', 'Cuenca');
INSERT INTO sucursal VALUES ('S4', 'Av. Mariscal 321', 'Quito');
INSERT INTO sucursal VALUES ('S5', 'Los Álamos', 'Loja');
INSERT INTO sucursal VALUES ('S6', 'Bolívar 400', 'Ambato');
INSERT INTO sucursal VALUES ('S7', 'Av. Del Sol 101', 'Quito');
INSERT INTO sucursal VALUES ('S8', 'Libertad 55', 'Manta');
INSERT INTO sucursal VALUES ('S9', 'Via Costa', 'Guayaquil');
INSERT INTO sucursal VALUES ('S10', 'Espejo 200', 'Cuenca');

-- Servicios
INSERT INTO servicios VALUES ('S1', 'Laptop', 'Cambio disco', TO_DATE('2024-04-01','YYYY-MM-DD'), 'E1', '150', 'S1');
INSERT INTO servicios VALUES ('S2', 'PC', 'Formateo', TO_DATE('2024-04-02','YYYY-MM-DD'), 'E2', '100', 'S2');
INSERT INTO servicios VALUES ('S3', 'Monitor', 'Revisión', TO_DATE('2024-04-03','YYYY-MM-DD'), 'E3', '80', 'S3');
INSERT INTO servicios VALUES ('S4', 'Impresora', 'Limpieza', TO_DATE('2024-04-04','YYYY-MM-DD'), 'E4', '60', 'S4');
INSERT INTO servicios VALUES ('S5', 'Router', 'Configuración', TO_DATE('2024-04-05','YYYY-MM-DD'), 'E5', '90', 'S5');
INSERT INTO servicios VALUES ('S6', 'Tablet', 'Actualización', TO_DATE('2024-04-06','YYYY-MM-DD'), 'E6', '110', 'S6');
INSERT INTO servicios VALUES ('S7', 'Servidor', 'Migración', TO_DATE('2024-04-07','YYYY-MM-DD'), 'E7', '200', 'S7');
INSERT INTO servicios VALUES ('S8', 'Celular', 'Cambio batería', TO_DATE('2024-04-08','YYYY-MM-DD'), 'E8', '70', 'S8');
INSERT INTO servicios VALUES ('S9', 'Laptop', 'Pantalla rota', TO_DATE('2024-04-09','YYYY-MM-DD'), 'E9', '180', 'S9');
INSERT INTO servicios VALUES ('S10', 'PC', 'Instalación SO', TO_DATE('2024-04-10','YYYY-MM-DD'), 'E10', '120', 'S10');

-- Servicios hechos
INSERT INTO servicios_hechos VALUES ('C1', TO_DATE('2024-05-01','YYYY-MM-DD'), 'S1', 'Exitoso');
INSERT INTO servicios_hechos VALUES ('C2', TO_DATE('2024-05-02','YYYY-MM-DD'), 'S2', 'Completado');
INSERT INTO servicios_hechos VALUES ('C3', TO_DATE('2024-05-03','YYYY-MM-DD'), 'S3', 'OK');
INSERT INTO servicios_hechos VALUES ('C4', TO_DATE('2024-05-04','YYYY-MM-DD'), 'S4', 'Bien');
INSERT INTO servicios_hechos VALUES ('C5', TO_DATE('2024-05-05','YYYY-MM-DD'), 'S5', 'Correcto');
INSERT INTO servicios_hechos VALUES ('C6', TO_DATE('2024-05-06','YYYY-MM-DD'), 'S6', 'Funciona');
INSERT INTO servicios_hechos VALUES ('C7', TO_DATE('2024-05-07','YYYY-MM-DD'), 'S7', 'Entregado');
INSERT INTO servicios_hechos VALUES ('C8', TO_DATE('2024-05-08','YYYY-MM-DD'), 'S8', 'Verificado');
INSERT INTO servicios_hechos VALUES ('C9', TO_DATE('2024-05-09','YYYY-MM-DD'), 'S9', 'Listo');
INSERT INTO servicios_hechos VALUES ('C10', TO_DATE('2024-05-10','YYYY-MM-DD'), 'S10', 'Hecho');

-- Encargos
INSERT INTO encargos VALUES ('EN1', 'C1', 'Reparar teclado', 50, TO_DATE('2024-04-01','YYYY-MM-DD'), TO_DATE('2024-04-03','YYYY-MM-DD'), 'E1');
INSERT INTO encargos VALUES ('EN2', 'C2', 'Cambio RAM', 70, TO_DATE('2024-04-02','YYYY-MM-DD'), TO_DATE('2024-04-04','YYYY-MM-DD'), 'E2');
INSERT INTO encargos VALUES ('EN3', 'C3', 'Limpieza CPU', 40, TO_DATE('2024-04-03','YYYY-MM-DD'), TO_DATE('2024-04-05','YYYY-MM-DD'), 'E3');
INSERT INTO encargos VALUES ('EN4', 'C4', 'Actualizar BIOS', 60, TO_DATE('2024-04-04','YYYY-MM-DD'), TO_DATE('2024-04-06','YYYY-MM-DD'), 'E4');
INSERT INTO encargos VALUES ('EN5', 'C5', 'Instalar SSD', 80, TO_DATE('2024-04-05','YYYY-MM-DD'), TO_DATE('2024-04-07','YYYY-MM-DD'), 'E5');
INSERT INTO encargos VALUES ('EN6', 'C6', 'Revisión fuente', 55, TO_DATE('2024-04-06','YYYY-MM-DD'), TO_DATE('2024-04-08','YYYY-MM-DD'), 'E6');
INSERT INTO encargos VALUES ('EN7', 'C7', 'Instalar drivers', 30, TO_DATE('2024-04-07','YYYY-MM-DD'), TO_DATE('2024-04-09','YYYY-MM-DD'), 'E7');
INSERT INTO encargos VALUES ('EN8', 'C8', 'Pantalla azul', 90, TO_DATE('2024-04-08','YYYY-MM-DD'), TO_DATE('2024-04-10','YYYY-MM-DD'), 'E8');
INSERT INTO encargos VALUES ('EN9', 'C9', 'Falla disco', 100, TO_DATE('2024-04-09','YYYY-MM-DD'), TO_DATE('2024-04-11','YYYY-MM-DD'), 'E9');
INSERT INTO encargos VALUES ('EN10', 'C10', 'Backup datos', 65, TO_DATE('2024-04-10','YYYY-MM-DD'), TO_DATE('2024-04-12','YYYY-MM-DD'), 'E10');