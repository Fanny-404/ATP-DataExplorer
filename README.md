# 🛍️ E-Store Catalog

> Una aplicación web profesional de e-commerce desarrollada con **React 19**, **TypeScript**, y **Vite**, que consume la API pública [FakeStore API](https://fakestoreapi.com) para mostrar un catálogo de productos interactivo, filtrable y completamente funcional.

---

## 📋 Tabla de Contenidos

1. [Características](#-características)
2. [Tecnologías Utilizadas](#️-tecnologías-utilizadas)
3. [Instalación Rápida](#-instalación-rápida)
4. [Comandos Disponibles](#-comandos-disponibles)
5. [Estructura del Proyecto](#-estructura-del-proyecto)
6. [Core Modules](#-core-modules)
7. [Arquitectura & Diseño](#-arquitectura--diseño)
8. [Components Deep Dive](#-components-deep-dive)
9. [API Reference](#-api-reference)
10. [Flujo de Datos](#-flujo-de-datos)
11. [Testing](#-testing)
12. [Decisiones Técnicas](#-decisiones-técnicas)
13. [Guía de Desarrollo](#-guía-de-desarrollo)
14. [Convenciones de Código](#-convenciones-de-código)

---

## ✨ Características

### Funcionalidades Principales

✅ **Visualización de Productos**
- Visualización en cuadrícula (grid) o lista (list)
- Carga responsive con diseño mobile-first
- Soporte para imágenes con manejo de errores

✅ **Búsqueda en Tiempo Real**
- Búsqueda instantánea por nombre de producto
- Búsqueda en descripción de productos
- Interfaz intuitiva con botón de limpieza (✕)

✅ **Filtrado por Categorías**
- Filtrado dinámico de productos por categoría
- Selección con estado visual
- Incluye emoji descriptivos por categoría

✅ **Ordenamiento por Precio**
- Ordenamiento ascendente (💰 Low to High)
- Ordenamiento descendente (💸 High to Low)
- Sin ordenamiento (default)

✅ **Vista Detallada de Productos**
- Modal con información completa del producto
- Imagen grande del producto
- Rating y reseñas con formato
- Descripciones expandidas

✅ **Manejo de Estados y Errores**
- Skeletons animados como indicadores de carga
- Manejo amigable de errores con mensajes claros
- Botón de reintentos en caso de fallos
- Datos fallback para modo demo

✅ **Diseño Responsive Mobile-First**
- Optimizado para mobile, tablet y desktop
- Breakpoints: 480px, 768px, 1200px

✅ **Despliegue Vercel**
- [E-Store](https://e-store-atp.vercel.app/)

✅ **Badge Top Rated**
- Muestra "⭐ Top Rated" para productos con rating > 4.0

## 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| **React** | 19 | Framework UI moderno |
| **TypeScript** | 5.6+ | Type safety y desarrollo seguro |
| **Vite** | 5.4+ | Build tool ultrarrápido |
| **Axios** | 1.7+ | Cliente HTTP con interceptores |
| **Jest** | 29+ | Testing framework |
| **React Testing Library** | 14+ | Utilidades de testing de componentes |
| **ESLint** | 9+ | Linter de código |

## 📦 Instalación Rápida

```bash
# 1. Clonar/descargar el repositorio
git clone https://github.com/Fanny-404/E-Store.git
cd E-Store

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev

# La aplicación estará disponible en http://localhost:5173
```

## 🚀 Comandos Disponibles

```bash
npm run dev             # Desarrollo con Hot Module Replacement (HMR)
npm run build           # Compilar para producción (dist/)
npm run preview         # Vista previa del build
npm test                # Ejecutar pruebas con Jest
npm test -- --runInBand # Ejecutar pruebas secuencialmente
npm run test:coverage   # Cobertura de pruebas
npm lint                # Ejecutar linting del código
npm run lint:fix        # Arreglar errores de linting automáticamente
```

---

## 📁 Estructura del Proyecto

```
src/
├── types/              # TypeScript interfaces and types
│   └── product.ts      # Product data interfaces
├── services/           # API and external service integrations
│   ├── api.ts          # FakeStore API client
│   └── aiService.ts    # Simulated AI description generator
├── hooks/              # Custom React hooks
│   └── useProducts.ts  # Products data management hook
├── components/         # Reusable React components
│   ├── ProductsPage.tsx    # Main page container
│   ├── ProductGrid.tsx     # Grid/list layout for products
│   ├── ProductCard.tsx     # Individual product card
│   ├── ProductDetail.tsx   # Product detail modal
│   ├── SearchBar.tsx       # Search input component
│   ├── CategoryFilter.tsx  # Category filter buttons
│   ├── SortBar.tsx         # Price sorting controls
│   └── Skeleton.tsx        # Loading skeleton UI
├── pages/              # Page-level components
│   └── ProductsPage.tsx    # Main application page
├── styles/             # CSS stylesheets (BEM naming)
│   ├── App.css
│   ├── SearchBar.css
│   ├── ProductCard.css
│   ├── ProductDetail.css
│   ├── ProductGrid.css
│   ├── SortBar.css
│   └── CategoryFilter.css
├── __tests__/          # Test files (mirrors src structure)
│   ├── setupTests.ts
│   ├── components/
│   ├── hooks/
│   └── services/
├── App.tsx             # Root component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

---

## 🎯 Core Modules

### Types (`src/types/product.ts`)

Define todas las interfaces TypeScript principales:

```typescript
// Product interface
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: { rate: number; count: number };
}

// Filter state
interface FilterState {
  searchTerm: string;
  selectedCategory: string | null;
  sortBy: 'asc' | 'desc' | 'none';
}

// Products state
interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  categories: string[];
}

// AI response
interface AIDescriptionResponse {
  description: string;
  suggestions: string[];
  summary: string;
}
```

### Services

#### API Service (`src/services/api.ts`)
Cliente HTTP para FakeStore API.

**Métodos principales:**
- `getAllProducts()`: Obtiene todos los productos (20 items)
- `getProductById(id)`: Obtiene un producto específico
- `getCategories()`: Obtiene lista de categorías (4)
- `getProductsByCategory(category)`: Obtiene productos por categoría

**Características:**
- ✅ Manejo de errores con mensajes descriptivos
- ✅ Timeout de 10 segundos
- ✅ Inyección de dependencias para testing (`setApiClient()`)

```typescript
// Ejemplo de uso
import { apiService } from './services/api';
const products = await apiService.getAllProducts();
```

#### AI Service (`src/services/aiService.ts`)
Genera descripciones mejoradas de productos usando templates contextuales.

**Métodos principales:**
- `generateDescription(product)`: Genera descripción, sugerencias y resumen

**Características:**
- ✅ Descripciones contextuales por categoría
- ✅ Sugerencias personalizadas por precio
- ✅ Resumen profesional del producto

### Hooks (`src/hooks/useProducts.ts`)

#### `useProducts()`
Hook personalizado para gestionar datos de productos.

```typescript
// Retorna:
{
  products: Product[];           // Array de productos
  categories: string[];          // Array de categorías
  loading: boolean;              // Estado de carga
  error: string | null;          // Mensaje de error (si hay)
  retry: () => Promise<void>;    // Función para reintentar
}

// Características:
// - Carga datos en paralelo (productos + categorías)
// - Fallback a datos de ejemplo en caso de error
// - Función retry para reintentar después de un error
```

**Ejemplo:**
```typescript
const { products, categories, loading, error, retry } = useProducts();
```

#### `useFilteredProducts()`
Hook para filtrar y ordenar productos dinámicamente.

```typescript
// Parámetros:
useFilteredProducts(
  products: Product[],                    // Productos a filtrar
  searchTerm: string,                    // Término de búsqueda
  selectedCategory: string | null,       // Categoría seleccionada
  sortBy: 'asc' | 'desc' | 'none'       // Orden de precio
)

// Retorna: Product[] (filtrados y ordenados)

// Procesa en orden:
// 1. Filtro por categoría
// 2. Búsqueda en título/descripción
// 3. Ordenamiento por precio
```

**Ejemplo:**
```typescript
const filtered = useFilteredProducts(
  products,
  'laptop',           // buscar 'laptop'
  'electronics',      // en categoría electronics
  'asc'               // ordenar precio (menor a mayor)
);
```

---

## 📐 Arquitectura & Diseño

### Modelo por Capas

```
┌─────────────────────────────────────┐
│       UI Layer (React Components)    │
│  - Pages, Components, Styles        │
├─────────────────────────────────────┤
│     Custom Hooks & State Management  │
│  - useProducts, useFilteredProducts  │
├─────────────────────────────────────┤
│        Services & Business Logic     │
│  - API Client, AI Service           │
├─────────────────────────────────────┤
│          Types & Interfaces          │
│  - Product, FilterState, etc.       │
├─────────────────────────────────────┤
│          External Services           │
│  - FakeStore API                    │
└─────────────────────────────────────┘
```

| Capa | Responsabilidad | Ejemplos |
|------|-----------------|----------|
| **UI Layer** | Rendering, user interaction, visual feedback | ProductCard, SearchBar, ProductDetail |
| **Hooks** | State management, side effects, data fetching | useProducts (fetching), useFilteredProducts (filtering) |
| **Services** | External API calls, business logic | apiService (REST calls), aiService (AI logic) |
| **Types** | Type definitions, interfaces | Product, FilterState, AIDescriptionResponse |
| **External** | Third-party services | FakeStore API, (future: AI APIs) |

### 8 Decisiones Técnicas Clave

#### 1️⃣ Custom Hooks para Data Fetching
**Por qué:** Reusabilidad, testabilidad, separación de concerns, error handling centralizado, fallback data

#### 2️⃣ Hook separado para Filtering
**Por qué:** Composabilidad, performance (determinístico), testeable, flexible, optimización de re-renders

#### 3️⃣ Service Layer Pattern
**Por qué:** Centralización, mantenibilidad, testability, error standardization, futuro caching

#### 4️⃣ Modal para Product Detail
**Por qué:** Mejor UX, sin navegación, scroll preservado, mejor mobile experience, contexto mantenido

#### 5️⃣ Fallback Data en useProducts
**Por qué:** Resiliencia, demo mode, testing más fácil, mejor UX, app usable sin internet

#### 6️⃣ CSS por archivo (BEM naming)
**Por qué:** Co-location con componente, no hay conflictos, IDE autocomplete, simpler setup

#### 7️⃣ TypeScript strict (verbatimModuleSyntax)
**Por qué:** Claridad entre tipos y valores, mejor tree-shaking, consistency, future-proof

#### 9️⃣ Simulated AI con Templates Contextuales
**Por qué:** Cumple requisito de IA sin dependencias externas, mantenible, rápido, contextual, extensible a real AI

**Implementación:**
- Templates por categoría (electronics, jewelery, clothing)
- Sugerencias basadas en precio (budget, mid-range, premium)
- Resumen profesional automático
- Simulación de delay para realismo (1.5s)
- Fácil reemplazo por API real (OpenAI, etc.)

**Beneficios:**
- ✅ Funcionalidad IA obligatoria cumplida
- ✅ Sin costos de API externa
- ✅ Respuestas consistentes y relevantes
- ✅ Fácil testing y mocking
- ✅ Preparado para integración real

---

## ⚛️ Components Deep Dive

### ProductsPage
**Ubicación:** `src/pages/ProductsPage.tsx`

Página principal que orquesta todos los componentes.

**Estado Local:**
```typescript
const [searchTerm, setSearchTerm] = useState('');
const [selectedCategory, setSelectedCategory] = useState(null);
const [sortBy, setSortBy] = useState<'asc'|'desc'|'none'>('none');
const [viewMode, setViewMode] = useState<'grid'|'list'>('grid');
```

**Estructura:**
```
Header (título e subtítulo)
  ↓
SearchBar (búsqueda)
  ↓
CategoryFilter (filtrado por categoría)
  ↓
SortBar (ordenamiento + view mode)
  ↓
{error && ErrorContainer}  || {loading && SkeletonGrid}  || ProductGrid
```

### SearchBar
**Ubicación:** `src/components/SearchBar.tsx`

Barra de búsqueda con icono y botón clear.

**Props:**
```typescript
{
  value: string;                          // Valor actual
  onChange: (value: string) => void;      // Callback cambio
  placeholder?: string;                   // Texto placeholder
  disabled?: boolean;                     // Estado deshabilitado
}
```

**Features:**
- Input de texto con icono 🔍
- Botón Clear (✕) cuando hay texto
- Búsqueda en tiempo real
- Se deshabilita durante carga

### CategoryFilter
**Ubicación:** `src/components/CategoryFilter.tsx`

Botones para filtrar por categoría.

**Props:**
```typescript
{
  categories: string[];                           // Categorías disponibles
  selectedCategory: string | null;                // Seleccionada (null=todas)
  onSelectCategory: (cat: string | null) => void; // Callback
  disabled?: boolean;
}
```

**Categorías con emoji:**
- 🏷️ All Products (reset)
- 📱 Electronics
- 💍 Jewelery
- 👕 Men's Clothing
- 👗 Women's Clothing

**Toggle behavior:** Click selecciona → Click nuevamente deselecciona

### SortBar
**Ubicación:** `src/components/SortBar.tsx`

Control de ordenamiento y vista.

**Props:**
```typescript
{
  sortBy: 'asc'|'desc'|'none';           // Orden actual
  onSortChange: (sort) => void;          // Callback
  viewMode: 'grid'|'list';                // Modo vista
  onViewModeChange: (mode) => void;       // Callback toggle
  disabled?: boolean;
}
```

**Elementos:**
- Select dropdown: "No sorting" | "💰 Low to High" | "💸 High to Low"
- Botones vista: "⊞" Grid | "≡" List

### ProductCard
**Ubicación:** `src/components/ProductCard.tsx`

Tarjeta individual de producto.

**Props:**
```typescript
{
  product: Product;                    // Datos del producto
  onViewDetails: (product) => void;    // Callback View Details
}
```

**Elementos:**
- Imagen (lazy loaded + fallback SVG)
- Badge "⭐ Top Rated" (si rating > 4.0)
- Categoría
- Título
- Descripción
- Precio ($XX.XX)
- Rating (⭐ X.X (count))
- Botón "View Details"

### ProductGrid
**Ubicación:** `src/components/ProductGrid.tsx`

Contenedor grid/lista de productos.

**Props:**
```typescript
{
  products: Product[];        // Productos a mostrar
  viewMode: 'grid'|'list';   // Modo vista
}
```

**Características:**
- Grid responsive o lista lineal
- Empty state (📦) si no hay productos
- Integración con ProductDetail modal

### ProductDetail
**Ubicación:** `src/components/ProductDetail.tsx`

Modal con detalles completos del producto.

**Props:**
```typescript
{
  product: Product;            // Producto a mostrar
  onClose: () => void;         // Callback para cerrar
}
```

**Features:**
- Modal overlay oscuro
- Card centrada con info
- Click en overlay cierra
- Botón Close (X)
- Imagen grande
- Info completa del producto

### Skeleton
**Ubicación:** `src/components/Skeleton.tsx`

Componentes de carga animados.

**Props:**
```typescript
{
  count: number;  // Número de skeletons
}
```

**Features:**
- Animación "pulse" suave (0.8s)
- Placeholder esqueleto gris
- Grid responsive
- Export `SkeletonGrid`

### Component Hierarchy

```
ProductsPage (root)
├── header
│   ├── h1 (title)
│   └── p (subtitle)
├── .page-container
│   ├── SearchBar
│   ├── CategoryFilter
│   ├── SortBar
│   ├── Error Container (conditional)
│   ├── SkeletonGrid (conditional)
│   └── ProductGrid (conditional)
│       ├── ProductCard[] (list)
│       └── ProductDetail Modal (conditional)
```

---

## 📚 API Reference

### Type Exports

```typescript
// From src/types/product.ts
export interface Product { ... }
export interface FilterState { ... }
export interface ProductsState { ... }
export interface AIDescriptionResponse { ... }
```

### API Service Methods

```typescript
// From src/services/api.ts
export const apiService: {
  getAllProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product>;
  getCategories(): Promise<string[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
}

export function setApiClient(client: AxiosInstance): void;
```

### AI Service Methods

```typescript
// From src/services/aiService.ts
export const aiService: {
  generateDescription(product: Product): Promise<AIDescriptionResponse>;
}
```

### Hook Exports

```typescript
// From src/hooks/useProducts.ts
export function useProducts(): { ... }
export function useFilteredProducts(
  products: Product[],
  searchTerm: string,
  selectedCategory: string | null,
  sortBy: 'asc' | 'desc' | 'none'
): Product[]
```

### Component Exports

```typescript
export const ProductsPage: React.FC;
export const ProductGrid: React.FC<ProductGridProps>;
export const ProductCard: React.FC<ProductCardProps>;
export const ProductDetail: React.FC<ProductDetailProps>;
export const SearchBar: React.FC<SearchBarProps>;
export const CategoryFilter: React.FC<CategoryFilterProps>;
export const SortBar: React.FC<SortBarProps>;
export const SkeletonGrid: React.FC<SkeletonProps>;
```

---

## 🔄 Flujo de Datos

```
ProductsPage (estado principal)
    ↓
    ├─→ useProducts() [obtiene datos del API]
    │   └─→ apiService [HTTP calls]
    │
    ├─→ useState (filtros locales)
    │   ├─→ searchTerm
    │   ├─→ selectedCategory
    │   ├─→ sortBy
    │   └─→ viewMode
    │
    ├─→ useFilteredProducts() [procesa filtros]
    │   └─→ retorna productos filtrados
    │
    └─→ Componentes:
        ├─→ SearchBar (entrada searchTerm)
        ├─→ CategoryFilter (entrada selectedCategory)
        ├─→ SortBar (entrada sortBy + viewMode)
        └─→ ProductGrid
            ├─→ ProductCard[] (renderiza cada producto)
            │   └─→ onClick → ProductDetail (modal)
            └─→ ProductDetail Modal (muestra detalles)
```

### Fetch Pattern

```typescript
// En useProducts() hook:
1. On mount: setState({ loading: true })
2. API calls: Promise.all([getAllProducts(), getCategories()])
3. On success: setState({ products, categories, loading: false })
4. On error: setState({ error, loading: false, products: fallback })
5. User can click Retry to refetch
```

### Filter Pattern

```typescript
// En useFilteredProducts() hook:
1. Input: products[], searchTerm, category, sortBy
2. useEffect watches all inputs
3. Process secuencial:
   a. Category filter
   b. Text search filter (título + descripción)
   c. Price sorting
4. Return filtered result
```

---

## 🧪 Testing

**Estructura:**
```
src/__tests__/
├── setupTests.ts
├── styleMock.js
├── components/
│   ├── CategoryFilter.test.tsx
│   ├── ProductCard.test.tsx
│   └── SearchBar.test.tsx
├── hooks/
│   └── useProducts.test.ts
└── services/
    └── api.test.ts
```

**Comandos:**
```bash
npm test                        # Ejecutar todos los tests
npm test -- --runInBand        # Ejecutar secuencialmente
npm test -- --watch            # Watch mode
npm run test:coverage          # Cobertura de tests
```

**Estado Actual:** ✅ **25/25 tests pasando**

**Test Strategy:**
- ✅ Component renders
- ✅ Props work correctly
- ✅ Click handlers fire
- ✅ Conditional rendering
- ✅ API mocking with setApiClient()
- ✅ Hook functionality isolated

---

## 🛠️ Guía de Desarrollo

### Agregar un nuevo filtro

1. Añadir estado en ProductsPage:
   ```typescript
   const [newFilter, setNewFilter] = useState(defaultValue);
   ```

2. Pasar a useFilteredProducts si es necesario

3. Crear componente del filtro

4. Integrar en ProductsPage

### Agregar un nuevo componente

1. Crear archivo en `src/components/`
2. Documentar con JSDoc
3. Crear `src/__tests__/components/ComponentName.test.tsx`
4. Importar en lugar necesario

### Modificar el API client

1. Editar `src/services/api.ts`
2. Añadir método nuevo en `apiService`
3. Actualizar tests en `src/__tests__/services/api.test.ts`
4. Actualizar este README

---

## 📝 Convenciones de Código

| Elemento | Convención | Ejemplo |
|----------|-----------|---------|
| Interfaces | PascalCase | `ProductCardProps` |
| Constantes | UPPER_SNAKE_CASE | `API_BASE_URL` |
| Variables | camelCase | `selectedProduct` |
| Funciones | camelCase | `handleViewDetails` |
| Componentes | PascalCase | `ProductCard` |
| CSS classes | BEM-like | `.product-card__header` |
| Tipos | `import type` | `import type { Product }` |

### CSS Naming (BEM-like)

```css
/* Block */
.product-card { }

/* Block Element */
.product-card__image { }
.product-card__title { }

/* Block Element Modifier */
.product-card__button--primary { }
.product-card__image--loading { }
```

---

## 🔒 Type Safety

Proyecto configurado con `verbatimModuleSyntax` en `tsconfig.json`:

```typescript
// ✅ Type imports (required)
import type { Product } from '../types/product';

// ✅ Value imports
import { useProducts } from '../hooks/useProducts';

// ❌ Mixed imports (not allowed)
import { Product, useProducts } from '...';  // Error
```

---

## 🤖 Implementación de Funcionalidad IA

### Requisito OBLIGATORIO
Como especificado en los requerimientos, se implementó una característica que simula inteligencia artificial con un botón explícito **"🤖 Generate AI Description"**.

### Arquitectura de IA

#### AI Service (`src/services/aiService.ts`)
- **Simulación de IA**: Usa templates contextuales en lugar de API externa
- **Delay artificial**: 1.5 segundos para simular procesamiento de IA
- **Templates por categoría**: Descripciones específicas para electronics, jewelery, clothing
- **Lógica contextual**: Sugerencias basadas en precio y rating

#### Flujo de IA
1. Usuario hace click en "🤖 Generate AI Description"
2. Botón muestra "⏳ Generating..." y se deshabilita
3. Simula llamada a IA (setTimeout 1.5s)
4. Genera descripción, sugerencias y resumen usando templates
5. Muestra resultado con badge "✨ AI Enhanced"
6. Usuario puede cerrar con botón ✕

#### Templates de IA

**Por Categoría:**
- **Electronics**: "Premium [title]. [original] This state-of-the-art device combines cutting-edge technology..."
- **Jewelery**: "Exquisite [title]. [original] Crafted with meticulous attention to detail..."
- **Clothing**: "Stylish [title]. [original] Perfect for any occasion..."

**Sugerencias por Precio:**
- **Budget (<$50)**: "Great value for money", "Affordable quality"
- **Mid-range ($50-$200)**: "Excellent choice", "High-quality product"
- **Premium (>$200)**: "Luxury item", "Premium quality"

#### Beneficios de la Implementación
- ✅ Cumple requisito obligatorio de IA
- ✅ Sin dependencias externas (no requiere API key)
- ✅ Respuestas consistentes y relevantes
- ✅ Fácil de extender a API real (OpenAI, etc.)
- ✅ Completamente testeable
- ✅ Mejor UX con loading states

#### Futura Integración con API Real
Para integrar con OpenAI o similar:

```typescript
// Reemplazar en aiService.ts
const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [{ role: "user", content: prompt }],
});
```

---

### 1. Memoization
- useFilteredProducts wrapped in useMemo
- Avoid re-filtering on every render

### 2. Key Props
- ProductCard uses `key={product.id}`
- React identifies changed items

### 3. Image Lazy Loading
- `loading="lazy"` on ProductCard images
- Faster initial page load

### 4. Fallback Data Caching
- Always provide demo products
- App remains functional offline

---

## 🚀 Build & Deployment

### Development
```bash
npm run dev
# Vite dev server with HMR at http://localhost:5173
```

### Production Build
```bash
npm run build
# Output to dist/ folder
#
# Result:
# ✓ 103 modules transformed
# ✓ 244kb JavaScript bundle (gzipped: ~80kb)
# ✓ 15kb CSS bundle (gzipped: ~3.25kb)
# ✓ Built in 1.30s
```

### Production Preview
```bash
npm run preview
# Preview the built app locally
```

---

## 🔐 Error Handling

### API Errors
```typescript
try {
  const products = await apiService.getAllProducts();
} catch (error) {
  // User-friendly error messages
  console.error(error.message);
  // Fallback data provided
}
```

### Hook Error Handling
```typescript
const { error, retry } = useProducts();

if (error) {
  return (
    <div className="error-container">
      <p>{error}</p>
      <button onClick={retry}>Retry</button>
    </div>
  );
}
```

---

## ✅ Checklist de Desarrollo

- [x] Estructura completa del proyecto
- [x] Servicios API y datos
- [x] Componentes principales
- [x] Hooks personalizados
- [x] Estados y filtros
- [x] Tests unitarios (25/25)
- [x] Manejo de errores
- [x] Responsive design
- [x] Accesibilidad
- [x] Build production
- [x] Despliegue en Vercel
- [x] Documentación completa

---

## 📚 Recursos Útiles

- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [FakeStore API](https://fakestoreapi.com)
- [Vite Documentation](https://vitejs.dev)
- [Jest Documentation](https://jestjs.io)
- [Axios Documentation](https://axios-http.com)

---

---

**Última actualización:** 25 de Marzo 2026  
**Versión:** 1.0.0  
**Estado:** ✅ Completo y documentado  
**Tests:** 25/25 pasando  
**Build:** ✓ Production ready
