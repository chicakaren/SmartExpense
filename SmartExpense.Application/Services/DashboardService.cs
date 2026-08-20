using SmartExpense.Application.DTOs.Dashboard;
using SmartExpense.Application.Interfaces;

namespace SmartExpense.Application.Services;

public class DashboardService
{
    private readonly IExpenseRepository _repository;

    public DashboardService(IExpenseRepository repository)
    {
        _repository = repository;
    }

    public async Task<DashboardSummaryDto> GetSummaryAsync()
    {
        var expenses = await _repository.GetAllAsync();

        if (expenses.Count == 0)
        {
            return new DashboardSummaryDto
            {
                TotalExpenses = 0,
                ExpenseCount = 0,
                AverageExpense = 0,
                HighestExpense = 0
            };
        }

        return new DashboardSummaryDto
        {
            TotalExpenses = expenses.Sum(x => x.Amount),
            ExpenseCount = expenses.Count,
            AverageExpense = expenses.Average(x => x.Amount),
            HighestExpense = expenses.Max(x => x.Amount)
        };
    }

    public async Task<List<CategoryExpenseDto>> GetByCategoryAsync()
    {
        var expenses = await _repository.GetAllAsync();

        return expenses
            .GroupBy(x => x.Category)
            .Select(group => new CategoryExpenseDto
            {
                Category = group.Key,
                Total = group.Sum(x => x.Amount)
            })
            .OrderByDescending(x => x.Total)
            .ToList();
    }

    public async Task<List<object>> GetCashFlowAsync()
    {
        var expenses = await _repository.GetAllAsync();

        return expenses
            .GroupBy(x => new
            {
                x.Date.Year,
                x.Date.Month
            })
            .OrderBy(x => x.Key.Year)
            .ThenBy(x => x.Key.Month)
            .Select(group => new
            {
                Month = $"{group.Key.Year}-{group.Key.Month:D2}",
                Expenses = group.Sum(x => x.Amount)
            })
            .Cast<object>()
            .ToList();
    }
}