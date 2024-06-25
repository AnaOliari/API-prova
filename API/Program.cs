using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();

var app = builder.Build();


app.MapGet("/", () => "Prova A1");

//ENDPOINTS DE CATEGORIA
//GET: http://localhost:5000/categoria/listar
app.MapGet("/categoria/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Categorias.Any())
    {
        return Results.Ok(ctx.Categorias.ToList());
    }
    return Results.NotFound("Nenhuma categoria encontrada");
});

//POST: http://localhost:5000/categoria/cadastrar
app.MapPost("/categoria/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Categoria categoria) =>
{
    ctx.Categorias.Add(categoria);
    ctx.SaveChanges();
    return Results.Created("", categoria);
});

//ENDPOINTS DE TAREFA
//GET: http://localhost:5000/tarefas/listar
app.MapGet("/tarefas/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Tarefas.Any())
    {
        return Results.Ok(ctx.Tarefas.ToList());
    }
    return Results.NotFound("Nenhuma tarefa encontrada");
});

//POST: http://localhost:5000/tarefas/cadastrar
app.MapPost("/tarefas/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Tarefa tarefa) =>
{
    Categoria? categoria = ctx.Categorias.Find(tarefa.CategoriaId);
    if (categoria == null)
    {
        return Results.NotFound("Categoria não encontrada");
    }
    tarefa.Categoria = categoria;
    ctx.Tarefas.Add(tarefa);
    ctx.SaveChanges();
    return Results.Created("", tarefa);
});

// PUT: http://localhost:5000/tarefas/alterar/{id}
app.MapPatch("/tarefas/alterar/{id}", async ([FromServices] AppDataContext ctx, [FromRoute] int id) =>
{
    var tarefa = await ctx.Tarefas.FindAsync(id);
    if (tarefa == null)
    {
        return Results.NotFound("Tarefa não encontrada");
    }

    if (tarefa.Status == "Pendente")
    {
        tarefa.Status = "Em andamento";
    }
    else if (tarefa.Status == "Em andamento")
    {
        tarefa.Status = "Concluído";
    }

    await ctx.SaveChangesAsync();
    return Results.Ok(tarefa);
});

//GET: http://localhost:5000/tarefas/naoconcluidas
app.MapGet("/tarefas/naoconcluidas", ([FromServices] AppDataContext ctx) =>
{
    var tarefasNaoConcluidas = ctx.Tarefas.Where(t => t.Status == "Pendente" || t.Status == "Em andamento").ToList();
    if (tarefasNaoConcluidas.Any())
    {
        return Results.Ok(tarefasNaoConcluidas);
    }
    return Results.NotFound("Nenhuma tarefa não concluída encontrada");
});

//GET: http://localhost:5000/tarefas/concluidas
app.MapGet("/tarefas/concluidas", ([FromServices] AppDataContext ctx) =>
{
    var tarefasConcluidas = ctx.Tarefas.Where(t => t.Status == "Concluída").ToList();
    if (tarefasConcluidas.Any())
    {
        return Results.Ok(tarefasConcluidas);
    }
    return Results.NotFound("Nenhuma tarefa concluída encontrada");
});

app.Run();
