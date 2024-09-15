using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security
{
    public class IsCurrentUserRequirement : IAuthorizationRequirement
    {
    }

    public class IsCurrentUserRequirementHandler : AuthorizationHandler<IsCurrentUserRequirement>
    {
        private readonly DataContext _dataContext;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public IsCurrentUserRequirementHandler(DataContext dataContext, IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _dataContext = dataContext;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsCurrentUserRequirement requirement)
        {
            var user = _dataContext.Users.FirstOrDefaultAsync(u => u.UserName == context.User.FindFirstValue(ClaimTypes.Name)).Result;

            if (user.Id == null) return Task.CompletedTask;

            if (user.Role == "Administrator")
            {
                context.Succeed(requirement);
                return Task.CompletedTask;
            }

            var username = _httpContextAccessor.HttpContext?.Request.RouteValues.SingleOrDefault(x => x.Key == "username").Value?.ToString();

            if (username != user.UserName) return Task.CompletedTask;

            context.Succeed(requirement);

            return Task.CompletedTask;
        }
    }
}