<img width="720" height="1476" alt="image" src="https://github.com/user-attachments/assets/8cfdd6a4-e915-44e9-b5e1-e09a6e473c01" />


## Descripción

San Alejo es una solución práctica diseñada para resolver un problema universal que enfrentan muchas personas: perder la noción de qué has guardado y dónde. Cuando acumulamos objetos en diferentes espacios de nuestro hogar o lugar de trabajo, resulta tremendamente frustrante no poder recordar dónde exactamente guardamos algo específico.

Esta aplicación móvil te proporciona un sistema completo de gestión de inventarios que funciona completamente en tu dispositivo, sin requerir conexión a internet ni dependencias externas. Con San Alejo puedes:

- **Crear y organizar contenedores** de almacenamiento con características detalladas como ubicación, descripción y categorización
- **Registrar cada objeto** de forma individual dentro de cada contenedor, incluyendo descripciones completas de su contenido
- **Localizar rápidamente** cualquier objeto consultando la aplicación en cualquier momento
- **Mantener historial completo** de todo tu inventario, sincronizado localmente en tu dispositivo para acceso permanente
- **Gestionar cambios** de forma sencilla cuando muevas, añadas o elimines objetos

<img width="720" height="1452" alt="image" src="https://github.com/user-attachments/assets/38668772-dff7-4244-aefc-7e9c7a9d1084" />
<img width="720" height="986" alt="image" src="https://github.com/user-attachments/assets/1c70f8ee-e9f4-4b5b-b16e-ea22cac2ecca" />


## Por qué San Alejo

Muchas personas se olvidan dónde guardaron sus cosas. Cuando necesitas encontrar algo específico, desenterrar cajas y contenedores es frustrante y consume tiempo. San Alejo elimina esta problemática al:

- **Mantener un registro digital**: Todos tus objetos están catalogados en una base de datos personal, accesible desde tu bolsillo
- **Ahorrar tiempo**: En lugar de buscar físicamente, consulta la app y sabrás exactamente dónde está lo que necesitas
- **Asegurar privacidad**: Tus datos nunca se envían a servidores externos, permanecen completamente en tu dispositivo
- **Funcionar sin internet**: No necesitas conexión mientras uses la app, tu información siempre está disponible localmente
- **Ser completamente gratuita y de código abierto**: Sin suscripciones, sin publicidad, sin limitaciones

## Características Principales

- **Base de datos local con SQLite**: Todos tus datos se guardan directamente en tu dispositivo mediante SQLite, garantizando persistencia, privacidad y disponibilidad sin necesidad de conexión a internet. Tus datos siempre están protegidos localmente.

- **Interfaz intuitiva y accesible**: Diseñada pensando en la usabilidad, con navegación fluida que facilita moverte entre tus contenedores y objetos sin complejidades innecesarias. La interfaz es clara y fácil de usar incluso para usuarios no técnicos.

- **Operaciones CRUD completas**: Sistema robusto que permite crear nuevos contenedores y objetos, visualizar toda tu información, actualizar detalles en cualquier momento e eliminar lo que ya no necesitas. Cada operación es rápida y segura.

- **Visualización y organización integral**: Visualiza de una sola vez todos tus contenedores y su contenido completo, permitiéndote tener una vista de 360 grados de tu inventario total.

- **Multiplataforma con Expo**: Desarrollada con React Native y Expo, la aplicación funciona sin problemas en iOS y Android, ofreciéndote flexibilidad para usar el mismo código en ambas plataformas.

## Stack Tecnológico

- **Framework**: React Native 0.81.5 con Expo 54.0.33 - Framework multiplataforma que permite escribir una sola base de código para iOS y Android
- **Lenguaje de Programación**: TypeScript 5.9.2 - Proporciona tipado estático para mayor seguridad y calidad del código
- **Base de datos**: SQLite a través de expo-sqlite 15.0.15 - Motor de base de datos ligero y embebido ideal para aplicaciones móviles
- **Sistema de Navegación**: Expo Router 60.0.23 - Enrutamiento basado en el sistema de archivos que simplifica la navegación entre pantallas
- **Gestión de Estado**: React Hooks (19.1.0) - useState para estado local, useCallback para optimización de funciones, useFocusEffect para acciones al cambiar de pantalla
- **Versión de la Aplicación**: 1.0.0

