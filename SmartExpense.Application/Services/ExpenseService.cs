using SmartExpense.Application.DTOs;
using SmartExpense.Application.Interfaces;
using SmartExpense.Domain.Entities;

namespace SmartExpense.Application.Services;

public class ExpenseService
{
    private readonly IExpenseRepository _repository;

    public ExpenseService(IExpenseRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<Expense>> GetAllAsync()
    {
        return await _repository.GetAllAsync();
    }

    public async Task<Expense?> GetByIdAsync(int id)
    {
        return await _repository.GetByIdAsync(id);
    }

    public async Task<Expense> CreateAsync(CreateExpenseDto dto)
    {
        var date = dto.Date.Kind == DateTimeKind.Utc
    ? dto.Date
    : dto.Date.ToUniversalTime();

        if (date > DateTime.UtcNow)
        {
            throw new ArgumentException("Expense date cannot be in the future.");
        }
        var expense = new Expense
        {
            Description = dto.Description,
            Amount = dto.Amount,
            Category = dto.Category,
            PaymentMethod = dto.PaymentMethod,

            Date = date
        };

        return await _repository.CreateAsync(expense);
    }

    public async Task UpdateAsync(int id, CreateExpenseDto dto)
    {
        var expense = await _repository.GetByIdAsync(id);

        if (expense is null)
            throw new KeyNotFoundException("Expense not found.");

        expense.Description = dto.Description;
        expense.Amount = dto.Amount;
        expense.Category = dto.Category;
        expense.PaymentMethod = dto.PaymentMethod;
        expense.Date = dto.Date.ToUniversalTime();

        await _repository.UpdateAsync(expense);
    }

    public async Task DeleteAsync(int id)
    {
        var expense = await _repository.GetByIdAsync(id);

        if (expense is null)
            throw new KeyNotFoundException("Expense not found.");

        await _repository.DeleteAsync(expense);
    }

}