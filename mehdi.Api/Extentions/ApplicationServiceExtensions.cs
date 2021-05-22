using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.OpenApi.Models;
using mehdi.Persistence;
using Microsoft.EntityFrameworkCore;
using MediatR;
using mehdi.App.Activities;
using mehdi.App.Core;

namespace mehdi.Api.Extentions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services,IConfiguration config){
              services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "MehdiGram.Api", Version = "v1" });
            });
            services.AddDbContext<DataContext>(opt=>
            {
               opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });
            services.AddCors(opt=>{
                opt.AddPolicy("CorsPolicy",policy=>
                {
                    policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
                });
            });
            services.AddMediatR(typeof(List.Handler).Assembly);
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);
return services;

        }
    }
}