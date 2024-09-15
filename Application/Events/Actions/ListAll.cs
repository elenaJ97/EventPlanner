using Application.Core;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Events.Actions
{
    public class ListAll
    {
        public class ListEvents
        {
            public string Title { get; set; }
            public string Location { get; set; }
            public string Id { get; set; }
        }
        public class Query : IRequest<Result<List<ListEvents>>> { }

        public class Handler : IRequestHandler<Query, Result<List<ListEvents>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<ListEvents>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.Events.Select(e => new ListEvents { Title = e.Title, Location = e.Location, Id = e.Id.ToString() }).AsQueryable();
                var allProfiles = await query.ToListAsync();

                return Result<List<ListEvents>>.Success(allProfiles);
            }
        }
    }
}