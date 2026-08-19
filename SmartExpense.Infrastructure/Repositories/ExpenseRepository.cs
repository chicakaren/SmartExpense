using Microsoft.EntityFrameworkCore;
using SmartExpense.Application.Interfaces;
using SmartExpense.Domain.Entities;
using SmartExpense.Infrastructure.Data;

namespace SmartExpense.Infrastructure.Repositories;

public class ExpenseRepository : IExpenseRepository
{
    private readonly SmartExpenseDbContext _context;

    public ExpenseRepository(SmartExpenseDbContext context)
    {
        _context = context;
    }

    public async Task<List<Expense>> GetAllAsync()
    {
        return await _context.Expenses
            .OrderByDescending(x => x.Date)
            .ToListAsync();
    }

    public async Task<Expense?> GetByIdAsync(int id)
    {
        return await _context.Expenses
            .FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<Expense> CreateAsync(Expense expense)
    {
        _context.Expenses.Add(expense);

        await _context.SaveChangesAsync();

        return expense;
    }

    public async Task UpdateAsync(Expense expense)
    {
        _context.Expenses.Update(expense);

        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Expense expense)
    {
        _context.Expenses.Remove(expense);

        await _context.SaveChangesAsync();
    }
}