CREATE TABLE cliente(
    rut VARCHAR(20) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    suscripcion VARCHAR(50) DEFAULT 'mes' CHECK(suscripcion IN ('mes', 'trimestre', 'semestre', 'anual')),
    telefono VARCHAR(12)
);

CREATE TABLE rutina(
    id_rutina INTEGER PRIMARY KEY AUTOINCREMENT,
    clasificacion VARCHAR(100) NOT NULL
);

CREATE TABLE tiene(
    id_rutina REFERENCES rutina(id_rutina) ON DELETE RESTRICT ON UPDATE CASCADE,
    rut REFERENCES cliente(rut),
    PRIMARY KEY (id_rutina, rut)
);

CREATE TABLE evaluacion(
    id_evaluacion INTEGER PRIMARY KEY AUTOINCREMENT,
    peso FLOAT NOT NULL,
    estatura FLOAT NOT NULL,
    grasa FLOAT NOT NULL,
    masa_muscular FLOAT NOT NULL,
    agua FLOAT NOT NULL,
    masa_osea FLOAT NOT NULL,
    edad INTEGEREGER NOT NULL,
    experiencia VARCHAR(15) DEFAULT 'principiante' CHECK(experiencia IN ('principiante', 'intermedio', 'avanzado'))
);

CREATE TABLE posee(
    id_evaluacion REFERENCES evaluacion(id_evaluacion) ON DELETE RESTRICT ON UPDATE CASCADE,
    rut REFERENCES cliente(rut),
    PRIMARY KEY (id_evaluacion, rut)
);

CREATE TABLE entrenador(
    rut_entrenador VARCHAR(20) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
    -- horario
);

CREATE TABLE crea(
    rut_entrenador REFERENCES entrenador(rut_entrenador),
    id_rutina REFERENCES rutina(id_rutina),    
    fecha_rutina DATE NOT NULL DEFAULT CURRENT_DATE,
    PRIMARY KEY (rut_entrenador, id_rutina)
);

CREATE TABLE realiza(
    rut_entrenador REFERENCES entrenador(rut_entrenador),
    rut REFERENCES cliente(rut),
    id_evaluacion REFERENCES evaluacion(id_evaluacion),
    fecha_evaluacion DATE NOT NULL DEFAULT CURRENT_DATE,
    PRIMARY KEY (rut_entrenador, rut, id_evaluacion)
);

CREATE TABLE ejercicio(
    id_ejercicio INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(500),
    clasificacion VARCHAR(100) NOT NULL
);

CREATE TABLE maquina(
    id_maquina INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(100) NOT NULL,
    estado VARCHAR(20) DEFAULT 'disponible' CHECK(estado IN ('disponible', 'mantencion', 'reparacion'))
);

CREATE TABLE contiene(
    id_rutina REFERENCES rutina(id_rutina),
    id_ejercicio REFERENCES ejercicio(id_ejercicio),
    repeticiones INTEGER NOT NULL,
    series INTEGER NOT NULL,
    PRIMARY KEY (id_rutina, id_ejercicio)
);

CREATE TABLE utiliza(
    id_ejercicio REFERENCES ejercicio(id_ejercicio),
    id_maquina REFERENCES maquina(id_maquina),
    PRIMARY KEY (id_ejercicio, id_maquina)
);