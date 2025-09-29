# Política de Seguridad de ReservaCitasMedicas

Este documento describe las políticas, amenazas y lineamientos de seguridad para la aplicación **ReservaCitasMedicas**, desarrollada con un front-end en **React Native** y un back-end que utiliza **MongoDB**.

---

## 📜 Principios de Seguridad Aplicados

Nuestra estrategia de seguridad se basa en la defensa en profundidad, aplicando controles en cada capa de la aplicación (móvil, transporte y base de datos).

-   **Seguridad del Lado del Cliente (React Native):**
    -   **Almacenamiento Seguro:** Las credenciales sensibles, como los tokens JWT, se guardan en el dispositivo de forma cifrada usando **SecureStorage**. Nunca se almacenan datos sensibles en `AsyncStorage` sin cifrado.
    -   **Manejo de Secretos en el Front-end:** Las claves de API del cliente (como Google Maps) se gestionan a través de variables de entorno (`.env`) y no se exponen en el código fuente.
    -   **Desactivación de Logs en Producción:** Se deshabilitan las consolas de depuración (`console.log`) en las versiones de producción para evitar la fuga de información sensible.

-   **Comunicación Segura:**
    -   **Cifrado de Tráfico (TLS):** Toda la comunicación entre la app React Native y el back-end se realiza obligatoriamente sobre **HTTPS (TLS 1.2+)**, previniendo la interceptación de datos.

-   **Seguridad del Lado del Servidor y Base de Datos (MongoDB):**
    -   **Autenticación y Autorización:** El acceso a la base de datos MongoDB está protegido con autenticación (usuario/contraseña). Los roles y permisos se gestionan para asegurar que la API solo pueda realizar las operaciones necesarias (Principio de Menor Privilegio).
    -   **Validación de Esquemas:** Se utiliza un **ODM (Object Document Mapper)** como **Mongoose** para definir y hacer cumplir esquemas de datos estrictos. Esto previene ataques de inyección de NoSQL y garantiza la integridad de los datos antes de que lleguen a la base de datos.
    -   **Protección contra Inyección:** Todas las entradas del usuario son validadas y sanitizadas en el back-end antes de ser utilizadas en consultas a la base de datos, mitigando el riesgo de inyecciones NoSQL.

---

## 🛡️ Amenazas Identificadas y Mitigación

Hemos identificado las siguientes amenazas específicas a nuestro stack tecnológico y hemos implementado medidas para mitigarlas.

| Amenaza | Capa | Riesgo | Medida de Mitigación |
| :--- | :--- | :--- | :--- |
| **Inyección de NoSQL** | Back-end | **Crítico** | Se utiliza **Mongoose** para la validación estricta de esquemas. Cualquier dato que no cumpla con el esquema definido es rechazado antes de la consulta. |
| **Exposición de Credenciales en el Código** | Front-end / Back-end | Alto | Las claves de API, secretos JWT y credenciales de la base de datos se cargan desde **variables de entorno**. Los archivos `.env` están incluidos en `.gitignore`. |
| **Robo de Tokens de Sesión del Dispositivo** | Front-end | Alto | Los tokens se almacenan en el **almacenamiento seguro y cifrado** del sistema operativo, nunca en texto plano. |
| **Configuración Insegura de MongoDB** | Base de Datos | Alto | El acceso a la base de datos está restringido por firewall a las IPs del servidor de aplicaciones. La autenticación está habilitada y no se utilizan los puertos por defecto. |
| **Ingeniería Inversa de la App Móvil** | Front-end | Medio | Se utilizan herramientas de **ofuscación de código** (como ProGuard para Android) en el proceso de compilación para dificultar el análisis del código de la aplicación. |

---

## 👥 Lineamientos de Seguridad para el Equipo

Para mantener un entorno seguro, todo el equipo de desarrollo se compromete a seguir estas directrices:

1.  **Nunca Confiar en los Datos del Cliente:** Siempre validar, sanitizar y verificar los datos provenientes de la aplicación React Native en el back-end.
2.  **Esquemas de Mongoose Obligatorios:** No se permiten operaciones de base de datos sin un esquema de Mongoose predefinido y validado.
3.  **Gestión de Dependencias:** Utilizar herramientas como `npm audit` regularmente para identificar y actualizar dependencias con vulnerabilidades conocidas, tanto en el front-end como en el back-end.
4.  **Revisión de Código Enfocada en Seguridad:** Durante los Pull Requests, se debe prestar especial atención a la gestión de errores, la validación de entradas y el manejo de secretos.
5.  **Principio de Menor Privilegio:** Los usuarios de la base de datos y los tokens de API deben tener los permisos mínimos necesarios para realizar sus funciones.