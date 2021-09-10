using Microsoft.AspNetCore.Identity;

namespace mehdi.Domain
{
    public class AppUser: IdentityUser
    {
          public string  DisplayName { get; set; }  
          public string  Bio { get; set; }  
          
    }
}