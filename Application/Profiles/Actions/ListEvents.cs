using Application.Core;
using Application.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.Actions
{
    public class ListEvents
    {
        public class Query : IRequest<Result<List<UserEventDto>>>
        {
            public string Username { get; set; }
            public string Predicate { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<List<UserEventDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<UserEventDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.EventAttendees
                    .Where(u => u.AppUser.UserName == request.Username)
                    .OrderBy(a => a.Event.Date)
                    .ProjectTo<UserEventDto>(_mapper.ConfigurationProvider)
                    .AsQueryable();

                query = request.Predicate switch
                {
                    "past" => query.Where(a => a.Date <= DateTime.Now),
                    "hosting" => query.Where(a => a.HostUsername == request.Username),
                    _ => query.Where(a => a.Date >= DateTime.Now)
                };

                var events = await query.ToListAsync();
                return Result<List<UserEventDto>>.Success(events);
            }
        }
    }
}