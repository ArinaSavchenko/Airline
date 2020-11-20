using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using Airline_Web_API.Models;
using Airline_Web_API.Services;
using AutoMapper;
using Airline_Web_API.Helpers;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Airline_Web_API.Hubs;

namespace Airline_Web_API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<AirlineContext>(options
               => options.UseSqlServer(Configuration.GetConnectionString("AirlineDatabase")));

            services.AddControllers();

            services.AddSignalR();

            services.AddTransient<AirlineContext>();

            services.AddTransient<FlightService>();
            services.AddTransient<AirportService>();
            services.AddTransient<UserService>();
            services.AddTransient<JwtService>();
            services.AddTransient<AirplaneService>();
            services.AddTransient<SeatsService>();
            services.AddTransient<TicketService>();
            services.AddTransient<TicketTypeService>();
            services.AddTransient<BookedTicketService>();
            services.AddTransient<ReservedSeatService>();

            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);
            var appSettings = appSettingsSection.Get<AppSettings>();
            var key = Encoding.UTF8.GetBytes(appSettings.Secret);

            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
             .AddJwtBearer(x =>
             {
                 x.Events = new JwtBearerEvents
                 {
                     OnTokenValidated = context =>
                     {
                         var userService = context.HttpContext.RequestServices.GetRequiredService<UserService>();
                         var userId = int.Parse(context.Principal.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                         var user = userService.GetUserById(userId);
                         if (user == null)
                         {
                            context.Fail("Unauthorized");
                         }
                         return Task.CompletedTask;
                     }
                 };

                 x.RequireHttpsMetadata = false;
                 x.SaveToken = true;

                 x.TokenValidationParameters = new TokenValidationParameters
                 {
                     ValidateIssuerSigningKey = true,
                     IssuerSigningKey = new SymmetricSecurityKey(key),
                     ValidateIssuer = false,
                     ValidateAudience = false
                 };
             });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseCors(options => options.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<SeatsLockHub>("/seatslock");
            });
        }
    }
}
