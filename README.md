# 🛍️ DataExplorer - Modern React E-Commerce Application

Una aplicación web profesional de e-commerce desarrollada con **React 19**, **TypeScript**, y **Vite**, que consume la API pública [FakeStore API](https://fakestoreapi.com/products) para mostrar un catálogo de productos completo y funcional.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Funcionalidades](#funcionalidades)
- [Pruebas](#pruebas)
- [Despliegue](#despliegue)
- [Decisiones Técnicas](#decisiones-técnicas)
- [Integración de IA](#integración-de-ia)

## ✨ Características

### Funcionalidades Principales

✅ **Visualización de Productos**
- Visualización en cuadrícula (grid) o lista (list)
- Carga responsive con diseño mobile-first
- Soporte para imágenes con manejo de errores

✅ **Búsqueda en Tiempo Real**
- Búsqueda instantánea por nombre de producto
- Búsqueda en descripción de productos
- Interfaz intuitiva con botón de limpieza

✅ **Filtrado por Categorías**
- Filtrado dinámico de productos por categoría
- Selección múltiple con estado visual
- Incluye emoji descriptivos por categoría

✅ **Ordenamiento por Precio**
- Ordenamiento ascendente (menor a mayor)
- Ordenamiento descendente (mayor a menor)
- Sin ordenamiento (por defecto)

✅ **Vista Detallada de Productos**
- Modal con información completa del producto
- Galería de imagen completa
- Rating y reseñas
- Descripciones expandidas

✅ **Generación de Descripciones con IA**
- Botón explícito "🤖 Generar Descripción con IA"
- Descripciones mejoradas y contextualizadas
- Sugerencias de compra inteligentes
- Resumen ejecutivo del producto
- Procesamiento simulado con delay realista

✅ **Manejo de Estados y Errores**
- Skeletons como indicadores de carga
- Manejo amigable de errores
- Botón de reintentos en caso de fallos
- Indicadores visuales de estado

✅ **Diseño Responsive Mobile-First**
- Optimizado para mobile, tablet y desktop
- Breakpoints: 480px, 768px, 1200px

## 🛠️ Tecnologías Utilizadas

- **React 19** - Librería UI moderna
- **TypeScript** - Tipado estático
- **Vite 5** - Build tool rápido
- **Axios** - Cliente HTTP
- **Jest** - Framework de testing
- **React Testing Library** - Utilidades de testing
- **ESLint** - Linter de código

## 📦 Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/Fanny-404/ATP-DataExplorer.git
cd e-store-catalog

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev

# La aplicación estará en http://localhost:5173
```

## 🚀 Comandos Disponibles

```bash
npm run dev             # Desarrolloen HMR
npm run build           # Compilar para producción
npm run preview         # Vista previa de build
npm test                # Ejecutar pruebas
npm run test:watch      # Pruebas en observación
npm run test:coverage   # Cobertura de pruebas
npm lint                # Linting del código
```

## 📁 Estructura del Proyecto

```
src/
├── components/        # Componentes React reutilizables
│   ├── ProductCard.tsx
│   ├── ProductGrid.tsx
│   ├── ProductDetail.tsx
│   ├── SearchBar.tsx
│   ├── CategoryFilter.tsx
│   ├── SortBar.tsx
│   └── Skeleton.tsx
├── pages/             # Componentes de página
│   └── ProductsPage.tsx
├── services/          # Servicios y lógica
│   ├── api.ts         # Cliente de API
│   └── aiService.ts   # Servicio de IA
├── hooks/             # Custom React hooks
│   └── useProducts.ts
├── types/             # Definiciones TypeScript
│   └── product.ts
├── styles/            # Estilos CSS
├── __tests__/         # Suite de pruebas
├── App.tsx            # Componente raíz
└── main.tsx           # Punto de entrada
```

## 🎯 Funcionalidades Detalladas

### Búsqueda en Tiempo Real
- Búsqueda instantánea mientras escribes
- Busca en títulos y descripciones
- Botón"X" para limpiar
- Case-insensitive

### Filtrado por Categorías
- Carga dinámica desde API
- Interfaz visual con emojis
- Indicador de estado activo

### Ordenamiento por Precio
- Opciones: `none`, `asc`, `desc`
- Actualización instantánea

### Generación de Descripciones con IA

La funcionalidad de IA está **simulada** usando:
- **Análisis de Categoría**: Templates contextualizados
- **Extracción de Atributos**: Rating, precio, descripción
- **Sugerencias Inteligentes**: 4 sugerencias basadas en datos
- **Resumen Ejecutivo**: Síntesis profesional

```typescript
// Ejemplo de respuesta IA
{
  description: "Premium Laptop - Enhanced description with insights...",
  suggestions: [
    "⭐ Best seller with excellent reviews",
    "💰 Excellent value for money",
    "⚡ Perfect for tech enthusiasts"
  ],
  summary: "Highly rated moderately-priced electronics product..."
}
```

### Manejo de Errores
- ✅ Fallos de conectividad
- ✅ Timeouts
- ✅ Imágenes no disponibles
- ✅ Datos inválidos
- ✅ Botón de reintentos

## 🧪 Pruebas

```bash
# Ejecutar todas las pruebas
npm test

# Modo observación  
npm run test:watch

# Cobertura
npm run test:coverage
```

### Suite de Pruebas
- ✅ Custom hooks (useProducts, useFilteredProducts)
- ✅ Componentes (SearchBar, CategoryFilter, ProductCard)
- ✅ Servicios (API, IA)
- ✅ Filtrado, búsqueda y ordenamiento
- ✅ Generación de descripciones IA

### Cobertura Objetivo
- Branches: 60%
- Functions: 60%
- Lines: 60%
- Statements: 60%

## 🚀 Despliegue

### Vercel
```bash
# Conexión automática desde GitHub
# Los deploys son automáticos al hacer push
```

### Netlify
```bash
npm run build
npx netlify-cli deploy --prod --dir=dist
```

## 🔧 Decisiones Técnicas

| Decisión     | Razón                           |
|--------------|---------------------------------|
| Jest + RTL   | Mejor testing de comportamiento |
| Hooks        | Menos boilerplate que Redux     |
| CSS separado | Mejor mantenibilidad            |
| Axios        | Timeout y cancelación built-in  |
| Skeletons    | Mejor UX que spinners           |

## 🤖 Integración de IA

### Descripción Técnica

La IA es **completamente simulada** usando patrones inteligentes:

#### Componentes:
1. **Mapeo por Categoría**: Templates contextualizados
2. **Análisis de Rating**: Determina urgencia de recomendación
3. **Análisis de Precio**: Clasifica como económico/medio/premium
4. **Generación de Sugerencias**: 4 sugerencias contextuales
5. **Resumen Ejecutivo**: Síntesis profesional

#### Características:
- ✅ Delay simulado (1.5s)
- ✅ Respuestas determinísticas pero contextuales
- ✅ Escalable a APIs reales (OpenAI, Cohere)
- ✅ Interfaz visual distintiva

### Escalación a IA Real

Para usar OpenAI u otra API:

```typescript
// In aiService.ts
const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: `Generate description for: ${product.title}...`,
  max_tokens: 500,
});
```

## 📱 Responsive Design

| Device  | Width      | Layouts     |
|---------|------------|-------------|
| Mobile  | <480px     | 1 columna   |
| Tablet  | 480-768px  | 2 columnas  |
| Laptop  | 768-1200px | 3 columnas  |
| Desktop | >1200px    | 4+ columnas |

**Filosofía**: Mobile-First Approach

## 📊 Rendimiento

### Optimizaciones
- ✅ Lazy loading de imágenes
- ✅ Code splitting automático (Vite)
- ✅ Skeletons reducen CLS
- ✅ Memoization en filters

### Métricas Esperadas
- **LCP**: ~2.5s
- **FID**: ~50ms
- **CLS**: <0.1

## 🔐 Seguridad

- ✅ Input sanitization en búsquedas
- ✅ Fallback para URLs de imagen
- ✅ Error boundaries recomendado
- ✅ CORS habilitado en API

## 📚 Recursos

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org)
- [Vite Guide](https://vitejs.dev)
- [FakeStore API](https://fakestoreapi.com)
- [Jest Documentation](https://jestjs.io)
- [React Testing Library](https://testing-library.com)

## 🐛 Troubleshooting

**npm run dev falla:**
```bash
rm -rf node_modules package-lock.json
npm install && npm run dev
```

**Tests fallan:**
```bash
npm test -- --clearCache
```

**Las imágenes no cargan en desarrollo:**
- Es normal con FakeStore API
- El fallback SVG se muestra automáticamente
- Funciona en producción

## 📄 Licencia

MIT - Ver LICENSE para más detalles.

---

**Versión:** 1.0.0  
**Última actualización:** 2024  
**Estado:** ✅ Production Ready
