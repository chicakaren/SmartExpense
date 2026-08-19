using SmartExpense.Domain.Enums;

namespace SmartExpense.Domain.Entities;

public class Expense
{
    public int Id { get; set; }

    public string Description { get; set; } = string.Empty;

    public decimal Amount { get; set; }

    public ExpenseCategory Category { get; set; }

    public PaymentMethod PaymentMethod { get; set; }

    public DateTime Date { get; set; }
}