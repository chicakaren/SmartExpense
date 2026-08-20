using Microsoft.AspNetCore.Mvc;
using SmartExpense.Application.Services;

namespace SmartExpense.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DashboardController : ControllerBase
{
    private readonly DashboardService _service;

    public DashboardController(DashboardService service)
    {
        _service = service;
    }

    [HttpGet("summary")]
    public async Task<IActionResult> GetSummary()
    {
        var summary = await _service.GetSummaryAsync();

        return Ok(summary);
    }

    [HttpGet("by-category")]
    public async Task<IActionResult> GetByCategory()
    {
        var result = await _service.GetByCategoryAsync();

        return Ok(result);
    }
    [HttpGet("cash-flow")]
    public async Task<IActionResult> GetCashFlow()
    {
        var result = await _service.GetCashFlowAsync();

        return Ok(result);
    }
}