## Requisitos

- Node.js 16 o superior
- npm o yarn
- Expo CLI (opcional, pero recomendado)
- Dispositivo móvil con Expo Go instalado o emulador

## Instalación

1. Navegar a la carpeta del proyecto

   ```bash
   cd "c:...\SanAlejoApp"
   ```

2. Instalar todas las dependencias del proyecto

   ```bash
   npm install
   ```

   Este comando descargará e instalará React Native, Expo, SQLite, TypeScript y todas las librerías necesarias especificadas en el package.json.

## Uso

### Iniciar el Servidor de Desarrollo

```bash
npx expo start
```

Este comando inicia el servidor de desarrollo de Expo. Una vez ejecutado, verás una terminal interactiva con varias opciones para ejecutar la aplicación:

**Opciones disponibles:**

- **Presionar `i`**: Abre la aplicación en el simulador de iOS (requiere macOS). El emulador se iniciará automáticamente y cargará tu aplicación.

- **Presionar `a`**: Abre la aplicación en el emulador de Android (funciona en Windows, Mac y Linux). Se conectará automáticamente al servidor de desarrollo.

- **Escanear código QR**: Muestra un código QR en la terminal que puedes escanear con la cámara de tu dispositivo o con la aplicación Expo Go instalada. Esto permite probar la aplicación en un dispositivo real sin necesidad de compilación nativa.

**Tip**: Para mejor rendimiento y experiencia realista, se recomienda usar un emulador o dispositivo físico en lugar de la versión web.

### Flujo de la aplicación

1. **Pantalla Principal - Lista de Contenedores**: Esta es la pantalla de inicio donde se visualizan todos los contenedores que has creado. Desde aquí puedes:
   - Ver un listado completo de todos tus contenedores con información resumida
   - Acceder mediante un botón flotante (+) para crear un nuevo contenedor
   - Tocar cualquier contenedor para ingresar a su vista detallada y ver todo su contenido
   - Gestionar tus contenedores de forma rápida y organizada

2. **Pantalla de Detalle del Contenedor**: Al seleccionar un contenedor, accedes a una vista más profunda donde puedes:
   - Visualizar toda la información detallada del contenedor (nombre, descripción, ubicación)
   - Ver un listado completo de todos los objetos almacenados dentro de ese contenedor
   - Editar la información del contenedor en cualquier momento
   - Eliminar el contenedor completo (con confirmación de seguridad) - esto eliminará automáticamente todos sus objetos
   - Usar el botón flotante para agregar nuevos objetos al contenedor

3. **Formularios de Entrada de Datos**: Para crear o editar contenedores y objetos, la aplicación proporciona formularios intuitivos que:
   - Validan automáticamente que todos los campos obligatorios estén completos
   - Previenen el guardado de información incompleta
   - Guardan los cambios automáticamente en la base de datos SQLite local
   - Ofrecen retroalimentación clara de lo que está sucediendo

## Estructura del Proyecto

```
SanAlejoApp/
├── app/
│   ├── index.tsx                 # Pantalla principal de contenedores
│   ├── _layout.tsx               # Configuración de rutas
│   ├── addContenedor.tsx         # Formulario crear contenedor
│   ├── addObjeto.tsx             # Formulario crear objeto
│   ├── contenedor/
│   │   └── [id].tsx              # Detalle de contenedor
│   ├── editContenedor/
│   │   └── [id].tsx              # Formulario editar contenedor
│   └── editObjeto/
│       └── [id].tsx              # Formulario editar objeto
├── components/                   # Componentes reutilizables
├── constants/
│   └── theme.ts                  # Temas y colores
├── assets/                       # Recursos estáticos
├── db.ts                         # Capa de datos SQLite
├── package.json
└── app.json
```

## API de Base de Datos

La aplicación utiliza SQLite como motor de persistencia. Todas las operaciones de datos se realizan a través de funciones bien definidas disponibles en el archivo `db.ts`.

### Operaciones con Contenedores

- **`initializeDatabase()`** - Ejecuta la inicialización de las tablas SQL en primer inicio. Crea la estructura de tablas necesarias para almacenar contenedores y objetos.

