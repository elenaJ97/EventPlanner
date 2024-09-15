using Application.Core;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.Actions
{
    public class ListAll
    {
        public class ListUsername
        {
            public string Username { get; set; }
            public string DisplayName { get; set; }
        }
        public class Query : IRequest<Result<List<ListUsername>>> { }

        public class Handler : IRequestHandler<Query, Result<List<ListUsername>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<ListUsername>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.Users.Select(u => new ListUsername { Username = u.UserName, DisplayName = u.DisplayName }).AsQueryable();
                var allProfiles = await query.ToListAsync();

                return Result<List<ListUsername>>.Success(allProfiles);
            }
        }
    }
}