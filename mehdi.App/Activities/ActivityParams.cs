using System;
using mehdi.App.Core;

namespace mehdi.App.Activities
{
    public class ActivityParams : PagingParams
    {
           public bool IsGoing { get; set; } 
          public bool IsHost { get; set; }
         public DateTime StartDate { get; set; } = DateTime.UtcNow;
    }
}