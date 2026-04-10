import * as SQLite from 'expo-sqlite';

// Abrir o crear la base de datos
const db = SQLite.openDatabaseSync('sanAlejo.db');

// Tipos de datos
export interface Contenedor {
  id: number;
  nombre: string;
  descripcion: string;
  ubicacion: string;
}

export interface Objeto {
  id: number;
  nombre: string;
  descripcion: string;
  id_contenedor: number;
}

// Inicializar la base de datos
export const initializeDatabase = async () => {
  try {
    // Crear tabla contenedor
    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS contenedor (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        descripcion TEXT NOT NULL,
        ubicacion TEXT NOT NULL
      );`
    );

    // Crear tabla objeto
    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS objeto (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        descripcion TEXT NOT NULL,
        id_contenedor INTEGER NOT NULL,
        FOREIGN KEY (id_contenedor) REFERENCES contenedor(id) ON DELETE CASCADE
      );`
    );

    console.log('✓ Base de datos inicializada correctamente');
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
    throw error;
  }
};

// ====== OPERACIONES CONTENEDOR ======

export const getAllContenedores = async (): Promise<Contenedor[]> => {
  try {
    const result = await db.getAllAsync<Contenedor>(
      'SELECT * FROM contenedor ORDER BY id DESC'
    );
    return result || [];
  } catch (error) {
    console.error('Error al obtener contenedores:', error);
    return [];
  }
};

export const getContenedorById = async (id: number): Promise<Contenedor | null> => {
  try {
    const result = await db.getFirstAsync<Contenedor>(
      'SELECT * FROM contenedor WHERE id = ?',
      [id]
    );
    return result || null;
  } catch (error) {
    console.error('Error al obtener contenedor:', error);
    return null;
  }
};

export const createContenedor = async (
  nombre: string,
  descripcion: string,
  ubicacion: string
): Promise<number> => {
  try {
    const result = await db.runAsync(
      'INSERT INTO contenedor (nombre, descripcion, ubicacion) VALUES (?, ?, ?)',
      [nombre, descripcion, ubicacion]
    );
    return result.lastInsertRowId as number;
  } catch (error) {
    console.error('Error al crear contenedor:', error);
    throw error;
  }
};

export const updateContenedor = async (
  id: number,
  nombre: string,
  descripcion: string,
  ubicacion: string
): Promise<void> => {
  try {
    await db.runAsync(
      'UPDATE contenedor SET nombre = ?, descripcion = ?, ubicacion = ? WHERE id = ?',
      [nombre, descripcion, ubicacion, id]
    );
  } catch (error) {
    console.error('Error al actualizar contenedor:', error);
    throw error;
  }
};

export const deleteContenedor = async (id: number): Promise<void> => {
  try {
    await db.runAsync('DELETE FROM contenedor WHERE id = ?', [id]);
  } catch (error) {
    console.error('Error al eliminar contenedor:', error);
    throw error;
  }
};

// ====== OPERACIONES OBJETO ======

export const getObjetosByContenedor = async (id_contenedor: number): Promise<Objeto[]> => {
  try {
    const result = await db.getAllAsync<Objeto>(
      'SELECT * FROM objeto WHERE id_contenedor = ? ORDER BY id DESC',
      [id_contenedor]
    );
    return result || [];
  } catch (error) {
    console.error('Error al obtener objetos:', error);
    return [];
  }
};

export const getObjetoById = async (id: number): Promise<Objeto | null> => {
  try {
    const result = await db.getFirstAsync<Objeto>(
      'SELECT * FROM objeto WHERE id = ?',
      [id]
    );
    return result || null;
  } catch (error) {
    console.error('Error al obtener objeto:', error);
    return null;
  }
};

export const createObjeto = async (
  nombre: string,
  descripcion: string,
  id_contenedor: number
): Promise<number> => {
  try {
    const result = await db.runAsync(
      'INSERT INTO objeto (nombre, descripcion, id_contenedor) VALUES (?, ?, ?)',
      [nombre, descripcion, id_contenedor]
    );
    return result.lastInsertRowId as number;
  } catch (error) {
    console.error('Error al crear objeto:', error);
    throw error;
  }
};

export const updateObjeto = async (
  id: number,
  nombre: string,
  descripcion: string
): Promise<void> => {
  try {
    await db.runAsync(
      'UPDATE objeto SET nombre = ?, descripcion = ? WHERE id = ?',
      [nombre, descripcion, id]
    );
  } catch (error) {
    console.error('Error al actualizar objeto:', error);
    throw error;
  }
};

export const deleteObjeto = async (id: number): Promise<void> => {
  try {
    await db.runAsync('DELETE FROM objeto WHERE id = ?', [id]);
  } catch (error) {
    console.error('Error al eliminar objeto:', error);
    throw error;
  }
};

// ====== DATOS DE PRUEBA ======

export const loadTestData = async () => {
  try {
    // Verificar si ya hay datos
    const count = await db.getFirstAsync<{ count: number }>(
      'SELECT COUNT(*) as count FROM contenedor'
    );

    if ((count?.count || 0) > 0) {
      console.log('✓ Datos de prueba ya existen');
      return;
    }

    // Contenedor 1
    const id1 = await createContenedor(
      'Caja cocina',
      'Electrodomésticos y utensilios que no uso seguido',
      'Alacena superior cocina'
    );

    await createObjeto('Waflera', 'Waflera eléctrica marca Oster, funciona bien', id1);
    await createObjeto('Moldes navideños', 'Moldes de galletas en forma de estrella y árbol', id1);
    await createObjeto('Exprimidor', 'Exprimidor de naranjas manual, color verde', id1);

    // Contenedor 2
    const id2 = await createContenedor(
      'Maleta ropa invierno',
      'Ropa de clima frío que solo uso en viajes',
      'Closet cuarto principal, parte de arriba'
    );

    await createObjeto('Chaqueta negra', 'Chaqueta North Face talla M', id2);
    await createObjeto('Bufanda gris', 'Bufanda de lana tejida', id2);
    await createObjeto('Guantes', 'Guantes térmicos negros', id2);
    await createObjeto('Gorro de lana', 'Gorro azul oscuro con pompón', id2);

    // Contenedor 3
    const id3 = await createContenedor(
      'Cajón cables',
      'Cables, cargadores y adaptadores varios',
      'Escritorio, segundo cajón'
    );

    await createObjeto('Cable HDMI', 'Cable HDMI 2 metros, negro', id3);
    await createObjeto('Cargador Samsung viejo', 'Cargador micro USB, funciona', id3);
    await createObjeto('Adaptador USB-C', 'Adaptador USB-C a USB-A', id3);

    console.log('✓ Datos de prueba cargados correctamente');
  } catch (error) {
    console.error('Error al cargar datos de prueba:', error);
  }
};
