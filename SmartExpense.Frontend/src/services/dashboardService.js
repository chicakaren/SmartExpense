const API_URL = "http://localhost:5161/api";

// Categorías del backend
const CATEGORY_MAP = {
  Alimentación: 1,
  Transporte: 2,
  Vivienda: 3,
  Entretenimiento: 4,
  Salud: 5,
  Educación: 6,
  Compras: 7,
  Otros: 8,
};

// Métodos de pago del backend
const PAYMENT_METHOD_MAP = {
  Efectivo: 1,
  "Tarjeta débito": 2,
  "Tarjeta crédito": 3,
  "Transferencia bancaria": 4,
  Otro: 5,
};

// =========================
// DASHBOARD
// =========================

export async function getDashboardSummary() {
  const response = await fetch(`${API_URL}/Dashboard/summary`);

  if (!response.ok) {
    throw new Error("Error al obtener el resumen del dashboard");
  }

  return await response.json();
}

export async function getExpensesByCategory() {
  const response = await fetch(`${API_URL}/Dashboard/by-category`);

  if (!response.ok) {
    throw new Error("Error al obtener gastos por categoría");
  }

  return await response.json();
}

export async function getCashFlowData() {
  const response = await fetch(`${API_URL}/Dashboard/cash-flow`);

  if (!response.ok) {
    throw new Error("Error al obtener el flujo de caja");
  }

  return await response.json();
}

// =========================
// EXPENSES
// =========================

export async function getExpenses() {
  const response = await fetch(`${API_URL}/Expenses`);

  if (!response.ok) {
    throw new Error("Error al obtener los gastos");
  }

  return await response.json();
}

export async function getExpenseById(id) {
  const response = await fetch(`${API_URL}/Expenses/${id}`);

  if (!response.ok) {
    throw new Error("Error al obtener el gasto");
  }

  return await response.json();
}

// =========================
// CREATE EXPENSE
// =========================

export async function createExpense(transaction) {
  const category =
    typeof transaction.category === "number"
      ? transaction.category
      : CATEGORY_MAP[transaction.category] || 8;

  const paymentMethod =
    typeof transaction.paymentMethod === "number"
      ? transaction.paymentMethod
      : PAYMENT_METHOD_MAP[transaction.paymentMethod] || 1;

  const payload = {
    description: transaction.description,
    amount: Number(transaction.amount),
    category: category,
    paymentMethod: paymentMethod,
    date: transaction.date
      ? new Date(transaction.date).toISOString()
      : new Date().toISOString(),
  };

  console.log("Enviando al backend:", payload);

  const response = await fetch(`${API_URL}/Expenses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();

    console.error("Error del backend:", errorText);

    throw new Error("No se pudo crear el gasto");
  }

  return await response.json();
}

// =========================
// UPDATE EXPENSE
// =========================

export async function updateExpense(id, transaction) {
  const category =
    typeof transaction.category === "number"
      ? transaction.category
      : CATEGORY_MAP[transaction.category] || 8;

  const paymentMethod =
    typeof transaction.paymentMethod === "number"
      ? transaction.paymentMethod
      : PAYMENT_METHOD_MAP[transaction.paymentMethod] || 1;

  const payload = {
    description: transaction.description,
    amount: Number(transaction.amount),
    category: category,
    paymentMethod: paymentMethod,
    date: transaction.date
      ? new Date(transaction.date).toISOString()
      : new Date().toISOString(),
  };

  const response = await fetch(`${API_URL}/Expenses/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();

    console.error("Error del backend:", errorText);

    throw new Error("No se pudo actualizar el gasto");
  }

  return true;
}

// =========================
// DELETE EXPENSE
// =========================

export async function deleteExpense(id) {
  const response = await fetch(`${API_URL}/Expenses/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("No se pudo eliminar el gasto");
  }

  return true;
}