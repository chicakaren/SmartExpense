namespace SmartExpense.Application.DTOs.Dashboard;

public class DashboardSummaryDto
{
    public decimal TotalExpenses { get; set; }

    public int ExpenseCount { get; set; }

    public decimal AverageExpense { get; set; }

    public decimal HighestExpense { get; set; }
}