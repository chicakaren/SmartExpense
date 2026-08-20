using Microsoft.EntityFrameworkCore;
using SmartExpense.Domain.Entities;

namespace SmartExpense.Infrastructure.Data;

public class SmartExpenseDbContext : DbContext
{
    public SmartExpenseDbContext(DbContextOptions<SmartExpenseDbContext> options)
        : base(options)
    {
    }

    public DbSet<Expense> Expenses { get; set; }
}