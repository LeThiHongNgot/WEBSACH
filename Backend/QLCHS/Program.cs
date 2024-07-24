using Microsoft.EntityFrameworkCore;
using QLCHS.Entities;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        /*options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;*/
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles; // This handles reference loops
    });
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<QLBANSACHContext>(option => option.UseSqlServer
    (builder.Configuration.GetConnectionString("QLBANSACH")));
builder.Services.AddCors(p => p.AddPolicy("MyCors", build =>
{
    build.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
}));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    /*app.UseSwaggerUI(c=>
    {
        c.SwaggerEndpoint("/Swagger/v1/swagger.json", "Dispatch API V1");
        c.RoutePrefix = string.Empty;
    });*/
}

app.UseHttpsRedirection();
app.UseCors("MyCors");
app.UseStaticFiles();
app.UseAuthorization();
app.MapControllers();

app.Run();
