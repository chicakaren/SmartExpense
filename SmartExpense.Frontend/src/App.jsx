import { useEffect, useState, useCallback } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import SmartInsightBanner from "./components/SmartInsightBanner";
import SummaryCards from "./components/SummaryCards";
// import CashFlowChart from "./components/CashFlowChart";
import CategoryChart from "./components/CategoryChart";
import RecentExpenses from "./components/RecentExpenses";
import AddTransactionModal from "./components/AddTransactionModal";

import {
  getDashboardSummary,
  getExpensesByCategory,
  // getCashFlowData,
  getExpenses,
  createExpense,
} from "./services/dashboardService";

export default function App() {
  const [summary, setSummary] = useState(null);
  const [categories, setCategories] = useState([]);
  // const [cashFlow, setCashFlow] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("aug");
  const [activeTab, setActiveTab] = useState("dashboard");

  // ==========================================
  // CARGAR DATOS DEL DASHBOARD
  // ==========================================

  const loadDashboardData = useCallback(async () => {
    try {
      setError(null);

      console.log("🔄 Cargando dashboard...");

      const summaryData = await getDashboardSummary();
      console.log("✅ Summary:", summaryData);

      const categoryData = await getExpensesByCategory();
      console.log("✅ Categories:", categoryData);

      const expensesData = await getExpenses();
      console.log("✅ Expenses:", expensesData);

      setSummary(summaryData);
      setCategories(categoryData || []);
      setExpenses(expensesData || []);
    } catch (error) {
      console.error("❌ Error cargando datos del dashboard:", error);

      setError(
        "No se pudieron cargar los datos del dashboard. Verifica que la API esté funcionando."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // ==========================================
  // CARGAR DASHBOARD AL INICIAR
  // ==========================================

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  // ==========================================
  // AGREGAR TRANSACCIÓN
  // ==========================================

  const handleAddTransaction = async (newTx) => {
    try {
      console.log("📝 Nueva transacción:", newTx);

      await createExpense(newTx);

      console.log("✅ Transacción guardada correctamente");

      setModalOpen(false);

      await loadDashboardData();
    } catch (error) {
      console.error("❌ Error creando transacción:", error);

      alert("No se pudo guardar la transacción.");
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-600 animate-pulse flex items-center justify-center text-white font-bold">
            S
          </div>

          <span className="text-sm font-semibold text-slate-700">
            Conectando con SmartExpense API...
          </span>
        </div>
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 max-w-md text-center">
          <div className="text-4xl mb-4">⚠️</div>

          <h2 className="text-xl font-bold text-slate-800 mb-2">
            No se pudo conectar con la API
          </h2>

          <p className="text-sm text-slate-500 mb-6">
            {error}
          </p>

          <button
            onClick={() => {
              setLoading(true);
              loadDashboardData();
            }}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // DASHBOARD
  // ==========================================

 return (
  <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex">

    {/* Sidebar (Fijo o lateral) */}
    <Sidebar
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    />

    {/* Main Content Area */}
    <div className="flex-1 flex flex-col min-w-0 md:pl-64">

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">

        {/* Header */}
        <Header
          onOpenModal={() => setModalOpen(true)}
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
        />

        {/* Smart Insights */}
        <SmartInsightBanner />

        {/* Summary Cards */}
        {summary && (
          <SummaryCards summary={summary} />
        )}

        {/* Categories */}
        <section>
          <CategoryChart data={categories} />
        </section>

        {/* Recent Expenses */}
        <section>
          <RecentExpenses expenses={expenses} />
        </section>

      </main>

      {/* Footer */}
      <footer className="py-4 px-6 border-t border-slate-200/60 text-center text-xs text-slate-400">
        SmartExpense SaaS © 2026 — Plataforma de Gestión Financiera
        <span className="mx-2">•</span>
        API: http://localhost:5161
      </footer>

    </div>

    {/* Add Transaction Modal */}
    <AddTransactionModal
      isOpen={modalOpen}
      onClose={() => setModalOpen(false)}
      onAddTransaction={handleAddTransaction}
    />

  </div>
);
}