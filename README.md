#  Estrategia de Versionamiento Git

Este documento describe la estrategia de control de versiones que seguiremos en el desarrollo de la aplicación móvil de reservas médicas. Utilizamos un enfoque basado en **GitFlow**, adaptado a la dinámica de nuestro equipo y a los requerimientos de calidad y estabilidad del proyecto.

##  Objetivos

- Mantener un flujo de desarrollo ordenado y colaborativo.
- Garantizar la calidad del código antes de llegar a producción.
- Permitir validaciones en un entorno controlado antes del despliegue final.
- Evitar conflictos y errores mediante ramas claramente definidas.

---

##  Estructura de Ramas

### `main`
- **Propósito:** Contiene el código en producción.
- **Reglas:**
  - Siempre estable y desplegable.
  - Solo se actualiza mediante *merge* desde la rama `QA`, **nunca** directamente.
  - Protegida contra *push* directos.

### `QA`
- **Propósito:** Rama destinada a la validación de calidad (automática y manual).
- **Reglas:**
  - Recibe *merges* desde `develop` cuando un conjunto de funcionalidades está listo para pruebas.
  - Las pruebas E2E (Cypress) y validaciones manuales se ejecutan aquí.
  - Una vez validadas, los cambios se fusionan hacia `main`.

### `develop`
- **Propósito:** Rama de integración continua.
- **Reglas:**
  - Aquí se integran las funcionalidades completas que provienen de ramas `feature/*`.
  - Representa el estado más actualizado del desarrollo.
  - Puede ser inestable y estar en constante cambio.

### `feature/*`
- **Propósito:** Desarrollo de nuevas funcionalidades.
- **Reglas:**
  - Cada nueva funcionalidad debe desarrollarse en su propia rama, por ejemplo: `feature/login`, `feature/reservas-cita`.
  - Se crean a partir de `develop`.
  - Al completarse, se fusionan nuevamente en `develop` mediante Pull Request (PR).
  - Los PRs deben incluir revisiones de código (*code review*) antes de hacer merge.

---

##  Flujo de Trabajo General

```plaintext
feature/* → develop → QA → main
```

1. **Inicio del desarrollo:** Se crea una rama `feature/*` desde `develop`.
2. **Finalización de la feature:** Se hace un PR a `develop`, se revisa y fusiona.
3. **Preparación para pruebas:** Se hace merge desde `develop` hacia `QA`.
4. **Validación:** QA automatizado (Jest + Cypress) y validaciones manuales en entorno de staging.
5. **Despliegue a producción:** Una vez validado, se hace merge de `QA` a `main` de forma controlada (manual).

---

##  Automatización con GitHub Actions (CI/CD)

Nuestra estrategia de versionamiento está respaldada por un pipeline CI/CD que se ejecuta en cada push o PR:

- **Push a `feature/*` o PR a `develop`:**  
  - Compilación y pruebas unitarias + integración.
  - Si falla, el pipeline se detiene.

- **Merge de `develop` a `QA`:**
  - Despliegue automático a entorno de pruebas (staging).
  - Ejecución de pruebas E2E con Cypress.
  - Validación manual por el equipo de QA.

- **Merge de `QA` a `main`:**
  - Despliegue manual a producción (por seguridad y control).

---

##  Beneficios de Esta Estrategia

- **Aislamiento de funcionalidades:** mediante ramas `feature/*`.
- **Integración controlada:** `develop` actúa como área de integración continua.
- **Validación estructurada:** rama `QA` como espacio de pruebas antes del paso a producción.
- **Estabilidad asegurada:** `main` solo contiene código probado y validado.

---

>  Si tienes dudas sobre esta estrategia o necesitas crear una nueva rama, consulta primero con el equipo para mantener la coherencia del flujo de trabajo.
