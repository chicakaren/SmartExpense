using System.ComponentModel.DataAnnotations;
using SmartExpense.Domain.Enums;

namespace SmartExpense.Application.DTOs;

public class CreateExpenseDto
{
    [Required]
    [StringLength(200, MinimumLength = 3)]
    public string Description { get; set; } = string.Empty;

    [Range(0.01, double.MaxValue)]
    public decimal Amount { get; set; }

    [EnumDataType(typeof(ExpenseCategory))]
    public ExpenseCategory Category { get; set; }

    [EnumDataType(typeof(PaymentMethod))]
    public PaymentMethod PaymentMethod { get; set; }

    public DateTime Date { get; set; }
}