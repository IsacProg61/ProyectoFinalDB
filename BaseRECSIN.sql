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
	ADD CONSTRAINT  XPKservicios_hechos PRIMARY KEY (id_cliente,id_servicio);



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