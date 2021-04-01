using mehdi.Domain;
using Microsoft.EntityFrameworkCore;

namespace mehdi.Persistence
{
     public class DataContext : DbContext
    {
        public DataContext( DbContextOptions options) : base(options)
        {
        }
       // public DbSet<CustInfo> CustInfos {get;set;}
        public DbSet<Activity> Activities {get;set;}
    }
}