- **`crearContenedor(nombre, descripcion, ubicacion)`** - Añade un nuevo contenedor a la base de datos con la información proporcionada. Devuelve el ID del contenedor creado.

- **`obtenerContenedores()`** - Recupera la lista completa de todos los contenedores almacenados. Se utiliza principalmente en la pantalla principal.

- **`obtenerContenedorPorId(id)`** - Busca y recupera un contenedor específico usando su identificador único.

- **`actualizarContenedor(id, nombre, descripcion, ubicacion)`** - Modifica los datos de un contenedor existente. Útil para corregir información o cambiar la ubicación de un contenedor.

- **`eliminarContenedor(id)`** - Borra un contenedor y, en cascada, todos los objetos asociados a él de la base de datos.

### Operaciones con Objetos

- **`crearObjeto(nombre, descripcion, idContenedor)`** - Registra un nuevo objeto dentro de un contenedor específico. El `idContenedor` vincula automáticamente el objeto con su contenedor padre.

- **`obtenerObjetos(idContenedor)`** - Recupera todos los objetos que pertenecen a un contenedor específico. Se utiliza para mostrar el contenido en la pantalla de detalle.

- **`obtenerObjetoPorId(id)`** - Busca un objeto individual usando su ID, útil para operaciones de edición.

- **`actualizarObjeto(id, nombre, descripcion)`** - Modifica los datos de un objeto existente manteniendo su asociación con el contenedor.

- **`eliminarObjeto(id)`** - Elimina un objeto específico de la base de datos.

## Modelo de Datos

La aplicación utiliza un modelo relacional simple pero efectivo basado en dos tablas principales:

### Tabla: Contenedor

Guarda información sobre los espacios de almacenamiento. Cada contenedor tiene:

- **ID único**: Identificador automático
- **Nombre**: Identificación del contenedor (ej: "Caja de cocina")
- **Descripción**: Detalles adicionales sobre el contenedor
- **Ubicación**: Dónde está físicamente ubicado

### Tabla: Objeto

Guarda los elementos individuales dentro de cada contenedor:

- **ID único**: Identificador automático
- **Nombre**: Nombre del objeto
- **Descripción**: Detalles del objeto
- **ID Contenedor**: Referencia al contenedor padre (relación en cascada)

Esta relación en cascada asegura que cuando elimines un contenedor, todos sus objetos se eliminen automáticamente, manteniendo la integridad de los datos.

## Configuración y Personalización

### Temas y Estilos

Todos los temas visuales, colores, tipografía y espaciados de la aplicación se centralizan en `constants/theme.ts`. Esto permite:

- **Consistencia visual**: Todos los componentes utilizan los mismos colores y estilos definidos en un único lugar
- **Mantenimiento fácil**: Para cambiar la apariencia completa, solo necesitas modificar el archivo de tema
- **Personalización rápida**: Puedes personalizar:
  - Colores primarios y secundarios de la interfaz
  - Fuentes y tamaños de texto
  - Espaciados, márgenes y rellenos de los componentes
  - Sombras y efectos visuales

### Componentes Reutilizables

