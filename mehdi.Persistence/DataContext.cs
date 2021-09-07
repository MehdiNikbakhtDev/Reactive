using System.Security.Principal;
using mehdi.Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace mehdi.Persistence
{
     public class DataContext : IdentityDbContext<AppUser>
         {
        public DataContext( DbContextOptions options) : base(options)
        {


        }
       // public DbSet<CustInfo> CustInfos {get;set;}
        public DbSet<Activity> Activities {get;set;}
    }
}
