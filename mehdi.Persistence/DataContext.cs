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
        public DbSet<ActivityAttendee> ActivityAttendees {get;set;}
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<ActivityAttendee>(x=>x.HasKey(aa => new {aa.AppUserId,aa.ActivityId}));
            builder.Entity<ActivityAttendee>()
            .HasOne(u => u.Activity)
            .WithMany(a =>a.Attendees)
            .HasForeignKey(aa => aa.ActivityId);

        }
    }
}
