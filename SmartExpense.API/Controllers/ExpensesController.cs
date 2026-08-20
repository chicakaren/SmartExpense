using Microsoft.AspNetCore.Mvc;
using SmartExpense.Application.DTOs;
using SmartExpense.Application.Services;

namespace SmartExpense.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ExpensesController : ControllerBase
{
    private readonly ExpenseService _service;

    public ExpensesController(ExpenseService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var expenses = await _service.GetAllAsync();

        return Ok(expenses);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var expense = await _service.GetByIdAsync(id);

        if (expense is null)
            return NotFound();

        return Ok(expense);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateExpenseDto dto)
    {
        var expense = await _service.CreateAsync(dto);

        return CreatedAtAction(
            nameof(GetById),
            new { id = expense.Id },
            expense);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(
        int id,
        CreateExpenseDto dto)
    {
        try
        {
            await _service.UpdateAsync(id, dto);

            return NoContent();
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            await _service.DeleteAsync(id);

            return NoContent();
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }
    }
}