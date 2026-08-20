using SmartExpense.Domain.Enums;

namespace SmartExpense.Application.DTOs.Dashboard;

public class CategoryExpenseDto
{
    public ExpenseCategory Category { get; set; }

    public decimal Total { get; set; }
}