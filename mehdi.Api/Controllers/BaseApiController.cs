using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
namespace mehdi.Api.Controllers
{
     [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController:ControllerBase
    {
            private  IMediator mediator;
            protected IMediator  Mediator=>mediator??=HttpContext.RequestServices.GetService<IMediator>();
      
    }
}