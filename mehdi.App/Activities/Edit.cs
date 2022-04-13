using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using FluentValidation;
using MediatR;
using mehdi.App.Core;
using mehdi.Domain;
using mehdi.Persistence;

namespace mehdi.App.Activities
{
    public class Edit
    {
           public class Command : IRequest<Result<Unit>>
        {
            public Activity Activity { get; set; }
        }
           public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x=>x.Activity).SetValidator(new ActivityValidator());
            }
        }
        public class Handler : IRequestHandler<Command,Result<Unit>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context,IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
               var activity= await context.Activities.FindAsync(request.Activity.Id);
               if(activity== null) return null;
               mapper.Map(request.Activity,activity);
               //activity.Title=request.Activity.Title??activity.Title;
               //context.Activities.Add(request.Activity);
                var result = await context.SaveChangesAsync()>0;
                if(!result) return Result<Unit>.Failure("Failed to Edit the activity");
               return Result<Unit>.Success(Unit.Value);
            }

         
        }
    }
}