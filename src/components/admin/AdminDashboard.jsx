import React, { useState, useMemo } from 'react';
import {
  Plus, Search, RefreshCw, Trash2, Edit3, CheckCircle2,
  XCircle, Star, Tag, ShoppingBag, ExternalLink, LogOut,
  Filter, AlertCircle, ArrowUpDown, Layers, Check
} from 'lucide-react';
import { useProducts } from '../../context/ProductsContext';
import { ProductEditorModal } from './ProductEditorModal';
import { deleteProductRecord, updateProductRecord, logoutAdmin, getCurrentAdmin } from '../../services/pocketbase';

export const AdminDashboard = ({ onLogout, onNavigateToStore }) => {
  const { products, loading, error, refreshProducts, lastUpdated } = useProducts();

  // Filtros y Búsqueda
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('todos');
  const [stockFilter, setStockFilter] = useState('todos'); // 'todos' | 'inStock' | 'outOfStock'

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 15;

  // Modales
  const [editingProduct, setEditingProduct] = useState(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [deletingProduct, setDeletingProduct] = useState(null);

  // Estados de acción rápida
  const [updatingId, setUpdatingId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const adminUser = getCurrentAdmin();

  const showToast = (text, type = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filtrado de productos
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // 1. Búsqueda de texto
      const query = searchQuery.trim().toLowerCase();
      if (query) {
        const matchesName = p.name?.toLowerCase().includes(query);
        const matchesCategory = p.category?.toLowerCase().includes(query);
        const matchesDesc = p.description?.toLowerCase().includes(query);
        const matchesId = p.id?.toLowerCase().includes(query) || p.customId?.toLowerCase().includes(query);
        if (!matchesName && !matchesCategory && !matchesDesc && !matchesId) return false;
      }

      // 2. Filtro de Categoría
      if (categoryFilter !== 'todos' && p.category !== categoryFilter) {
        return false;
      }

      // 3. Filtro de Stock
      if (stockFilter === 'inStock' && !p.inStock) return false;
      if (stockFilter === 'outOfStock' && p.inStock) return false;

      return true;
    });
  }, [products, searchQuery, categoryFilter, stockFilter]);

  // Paginación
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // Métricas
  const stats = useMemo(() => {
    const total = products.length;
    const inStock = products.filter(p => p.inStock).length;
    const featured = products.filter(p => p.isFeatured).length;
    const offers = products.filter(p => p.isOffer).length;
    return { total, inStock, featured, offers };
  }, [products]);

  // Alternar Stock en 1-Clic
  const handleToggleStock = async (product) => {
    setUpdatingId(product.id);
    try {
      const newStock = !product.inStock;
      await updateProductRecord(product.id, { inStock: newStock });
      await refreshProducts();
      showToast(`Stock de "${product.name}" actualizado a: ${newStock ? 'Disponible' : 'Agotado'}`);
    } catch (err) {
      console.error(err);
      showToast('Error al actualizar stock: ' + err.message, 'error');
    } finally {
      setUpdatingId(null);
    }
  };

  // Alternar Destacado en 1-Clic
  const handleToggleFeatured = async (product) => {
    setUpdatingId(product.id);
    try {
      const newFeatured = !product.isFeatured;
      await updateProductRecord(product.id, { isFeatured: newFeatured });
      await refreshProducts();
      showToast(`"${product.name}" ${newFeatured ? 'marcado como destacado' : 'removido de destacados'}`);
    } catch (err) {
      console.error(err);
      showToast('Error al actualizar destacado: ' + err.message, 'error');
    } finally {
      setUpdatingId(null);
    }
  };

  // Confirmar eliminación
  const handleDeleteConfirm = async () => {
    if (!deletingProduct) return;
    try {
      await deleteProductRecord(deletingProduct.id);
      await refreshProducts();
      showToast(`Producto "${deletingProduct.name}" eliminado correctamente`);
      setDeletingProduct(null);
    } catch (err) {
      console.error(err);
      showToast('Error al eliminar producto: ' + err.message, 'error');
    }
  };

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setIsEditorOpen(true);
  };

  const handleOpenEdit = (prod) => {
    setEditingProduct(prod);
    setIsEditorOpen(true);
  };

  const handleSaved = (savedRecord, isEditing) => {
    refreshProducts();
    showToast(isEditing ? 'Producto actualizado con éxito en la base de datos' : 'Nuevo producto creado con éxito');
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased flex flex-col">
      {/* Toast Notification flotante */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 animate-fadeIn">
          <div className={`px-4 py-3 rounded-2xl shadow-xl border flex items-center gap-2.5 text-xs font-bold ${
            toastMessage.type === 'error'
              ? 'bg-rose-50 border-rose-200 text-rose-700'
              : 'bg-emerald-50 border-emerald-200 text-emerald-800'
          }`}>
            {toastMessage.type === 'error' ? <AlertCircle className="w-4 h-4 shrink-0" /> : <Check className="w-4 h-4 shrink-0" />}
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* 1. TOP NAVBAR ADMIN */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#ee2b91] text-white flex items-center justify-center font-black text-lg shadow-sm">
              P
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-black text-slate-900 text-base">PekeBook</span>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                  Panel Admin
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">
                Base de datos en tiempo real • bd.pekebook.cl
              </span>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* User badge */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-medium text-slate-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{adminUser?.email || 'contacto@pekebook.cl'}</span>
            </div>

            {/* Back to store */}
            <button
              onClick={onNavigateToStore}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-[#ee2b91] hover:bg-pink-50 transition-colors border border-transparent hover:border-pink-200"
              title="Abrir la tienda pública"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">Ver Tienda</span>
            </button>

            {/* Logout button */}
            <button
              onClick={() => {
                logoutAdmin();
                if (onLogout) onLogout();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors border border-transparent hover:border-rose-200"
              title="Cerrar sesión"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. MAIN ADMIN CONTENT */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Catálogo</p>
              <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 font-heading">{stats.total}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600">
              <Layers className="w-6 h-6" />
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">En Stock Activo</p>
              <p className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1 font-heading">{stats.inStock}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Destacados</p>
              <p className="text-2xl sm:text-3xl font-black text-amber-500 mt-1 font-heading">{stats.featured}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-500">
              <Star className="w-6 h-6 fill-amber-400" />
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">En Oferta</p>
              <p className="text-2xl sm:text-3xl font-black text-[#ee2b91] mt-1 font-heading">{stats.offers}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-pink-50 border border-pink-200 flex items-center justify-center text-[#ee2b91]">
              <Tag className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Action & Filter Bar */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Buscar por nombre, categoría o descripción..."
                className="w-full pl-10 pr-10 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#ee2b91] focus:ring-2 focus:ring-pink-100 transition-all font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Actions: Refresh & New Product */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  refreshProducts();
                  showToast('Datos sincronizados desde bd.pekebook.cl');
                }}
                disabled={loading}
                className="p-2.5 border border-slate-200 hover:border-slate-300 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-center"
                title="Sincronizar base de datos"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#ee2b91]' : ''}`} />
              </button>

              <button
                onClick={handleOpenCreate}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#ee2b91] hover:bg-[#d61e7e] active:scale-[0.99] text-white text-xs font-bold rounded-xl shadow-md shadow-pink-200 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Añadir Producto</span>
              </button>
            </div>
          </div>

          {/* Subfilters: Category & Stock */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
            <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider mr-1">
              Filtros:
            </span>

            {/* Category Dropdown */}
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#ee2b91]"
            >
              <option value="todos">Todas las Categorías</option>
              <option value="sublimacion">Sublimación</option>
              <option value="encuadernacion">Encuadernación</option>
              <option value="libreria">Librería</option>
              <option value="bazar">Bazar Kawaii</option>
              <option value="kits-emprende">Kits Emprende</option>
              <option value="impresion-digital">Impresión Digital</option>
              <option value="ofertas">Ofertas</option>
            </select>

            {/* Stock selector pills */}
            <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-50">
              <button
                onClick={() => { setStockFilter('todos'); setCurrentPage(1); }}
                className={`px-3 py-1 rounded-md text-[11px] font-bold transition-all ${
                  stockFilter === 'todos' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Todos ({stats.total})
              </button>
              <button
                onClick={() => { setStockFilter('inStock'); setCurrentPage(1); }}
                className={`px-3 py-1 rounded-md text-[11px] font-bold transition-all ${
                  stockFilter === 'inStock' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                En Stock ({stats.inStock})
              </button>
              <button
                onClick={() => { setStockFilter('outOfStock'); setCurrentPage(1); }}
                className={`px-3 py-1 rounded-md text-[11px] font-bold transition-all ${
                  stockFilter === 'outOfStock' ? 'bg-white text-rose-700 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Agotados ({stats.total - stats.inStock})
              </button>
            </div>

            {/* Total matching feedback */}
            <span className="ml-auto text-slate-400 text-[11px] font-medium">
              Mostrando {filteredProducts.length} productos
            </span>
          </div>
        </div>

        {/* 3. PRODUCTS TABLE / LIST */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3.5 px-4 w-16">Foto</th>
                  <th className="py-3.5 px-4">Producto & Categoría</th>
                  <th className="py-3.5 px-4">Precio CLP</th>
                  <th className="py-3.5 px-4 text-center">Stock</th>
                  <th className="py-3.5 px-4 text-center">Destacado</th>
                  <th className="py-3.5 px-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedProducts.length > 0 ? (
                  paginatedProducts.map((p) => (
                    <tr
                      key={p.id}
                      className="hover:bg-slate-50/60 transition-colors group"
                    >
                      {/* Thumbnail */}
                      <td className="py-3 px-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = '/placeholder-product.svg';
                            }}
                          />
                        </div>
                      </td>

                      {/* Product Name & Badges */}
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900 text-sm line-clamp-1 group-hover:text-[#ee2b91] transition-colors">
                          {p.name}
                        </div>
                        <div className="flex flex-wrap items-center gap-1.5 mt-1">
                          <span className="inline-block text-[10px] font-bold text-slate-500 uppercase px-2 py-0.5 rounded-md bg-slate-100">
                            {p.category}
                          </span>
                          {p.badge && (
                            <span className="inline-block text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-pink-100 text-[#ee2b91]">
                              {p.badge}
                            </span>
                          )}
                          {p.isOffer && (
                            <span className="inline-block text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-rose-100 text-rose-700">
                              Oferta
                            </span>
                          )}
                          {p.isMayorista && (
                            <span className="inline-block text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-purple-100 text-purple-700">
                              Mayorista
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Price */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="font-black text-slate-900 text-sm">
                          ${p.price?.toLocaleString('es-CL')}
                        </div>
                        {p.originalPrice && p.originalPrice > p.price && (
                          <div className="text-[11px] text-slate-400 line-through">
                            ${p.originalPrice?.toLocaleString('es-CL')}
                          </div>
                        )}
                      </td>

                      {/* 1-Click Stock Toggle */}
                      <td className="py-3 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggleStock(p)}
                          disabled={updatingId === p.id}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                            p.inStock
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                              : 'bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200'
                          }`}
                          title="Haga clic para cambiar estado de stock"
                        >
                          <span className={`w-2 h-2 rounded-full ${p.inStock ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                          <span>{p.inStock ? 'Disponible' : 'Agotado'}</span>
                        </button>
                      </td>

                      {/* 1-Click Featured Toggle */}
                      <td className="py-3 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggleFeatured(p)}
                          disabled={updatingId === p.id}
                          className={`p-1.5 rounded-lg transition-all ${
                            p.isFeatured
                              ? 'text-amber-500 bg-amber-50 border border-amber-200'
                              : 'text-slate-300 hover:text-amber-500 hover:bg-slate-100'
                          }`}
                          title={p.isFeatured ? 'Quitar de destacados' : 'Marcar como destacado'}
                        >
                          <Star className={`w-4 h-4 ${p.isFeatured ? 'fill-amber-400' : ''}`} />
                        </button>
                      </td>

                      {/* Action Buttons */}
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(p)}
                            className="p-2 text-slate-600 hover:text-[#ee2b91] hover:bg-pink-50 rounded-xl transition-colors border border-transparent hover:border-pink-200"
                            title="Editar producto"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeletingProduct(p)}
                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors border border-transparent hover:border-rose-200"
                            title="Eliminar producto"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-12 text-center text-slate-400">
                      <div className="max-w-xs mx-auto space-y-2">
                        <p className="font-bold text-sm text-slate-600">No se encontraron productos</p>
                        <p className="text-xs">Intente cambiar el texto de búsqueda o los filtros aplicados.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-slate-500 font-medium">
                Página {currentPage} de {totalPages} ({filteredProducts.length} productos totales)
              </span>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 font-bold hover:bg-slate-50 disabled:opacity-40 transition-colors"
                >
                  Anterior
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum = i + 1;
                    if (totalPages > 5 && currentPage > 3) {
                      pageNum = currentPage - 2 + i;
                      if (pageNum > totalPages) pageNum = totalPages - (4 - i);
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-8 h-8 rounded-lg font-bold transition-all ${
                          currentPage === pageNum
                            ? 'bg-[#ee2b91] text-white shadow-xs'
                            : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 font-bold hover:bg-slate-50 disabled:opacity-40 transition-colors"
                >
                  Siguiente
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* MODAL EDITOR (NUEVO / EDITAR) */}
      <ProductEditorModal
        product={editingProduct}
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        onSaved={handleSaved}
      />

      {/* CONFIRMACIÓN DE ELIMINACIÓN */}
      {deletingProduct && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white max-w-md w-full rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 font-heading">¿Eliminar producto?</h3>
              <p className="text-xs text-slate-500 mt-1">
                ¿Está seguro de que desea eliminar &ldquo;<strong>{deletingProduct.name}</strong>&rdquo; de la base de datos? Esta acción es permanente.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeletingProduct(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-200 transition-colors"
              >
                Eliminar Definitivamente
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
