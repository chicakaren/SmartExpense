using SmartExpense.Domain.Entities;

namespace SmartExpense.Application.Interfaces;

public interface IExpenseRepository
{
    Task<List<Expense>> GetAllAsync();

    Task<Expense?> GetByIdAsync(int id);

    Task<Expense> CreateAsync(Expense expense);

    Task UpdateAsync(Expense expense);

    Task DeleteAsync(Expense expense);
}