La carpeta `components/` contiene componentes React que se reutilizan en múltiples pantallas, promoviendo código DRY (Don't Repeat Yourself) y facilitando el mantenimiento.

## Cómo Funciona Internamente

### Sistema de Navegación con Expo Router

La aplicación utiliza Expo Router, un sistema de enrutamiento basado en archivos similar a Next.js. Esto significa:

- **Estructura intuitiva**: Los archivos en la carpeta `app/` se convierten automáticamente en rutas
- **Navegación dinámica**: Los parámetros se pasan a través de la URL (ej: `/contenedor/[id]` para mostrar un contenedor específico)
- **Sin configuración manual**: No necesitas configurar un enrutador central, todo es automático
- **Layout compartido**: El archivo `_layout.tsx` define la estructura visual que comparten todas las pantallas

### Flujo de Datos en la Aplicación

1. **Inicialización**: Al abrir la app, se ejecuta `initializeDatabase()` que crea las tablas SQLite si no existen
2. **Carga de Datos**: Los contenedores se cargan desde SQLite y se muestran en la pantalla principal
3. **Interacción del Usuario**: Cuando creas, editas o eliminas algo, la acción se guarda inmediatamente en SQLite
4. **Actualización de UI**: React detecta los cambios y actualiza la pantalla automáticamente
5. **Persistencia**: Los datos permanecen en SQLite incluso después de cerrar la app

### Sistema de Hooks Personalizados

La aplicación probablemente utiliza hooks de React personalizados para:

- **`useEffect` y `useFocusEffect`**: Se ejecutan cuando la pantalla se carga o recupera el foco
- **`useState`**: Gestiona el estado local de formularios y vistas
- **`useCallback`**: Optimiza funciones para evitar renders innecesarios
- Esto mantiene el código limpio, modular y fácil de mantener

## Troubleshooting y Soluciones Comunes

### Los cambios en el código no aparecen en la app

Durante el desarrollo, si realizas cambios en los archivos y no los ves reflejados inmediatamente:

- Presiona `r` en la terminal de Expo para hacer una recarga completa de la aplicación
- Si la recarga no funciona, intenta presionar `s` para hacer un reload desde cero
- Para cambios muy profundos, cierra la app y vuelve a iniciarla

### La base de datos aparece vacía después de cerrar la app

Los datos se guardan localmente en SQLite de manera persistente. Si experimentas pérdida de datos:

- Verifica que la aplicación se cierre correctamente sin errores
- Revisa la consola del terminal de Expo para mensajes de error de base de datos
- Asegúrate de que la función `initializeDatabase()` se ejecute correctamente en el inicio
- En emuladores, a veces los datos pueden perderse si el emulador falla incorrectamente

### Errores de conexión con Expo Go

Si no puedes conectarte a tu dispositivo:

- Verifica que tu dispositivo y computadora estén en la misma red WiFi
- Intenta hacer escanear nuevamente el código QR
- Reinicia la app de Expo Go en tu dispositivo
- En Windows, asegúrate de que el firewall no bloquea Expo

## Desarrollo y Mantenimiento

### Ejecutar en modo desarrollo

```bash
npx expo start
```

Este comando inicia el servidor de desarrollo de Expo, que:

- Monitorea los cambios en tus archivos
- Recompila automáticamente el código
- Permite recargas rápidas (hot reload) para una experiencia de desarrollo ágil
- Proporciona acceso a herramientas de depuración

### Validación de código con Linting

```bash
npm run lint
```

Este comando ejecuta ESLint para:

- Identificar problemas de sintaxis y estilo
- Encontrar código no utilizado
- Asegurar consistence en el formato del código
- Prevenir errores comunes antes de que ocurran

### Sistema de Tipos con TypeScript

El proyecto incluye configuración completa de TypeScript (versión 5.9.2) que:

- Proporciona validación de tipos en tiempo de compilación
- Sugiere tipos y autocomplete en tu editor
- Previene muchos bugs relacionados con tipos de datos
- Los tipos se validan automáticamente durante el desarrollo sin necesariamente pausar la ejecución

## Información de la Aplicación

- **Nombre**: SanAlejoApp
- **Slug**: SanAlejoApp
- **Versión**: 1.0.0 - Esta es la versión inicial stable con todas las funcionalidades core
- **Orientación**: Portrait - La app está optimizada para pantallas en orientación vertical, típica de teléfonos móviles
- **Interfaz**: Automática (Light/Dark) - Se adapta automáticamente al tema del sistema operativo del dispositivo
- **Compatibilidad**:
  - iOS (con soporte para tablet) - Compatible con iPhones y iPads
  - Android (Edge-to-Edge habilitado) - Diseño moderno que aprovecha toda la pantalla

### Estado de la Aplicación

Esta es la versión 1.0.0, lo que significa que incluye todas las características esenciales para gestionar tu inventario de manera efectiva. Es una aplicación madura y lista para producción, con:

- Todos los sistemas CRUD (Crear, Leer, Actualizar, Eliminar) totalmente funcionales
- Base de datos robusta con integridad referencial
- Interfaz de usuario pulida y responsiva
- Completamente estable y testeada

## Licencia

Este proyecto es parte del taller "San Alejo - Actividad Desarrollo Móvil FESC".
